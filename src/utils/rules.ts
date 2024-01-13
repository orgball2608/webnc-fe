import * as zod from 'zod'

const authValidation = {
  email: zod.string().min(1, { message: 'emailRequired' }).email('emailInvalid').max(160, 'lengthFrom5To160'),
  password: zod.string().min(1, 'passwordRequired').min(5, 'lengthFrom5To160').max(160, 'lengthFrom5To160'),
  confirmPassword: zod
    .string()
    .min(1, 'confirmPasswordRequired')
    .min(5, 'lengthFrom5To160')
    .max(160, 'lengthFrom5To160'),
  firstName: zod.string().min(1, 'firstNameRequired').max(160, 'maxLength160').trim(),
  lastName: zod.string().min(1, 'lastNameRequired').max(160, 'maxLength160').trim(),
  phoneNumber: zod.string().min(1, 'phoneNumberRequired').max(20, 'maxLength20').trim(),
  address: zod.string().min(1, 'addressRequired').max(160, 'maxLength160').trim(),
  studentId: zod.optional(zod.string().max(30, 'maxLength30').trim())
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
    message: 'confirmPasswordNotMatch',
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
    message: 'confirmPasswordNotMatch',
    path: ['confirmPassword']
  })

export const resetPasswordSchema = zod
  .object({
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'confirmPasswordNotMatch',
    path: ['confirmPassword']
  })

export const classSchema = zod.object({
  name: zod.string().min(1, 'nameRequired').max(100, 'maxLength100'),
  description: zod.optional(zod.string().max(100, 'maxLength100')),
  room: zod.optional(zod.string().max(100, 'maxLength100')),
  topic: zod.optional(zod.string().max(100, 'maxLength100'))
})

export const invitationSchema = zod.object({
  email: authValidation.email,
  courseId: zod.string().min(1),
  role: zod.string().min(1)
})

export const classCodeSchema = zod.object({
  classCode: zod.string().min(5, 'classCodeAtLeast5').max(7, 'classCodeMaximum7')
})

export const gradeCompositionSchema = zod.object({
  id: zod.optional(zod.number()),
  name: zod.string().min(1, 'nameRequired').max(100, 'maxLength100'),
  scale: zod
    .string()
    .min(1, 'scaleRequired')
    .max(100, 'maxLength100')
    .refine(
      (data: string) => {
        if (/^\d+$/.test(data)) {
          const dataNumber = +data

          if (dataNumber >= 0) return true
        }
        return false
      },
      {
        message: 'scaleMustBeInteger'
      }
    )
})

export const gradeCompositionsSchema = zod
  .object({
    grades: zod.array(gradeCompositionSchema).min(1, 'atLeastOneGrade')
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
      message: 'totalScaleLessThan100',
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
      message: 'gradeCompositionNameUnique',
      path: ['ununiqueGradeCompositionName']
    }
  )

export const gradeSchema = zod.object({
  studentId: zod.string().min(1, 'studentIdRequired').max(100, 'maxLength100'),
  name: zod.string().min(1, 'nameRequired').max(100, 'maxLength100'),
  grade: zod
    .string()
    .min(1, 'gradeRequired')
    .refine(
      (data: string) => {
        if (/^\d+$/.test(data)) {
          const dataNumber = +data

          if (dataNumber >= 0 && dataNumber <= 10) return true
        }
        return false
      },
      {
        message: 'gradeRange0To10'
      }
    )
})

const gradeReview = {
  expectedGrade: zod
    .string()
    .min(1, 'gradeRequired')
    .refine(
      (data: string) => {
        if (/^\d+$/.test(data)) {
          const dataNumber = +data

          if (dataNumber >= 0 && dataNumber <= 10) return true
        }
        return false
      },
      {
        message: 'gradeRange0To10'
      }
    ),
  explanation: zod.string().min(2, 'explanationRange').max(1000, 'maxLength1000')
}

export const gradeReviewSchema = zod.object({
  expectedGrade: gradeReview.expectedGrade,
  explanation: gradeReview.explanation
})

export const updateGradeSchema = zod.object({
  grade: gradeReview.expectedGrade,
  studentId: authValidation.studentId
})

export type InvitationSchema = zod.infer<typeof invitationSchema>
export type LoginSchema = zod.infer<typeof loginSchema>
export type RegisterSchema = zod.infer<typeof registerSchema>
export type ClassCodeSchema = zod.infer<typeof classCodeSchema>

export type GradeReviewSchema = zod.infer<typeof gradeReviewSchema>
export type UpdateGradeSchema = zod.infer<typeof updateGradeSchema>

export type UpdateProfileSchema = zod.infer<typeof updateProfileSchema>
export type ChangePasswordSchema = zod.infer<typeof changePasswordSchema>
export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>
export type ClassSchema = zod.infer<typeof classSchema>
export type GradeCompositionSchema = zod.infer<typeof gradeCompositionSchema>
export type GradeCompositionsSchema = zod.infer<typeof gradeCompositionsSchema>
export type GradeSchema = zod.infer<typeof gradeSchema>
