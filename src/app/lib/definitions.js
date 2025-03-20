import { z } from 'zod';

export const SignupFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    mobilePhone: z
      .string()
      .optional() // Allow undefined
      .transform((val) => val ?? '') // Convert undefined/null to empty string
      .refine((val) => val.length > 0, { message: 'Phone number is required.' })
      .refine((val) => val.length >= 10, {
        message: 'Phone number must be at least 10 digits long.',
      })
      .refine((val) => val.length <= 10, {
        message: 'Phone number must not exceed 10 digits.',
      })
      .refine((val) => /^\d+$/.test(val), {
        message: 'Phone number must contain only digits.',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password is required.' }),
});