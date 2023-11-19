import React from 'react'
import { Button } from '@material-tailwind/react'
import { useAppSelector } from 'src/app/store'

function Homepage() {
  const { profile } = useAppSelector((state) => state.auth)

  return (
    <div className='mt-40 flex flex-col items-center justify-center'>
      <h1 className='animate-pulse pb-8 text-center text-5xl font-bold text-indigo-600 md:mb-0 md:text-left'>
        Welcome to Classroom
      </h1>

      {profile && (
        <p className='text-3xl text-gray-500'>
          Hello, {profile.firstName} {profile.lastName}!
        </p>
      )}
      <Button color='indigo' className='mt-4'>
        Get Started
      </Button>
    </div>
  )
}

export default Homepage
