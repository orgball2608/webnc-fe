import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import authApi, { SignupBodyRequest } from 'src/apis/auth.api'
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
    // resolver: zodResolver(registerSchema)
  })

  const signupMutation = useMutation({
    mutationFn: (body: SignupBodyRequest) => authApi.signup(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword'])

    signupMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <>
      {/* <div>
        <form onSubmit={onSubmit}>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-6'>
              <Input label='First name' {...register('firstName')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.firstName?.message}
              </p>
            </div>
        
            <div className='col-span-6'>
              <Input label='Last name' {...register('lastName')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.lastName?.message}
              </p>
            </div>
        
            <div className='col-span-12'>
              <Input label='Email' {...register('email')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.email?.message}
              </p>
            </div>
        
            <div className='col-span-12'>
              <Input label='Phone number' {...register('phoneNumber')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.phoneNumber?.message}
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
              <Input label='Confirm password' type='password' {...register('confirmPassword')} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
        
          <Button type='submit' className='mt-2 bg-primary uppercase'>
            Sign up
          </Button>
        </form>
        
        <p className='mb-0 mt-2 pt-1 text-sm font-semibold'>
          Have an account?
          <Link
            to={path.signin}
            className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
          >
            Sign in
          </Link>
        </p>
      </div> */}

      <div></div>
    </>
  )
}

export default Signup
