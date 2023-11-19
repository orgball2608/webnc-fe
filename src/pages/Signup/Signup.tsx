import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi, { SignupBodyRequest } from 'src/apis/auth.api'
import AccountConfirmation from 'src/components/AccountConfirmation'
import path from 'src/constants/path'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = RegisterSchema

function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema)
  })

  const signupMutation = useMutation({
    mutationFn: (body: SignupBodyRequest) => authApi.signup(body)
  })

  const onSubmit = handleSubmit((data) => {
    if (signupMutation.isPending) return

    const body = omit(data, ['confirmPassword'])

    signupMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<{ message: { fieldName: string; errorMessage: string }[] }>(error)) {
          const formError = error.response?.data.message

          if (formError) {
            formError.forEach((error) => {
              setError(error.fieldName as keyof FormData, {
                message: error.errorMessage,
                type: 'server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <>
      {signupMutation.isSuccess ? (
        <AccountConfirmation
          email={watch('email')}
          onSubmit={() => {
            navigate(path.signin)
          }}
        />
      ) : (
        <div>
          <Typography variant='h3' className='mb-8'>
            Sign up
          </Typography>

          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-6'>
                <Input
                  size='lg'
                  label='First name'
                  {...register('firstName')}
                  containerProps={{ className: 'min-w-min' }}
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.firstName?.message}
                </p>
              </div>

              <div className='col-span-6'>
                <Input
                  size='lg'
                  label='Last name'
                  {...register('lastName')}
                  containerProps={{ className: 'min-w-min' }}
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.lastName?.message}
                </p>
              </div>

              <div className='col-span-12'>
                <Input size='lg' label='Email' {...register('email')} containerProps={{ className: 'min-w-min' }} />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.email?.message}
                </p>
              </div>

              <div className='col-span-12'>
                <Input
                  size='lg'
                  label='Phone number'
                  {...register('phoneNumber')}
                  containerProps={{ className: 'min-w-min' }}
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.phoneNumber?.message}
                </p>
              </div>

              <div className='col-span-12'>
                <Input size='lg' label='Address' {...register('address')} containerProps={{ className: 'min-w-min' }} />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.address?.message}
                </p>
              </div>

              <div className='col-span-12'>
                <Input size='lg' label='Password' type='password' {...register('password')} />
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

            <Button type='submit' className='mt-2 bg-primary uppercase' disabled={signupMutation.isPending}>
              Sign up
            </Button>
          </form>

          <p className='mb-0 mt-2 pt-1 text-sm font-normal'>
            Have an account?
            <Link
              to={path.signin}
              className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </>
  )
}

export default Signup
