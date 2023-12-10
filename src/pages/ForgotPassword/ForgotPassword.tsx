import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Typography } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import AccountConfirmation from 'src/components/AccountConfirmation'
import path from 'src/constants/path'
import { LoginSchema, loginSchema } from 'src/utils/rules'

type FormData = Pick<LoginSchema, 'email'>
const forgotPasswordSchema = loginSchema.pick({ email: true })

function ForgotPassword() {
  const {
    formState: { errors },
    register,
    watch,
    handleSubmit
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: FormData) => authApi.forgotPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutate(data)
  })

  const handleResendVerifyPassword = () => {
    forgotPasswordMutation.reset()
  }

  return (
    <>
      {forgotPasswordMutation.isSuccess ? (
        <AccountConfirmation email={watch('email')} onSubmit={handleResendVerifyPassword} buttonTitle='Resend' />
      ) : (
        <div className='px-5'>
          <Typography variant='h3' className='mb-8'>
            Forgot password
          </Typography>

          <form onSubmit={onSubmit}>
            <div>
              <Input {...register('email')} size='lg' label='Email' />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.email?.message}
              </p>
            </div>

            <Button type='submit' className='mt-2 bg-primary'>
              Send a reset
            </Button>
          </form>
        </div>
      )}
    </>
  )
}

export default ForgotPassword
