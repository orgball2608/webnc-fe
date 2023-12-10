import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Input, Typography } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import AccountConfirmation from 'src/components/AccountConfirmation'
import path from 'src/constants/path'
import useQueryString from 'src/hooks/useQueryString'
import { ResetPasswordSchema, resetPasswordSchema } from 'src/utils/rules'

type FormData = ResetPasswordSchema

function ResetPassword() {
  const navigate = useNavigate()
  const queryString = useQueryString()
  const token = queryString?.token

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (body: { token: string; password: string }) => authApi.resetPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    if (!token || resetPasswordMutation.isPending) return

    const body = omit(
      {
        ...data,
        token
      },
      ['confirmPassword']
    )

    resetPasswordMutation.mutate(body, {
      onSuccess: (res) => {
        toast.success(res.data.message)
        navigate(path.signin)
      }
    })
  })

  return token ? (
    <div className='px-5'>
      <Typography variant='h3' className='mb-8'>
        Reset password
      </Typography>

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-12'>
            <Input
              size='lg'
              label='New password'
              type='password'
              {...register('password')}
              containerProps={{ className: 'min-w-min' }}
            />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.password?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input size='lg' label='Confirm password' type='password' {...register('confirmPassword')} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>

        <Button type='submit' className='mt-2 bg-primary' disabled={resetPasswordMutation.isPending}>
          Save
        </Button>
      </form>
    </div>
  ) : (
    <>
      <Typography variant='h3'>Something went wrong!</Typography>
      <Link to={path.signin} className='mt-6 inline-block'>
        <Button>Back to Sign in</Button>
      </Link>
    </>
  )
}

export default ResetPassword
