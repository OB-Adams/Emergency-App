// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { compare, hash } from 'bcryptjs';
import { SignupFormSchema, LoginSchema } from '../../../lib/definitions';

// Mock database (replace with your actual database logic)
const users = []; // In-memory array for demo purposes

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        fullName: { label: 'Full Name', type: 'text' }, // For sign-up
        mobilePhone: { label: 'Mobile Phone', type: 'tel' }, // For sign-up
      },
      async authorize(credentials, req) {
        const { email, password, fullName, mobilePhone } = credentials;

        // Handle sign-up
        if (req.body?.action === 'signup') {
          const validation = SignupFormSchema.safeParse({
            fullName,
            email,
            mobilePhone,
            password,
          });

          if (!validation.success) {
            throw new Error(JSON.stringify(validation.error.flatten().fieldErrors));
          }

          // Check if user already exists
          const existingUser = users.find((user) => user.email === email);
          if (existingUser) {
            throw new Error(JSON.stringify({ email: 'Email already exists.' }));
          }

          // Hash the password and save the user
          const hashedPassword = await hash(password, 10);
          const newUser = {
            id: users.length + 1,
            fullName,
            email,
            mobilePhone,
            password: hashedPassword,
          };
          users.push(newUser);

          return { id: newUser.id, email: newUser.email, name: newUser.fullName };
        }

        // Handle login
        const validation = LoginSchema.safeParse({ email, password });
        if (!validation.success) {
          throw new Error(JSON.stringify(validation.error.flatten().fieldErrors));
        }

        const user = users.find((u) => u.email === email);
        if (!user) {
          throw new Error(JSON.stringify({ email: 'User not found.' }));
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error(JSON.stringify({ password: 'Invalid password.' }));
        }

        return { id: user.id, email: user.email, name: user.fullName };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/auth/error', // Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-here', // Add this to your .env
});

export { handler as GET, handler as POST };