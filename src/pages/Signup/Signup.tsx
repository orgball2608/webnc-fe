import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa'
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

          <div className='before:border-neutral-300 after:border-neutral-300 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t after:mt-0.5 after:flex-1 after:border-t'>
            <p className='dark:text-neutral-200 mx-4 mb-0 text-center font-semibold'>OR</p>
          </div>

          <div>
            {/* Social login buttons */}
            <Link
              className='hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
              style={{ backgroundColor: '#3b5998' }}
              to={import.meta.env.VITE_FACEBOOK_LOGIN_URL}
              data-te-ripple-init
              data-te-ripple-color='light'
            >
              {/* Facebook */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mr-2 h-3.5 w-3.5'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
              </svg>
              Continue with Facebook
            </Link>
            <Link
              className='bg-info hover:bg-info-600 focus:bg-info-600 active:bg-info-700 mb-3 flex w-full items-center justify-center rounded px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]'
              style={{ backgroundColor: '#55acee' }}
              to={import.meta.env.VITE_GOOGLE_LOGIN_URL}
              data-te-ripple-init
              data-te-ripple-color='light'
            >
              {/* Google */}
              <FaGoogle className='mr-2 h-3.5 w-3.5' />
              Continue with Google
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Signup
