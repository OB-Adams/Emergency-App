import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { SignupFormSchema, LoginSchema } from "../../../lib/definitions";
import { connectDB } from "../../../lib/utils/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        fullName: { label: "Full Name", type: "text" },
        mobilePhone: { label: "Mobile Phone", type: "tel" },
      },
      async authorize(credentials, req) {
        const { db, usersCollection, adminUsersCollection } = await connectDB();
        const { email, password, fullName, mobilePhone } = credentials;

        if (req.body?.action === "signup") {
          const validation = SignupFormSchema.safeParse({
            fullName,
            email,
            mobilePhone,
            password,
          });

          if (!validation.success) {
            throw new Error("Invalid input. Please check the provided data.");
          }

          const existingUser = await usersCollection.findOne({ email });
          if (existingUser) {
            throw new Error(JSON.stringify({ email: "Email already exists." }));
          }

          const hashedPassword = await hash(password, 10);
          const newUser = {
            fullName,
            email,
            mobilePhone,
            password: hashedPassword,
            createdAt: new Date(),
          };

          const insertedUser = await usersCollection.insertOne(newUser);
          return {
            id: insertedUser.insertedId.toString(),
            email: newUser.email,
            name: newUser.fullName,
          };
        }

        const validationLogin = LoginSchema.safeParse({ email, password });
        if (!validationLogin.success) {
          throw new Error("Invalid login credentials.");
        }

        let user;
        if (req.body?.action === "adminLogin") {
          user = await adminUsersCollection.findOne({ email });
        } else {
          user = await usersCollection.findOne({ email });
        }

        if (!user) {
          throw new Error(JSON.stringify({ email: "User not found." }));
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error(JSON.stringify({ password: "Invalid password." }));
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          isAdmin: req.body?.action === "adminLogin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
