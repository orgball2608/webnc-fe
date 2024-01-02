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
  firstName: zod.string().min(1, 'First name is required').max(160, 'Maximum length is 160 characters').trim(),
  lastName: zod.string().min(1, 'Last name is required').max(160, 'Maximum length is 160 characters').trim(),
  phoneNumber: zod.string().min(1, 'Phone number is required').max(20, 'Maximum length is 20 characters').trim(),
  address: zod.string().min(1, 'Address is required').max(160, 'Maximum length is 160 characters').trim(),
  studentId: zod.optional(zod.string().max(30, 'Student ID has a maximum of 30 characters').trim())
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
  address: authValidation.address,
  studentId: authValidation.studentId
})

export const changePasswordSchema = zod
  .object({
    oldPassword: authValidation.password,
    newPassword: authValidation.password,
    confirmPassword: authValidation.confirmPassword
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Confirm password does not match',
    path: ['confirmPassword']
  })

export const resetPasswordSchema = zod
  .object({
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password does not match',
    path: ['confirmPassword']
  })

export const classSchema = zod.object({
  name: zod.string().min(1, 'Name is required').max(100, 'Maximum length is 100 characters'),
  description: zod.optional(zod.string().max(100, 'Maximum length is 100 characters')),
  room: zod.optional(zod.string().max(100, 'Maximum length is 100 characters')),
  topic: zod.optional(zod.string().max(100, 'Maximum length is 100 characters'))
})

export const invitationSchema = zod.object({
  email: authValidation.email,
  courseId: zod.string().min(1),
  role: zod.string().min(1)
})

export const classCodeSchema = zod.object({
  classCode: zod
    .string()
    .min(5, 'The class code must be at least 5 characters')
    .max(7, 'The class code has a maximum of 5 characters')
})

export const gradeCompositionSchema = zod.object({
  id: zod.optional(zod.number()),
  name: zod.string().min(1, 'Name is required').max(100, 'Maximum length is 100 characters'),
  scale: zod
    .string()
    .min(1, 'Scale is required')
    .max(100, 'Maximum length is 100 characters')
    // .regex(/^\d+$/, 'Scale must be a number')
    .refine(
      (data) => {
        if (/^\d+$/.test(data)) {
          const scaleNumber = +data

          if (scaleNumber > 0) return true
        }
        return false
      },
      {
        message: 'Scale must be a number and greater than 0'
      }
    )
})

export const gradeCompositionsSchema = zod
  .object({
    grades: zod.array(gradeCompositionSchema).min(1, 'Must be at least one grade')
  })
  .refine(
    (data) => {
      const totalScale = data.grades.reduce((total, grade) => {
        const scale = +grade.scale
        if (isNaN(scale)) return total
        return total + scale
      }, 0)

      return totalScale <= 100
    },
    {
      message: 'Total scale must be less than or equal to 100',
      path: ['totalScale']
    }
  )
  .refine(
    (data) => {
      const gradeNamesSet = new Set()

      for (const grade of data.grades) {
        if (gradeNamesSet.has(grade.name)) {
          return false
        }
        gradeNamesSet.add(grade.name)
      }

      return true
    },
    {
      message: 'Grade composition name must be unique',
      path: ['ununiqueGradeCompositionName']
    }
  )

export type InvitationSchema = zod.infer<typeof invitationSchema>
export type LoginSchema = zod.infer<typeof loginSchema>
export type RegisterSchema = zod.infer<typeof registerSchema>
export type ClassCodeSchema = zod.infer<typeof classCodeSchema>

export type UpdateProfileSchema = zod.infer<typeof updateProfileSchema>
export type ChangePasswordSchema = zod.infer<typeof changePasswordSchema>
export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>
export type ClassSchema = zod.infer<typeof classSchema>
export type GradeCompositionSchema = zod.infer<typeof gradeCompositionSchema>
export type GradeCompositionsSchema = zod.infer<typeof gradeCompositionsSchema>
