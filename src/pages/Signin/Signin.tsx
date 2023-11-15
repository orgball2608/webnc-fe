import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, Input, Button } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi, { SigninBodyRequest } from 'src/apis/auth.api'
import path from 'src/constants/path'
import { LoginSchema, loginSchema } from 'src/utils/rules'

type FormData = LoginSchema

function Signin() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const signinMutation = useMutation({
    mutationFn: (body: SigninBodyRequest) => authApi.signin(body)
  })

  const onSubmit = handleSubmit((data) => {
    if (signinMutation.isPending) return

    signinMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        // navigate(path.home)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  console.log(errors)

  return (
    <>
      <div className='px-5'>
        <form onSubmit={onSubmit}>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12'>
              <Input label='Email' {...register('email')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.email?.message}
              </p>
            </div>

            <div className='col-span-12'>
              <Input label='Password' type='password' {...register('password')} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.password?.message}
              </p>
            </div>
          </div>

          <Button type='submit' className='mt-2 bg-primary uppercase' disabled={signinMutation.isPending}>
            Sign in
          </Button>
        </form>

        <p className='mb-0 mt-2 pt-1 text-sm font-semibold'>
          Don't have an account?
          <Link
            to={path.signup}
            className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Signin
