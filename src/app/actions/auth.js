import { SignupFormSchema } from "../lib/definitions"

export async function signup(state, formData) {
  
    const validatedFields = SignupFormSchema.safeParse({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      mobilePhone: formData.get('mobilePhone'),
      password: formData.get('password'),
    });
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { fullName, email, mobilePhone, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Mock API call (since backend isn't set up)
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, mobilePhone, hashedPassword }),
    });
    const data = await response.json();
    if (!data.success) {
      return {
        errors: { general: data.message || 'Signup failed.' },
      };
    }
    return { success: true };
  } catch (error) {
    return {
      errors: { general: 'An error occurred during signup. Backend not set up.' },
    };
  }
 
  // Call the provider or db to create a user...
}