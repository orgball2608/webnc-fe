import exp from 'constants'
import * as zod from 'zod'

const authValidation = {
  email: zod
    .string()
    .min(1, { message: 'Email is required' })
    .email('Email is invalid')
    .max(160, 'Length from 5 to 160 characters'),
  password: zod
    .string()
    .min(1, 'Password is required')
    .min(5, 'Length from 5 to 160 characters')
    .max(160, 'Length from 5 to 160 characters'),
  confirmPassword: zod
    .string()
    .min(1, 'Confirm password is required')
    .min(5, 'Length from 5 to 160 characters')
    .max(160, 'Length from 5 to 160 characters'),
  firstName: zod.string().min(1, 'First name is required').max(160, 'Maximum length is 160 characters'),
  lastName: zod.string().min(1, 'Last name is required').max(160, 'Maximum length is 160 characters'),
  phoneNumber: zod.string().min(1, 'Phone number is required').max(20, 'Maximum length is 20 characters'),
  address: zod.string().min(1, 'Address is required').max(160, 'Maximum length is 160 characters')
}

export const loginSchema = zod.object({
  email: authValidation.email,
  password: authValidation.password
})

export const registerSchema = zod
  .object({
    email: authValidation.email,
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword,
    firstName: authValidation.firstName,
    lastName: authValidation.lastName,
    phoneNumber: authValidation.phoneNumber,
    address: authValidation.address
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password does not match',
    path: ['confirmPassword']
  })

export const updateProfileSchema = zod.object({
  firstName: authValidation.firstName,
  lastName: authValidation.lastName,
  phoneNumber: authValidation.phoneNumber,
  address: authValidation.address
})

export type LoginSchema = zod.infer<typeof loginSchema>
export type RegisterSchema = zod.infer<typeof registerSchema>

export type UpdateProfileSchema = zod.infer<typeof updateProfileSchema>
