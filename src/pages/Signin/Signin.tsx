import { IconButton, Input, Typography, Button } from '@material-tailwind/react'
import { FaFacebookF } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <>
      <div className='flex items-center'>
        <p className='mb-0 mr-4 text-lg font-normal'>Sign in with</p>
        <div className='flex items-center gap-2'>
          <IconButton className='bg-primary h-8 w-8 rounded-full text-white'>
            <FaFacebookF />
          </IconButton>

          <IconButton className='bg-primary h-8 w-8 rounded-full text-white'>
            <FcGoogle />
          </IconButton>
        </div>
      </div>

      <div className='my-4 flex items-center gap-3'>
        <div className='bg-blue-gray-200 h-[1px] flex-1'></div>

        <p className='text-base font-semibold'>Or</p>

        <div className='bg-blue-gray-200 h-[1px] flex-1'></div>
      </div>

      <form>
        <div className='mb-2'>
          <Input label='Email' />
          <Typography color='red' className='mt-1 flex min-h-[20px] items-center gap-1 text-xs font-normal'>
            {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='-mt-px h-4 w-4'>
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
                clipRule='evenodd'
              />
            </svg>
            Use at least 8 characters, one uppercase, one lowercase and one number. */}
          </Typography>
        </div>

        <div className='mb-2'>
          <Input label='Password' type='password' />
          <Typography color='red' className='mt-1 flex min-h-[20px] items-center gap-1 text-xs font-normal'>
            {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='-mt-px h-4 w-4'>
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
                clipRule='evenodd'
              />
            </svg>
            Use at least 8 characters, one uppercase, one lowercase and one number. */}
          </Typography>
        </div>

        <Button type='submit' className='bg-primary uppercase'>
          Login
        </Button>
      </form>

      <p className='mb-0 mt-2 pt-1 text-xs font-semibold'>
        Don't have an account?
        <Link
          to='/signup'
          className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
        >
          Register
        </Link>
      </p>
    </>
  )
}

export default Signin
