import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, Input, Button } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { FaFacebookF } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { LoginSchema, loginSchema } from 'src/utils/rules'

type FormData = LoginSchema

function Signin() {
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

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  console.log(errors)

  return (
    <>
      <div className='flex items-center'>
        <p className='mb-0 mr-4 text-lg font-normal'>Sign in with</p>
        <div className='flex items-center gap-2'>
          <IconButton className='h-8 w-8 rounded-full bg-primary text-white'>
            <FaFacebookF />
          </IconButton>

          <IconButton className='h-8 w-8 rounded-full bg-primary text-white'>
            <FcGoogle />
          </IconButton>
        </div>
      </div>

      <div className='my-4 flex items-center gap-3'>
        <div className='h-[1px] flex-1 bg-blue-gray-200'></div>

        <p className='text-sm font-semibold'>Or</p>

        <div className='h-[1px] flex-1 bg-blue-gray-200'></div>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mb-2'>
          <Input label='Email' {...register('email')} />
          <p className='ml-1 mt-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
            {errors.email?.message}
          </p>
        </div>

        <div className='mb-2'>
          <Input label='Password' type='password' {...register('password')} />
          <p className='ml-1 mt-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
            {errors.password?.message}
          </p>
        </div>

        <Button type='submit' className='bg-primary uppercase'>
          Login
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
    </>
  )
}

export default Signin
