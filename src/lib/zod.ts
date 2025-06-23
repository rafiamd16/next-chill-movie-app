import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const profileFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  email: z.string().trim().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const movieFormSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),
  rating: z.coerce
    .number()
    .min(1, 'Rating must be at least 1')
    .max(10, 'Rating must be at most 10'),
  image: z.string().trim().min(3, 'Image must be at least 3 characters'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type ProfileFormSchema = z.infer<typeof profileFormSchema>
export type MovieFormSchema = z.infer<typeof movieFormSchema>
