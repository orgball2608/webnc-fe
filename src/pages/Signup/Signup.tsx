import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, Input, Typography, Button } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { FaFacebookF } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { RegisterSchema, registerSchema } from 'src/utils/rules'

type FormData = RegisterSchema

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
      {/* <div className='flex items-center'>
        <p className='mb-0 mr-4 text-lg font-normal'>Sign in with</p>
        <div className='flex items-center gap-2'>
          <IconButton className='h-8 w-8 rounded-full bg-primary text-white'>
            <FaFacebookF />
          </IconButton>

          <IconButton className='h-8 w-8 rounded-full bg-primary text-white'>
            <FcGoogle />
          </IconButton>
        </div>
      </div> */}

      {/* <div className='my-4 flex items-center gap-3'>
        <div className='h-[1px] flex-1 bg-blue-gray-200'></div>

        <p className='text-sm font-semibold'>Or</p>

        <div className='h-[1px] flex-1 bg-blue-gray-200'></div>
      </div> */}

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-6'>
            <Input label='First name' {...register('first_name')} containerProps={{ className: 'min-w-min' }} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.first_name?.message}
            </p>
          </div>

          <div className='col-span-6'>
            <Input label='Last name' {...register('last_name')} containerProps={{ className: 'min-w-min' }} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.last_name?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input label='Email' {...register('email')} containerProps={{ className: 'min-w-min' }} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.email?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input label='Phone number' {...register('phone_number')} containerProps={{ className: 'min-w-min' }} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.phone_number?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input label='Address' {...register('address')} containerProps={{ className: 'min-w-min' }} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.address?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input label='Password' type='password' {...register('password')} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.password?.message}
            </p>
          </div>

          <div className='col-span-12'>
            <Input label='Confirm password' type='password' {...register('confirm_password')} />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {errors.confirm_password?.message}
            </p>
          </div>
        </div>

        <Button type='submit' className='mt-2 bg-primary uppercase'>
          Sign up
        </Button>
      </form>

      <p className='mb-0 mt-2 pt-1 text-xs font-semibold'>
        Have an account?
        <Link
          to={path.signin}
          className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
        >
          Login
        </Link>
      </p>
    </>
  )
}

export default Signup
