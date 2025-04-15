import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { SignupFormSchema, LoginSchema } from "../../../lib/definitions";
import { connectDB } from "../../../lib/utils/db"; // Updated import

const handler = NextAuth({
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
        const { db, usersCollection, adminUsersCollection } = await connectDB(); // Connect to DB
        console.log("🔗 Database connected before querying users");

        const { email, password, fullName, mobilePhone } = credentials;

        if (req.body?.action === "signup") {
          console.log("🟢 Processing signup request:", credentials);

          // Validate input
          const validation = SignupFormSchema.safeParse({
            fullName,
            email,
            mobilePhone,
            password,
          });

          if (!validation.success) {
            console.error(
              "❌ Signup validation failed:",
              validation.error.errors
            );
            throw new Error("Invalid input. Please check the provided data.");
          }

          // Check if user exists
          const existingUser = await usersCollection.findOne({ email });
          console.log("🔍 Checking for existing user:", existingUser);

          if (existingUser) {
            console.error("❌ Email already exists:", email);
            throw new Error(JSON.stringify({ email: "Email already exists." }));
          }

          // Hash password & create user
          const hashedPassword = await hash(password, 10);
          const newUser = {
            fullName,
            email,
            mobilePhone,
            password: hashedPassword,
            createdAt: new Date(),
          };

          const insertedUser = await usersCollection.insertOne(newUser);
          console.log("✅ New user created successfully:", insertedUser);

          return {
            id: insertedUser.insertedId.toString(),
            email: newUser.email,
            name: newUser.fullName,
          };
        }

        // Handle login (admin or regular user)
        console.log("🔍 Processing login request for:", email);
        const validationLogin = LoginSchema.safeParse({ email, password });

        if (!validationLogin.success) {
          console.error(
            "❌ Login validation failed:",
            validationLogin.error.errors
          );
          throw new Error("Invalid login credentials.");
        }

        let user;

        // Check if it's an admin login or regular user login
        if (req.body?.action === "adminLogin") {
          console.log("🟢 Processing admin login request:", email);
          user = await adminUsersCollection.findOne({ email }); // Query admin_users collection
        } else {
          user = await usersCollection.findOne({ email }); // Query regular users collection
        }

        console.log("🔍 Found user:", user);

        if (!user) {
          console.error("❌ User not found:", email);
          throw new Error(JSON.stringify({ email: "User not found." }));
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          console.error("❌ Invalid password attempt for:", email);
          throw new Error(JSON.stringify({ password: "Invalid password." }));
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          isAdmin: req.body?.action === "adminLogin", // Add a flag to identify if the user is admin
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin; // Store admin flag in JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin; // Attach the admin flag to session
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
});

export { handler as GET, handler as POST };
