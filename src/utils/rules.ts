import * as zod from 'zod'

const authValidation = {
  email: zod
    .string()
    .min(1, { message: 'Email là bắt buộc' })
    .email('Email không đúng định dạng')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: zod
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  confirm_password: zod
    .string()
    .min(1, 'Mật khẩu nhập lại là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  first_name: zod.string().min(1, 'First name là bắt buộc').max(160, 'Độ dài tối đa là 160 kí tự'),
  last_name: zod.string().min(1, 'Last name là bắt buộc').max(160, 'Độ dài tối đa là 160 kí tự'),
  phone_number: zod.string().min(1, 'Số điện thoại là bắt buộc').max(20, 'Độ dài tối đa là 20 kí tự'),
  address: zod.string().min(1, 'Địa chỉ là bắt buộc').max(160, 'Độ dài tối đa là 160 kí tự')
}

export const loginSchema = zod.object({
  email: authValidation.email,
  password: authValidation.password
})

export const registerSchema = zod
  .object({
    email: authValidation.email,
    password: authValidation.password,
    confirm_password: authValidation.confirm_password,
    first_name: authValidation.first_name,
    last_name: authValidation.last_name,
    phone_number: authValidation.phone_number,
    address: authValidation.address
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu nhập lại không đúng',
    path: ['confirm_password']
  })

export type LoginSchema = zod.infer<typeof loginSchema>
export type RegisterSchema = zod.infer<typeof registerSchema>
