import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi, { SignupBodyRequest } from 'src/apis/auth.api'
import userApi, { UpdateProfileRequest } from 'src/apis/user.api'
import { useAppSelector, useAppDispatch } from 'src/app/store'
import path from 'src/constants/path'
import { updateProfile } from 'src/slices/auth.slice'
import { setProfileToLS } from 'src/utils/auth'
import { UpdateProfileSchema, updateProfileSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = UpdateProfileSchema

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { profile } = useAppSelector((state) => state.auth)

  const profileData = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile(`${profile?.id}`)
  })

  const profileUser = profileData?.data?.data

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(updateProfileSchema)
  })

  useEffect(() => {
    if (profileUser) {
      setValue('firstName', profileUser.firstName)
      setValue('lastName', profileUser.lastName)
      setValue('phoneNumber', profileUser.phoneNumber)
      setValue('address', profileUser.address)
    }
  }, [profileUser, setValue])

  const updateProfileMutation = useMutation({
    mutationFn: (body: UpdateProfileRequest) => userApi.updateProfile(body)
  })

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync(data)
    const updatedProfile = res.data.data
    dispatch(updateProfile({ updatedProfile }))
    toast.success(res.data.message)
    navigate(path.home)
  })

  return (
    <div className=' mt-20 flex flex-col items-center justify-center'>
      <div className='mb-5 text-5xl font-bold uppercase text-primary  '>Profile</div>
      <form className='w-4/5 md:w-3/5' onSubmit={onSubmit}>
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='grid grid-cols-6 gap-2 px-10 md:w-2/3'>
            <div className='col-span-12 grid w-full grid-cols-12 gap-2'>
              <div className='col-span-12 md:col-span-6'>
                <Input label='First name' {...register('firstName')} containerProps={{ className: 'min-w-min' }} />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.firstName?.message}
                </p>
              </div>

              <div className='col-span-12 md:col-span-6'>
                <Input label='Last name' {...register('lastName')} containerProps={{ className: 'min-w-min' }} />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            <div className='col-span-12'>
              <Input
                label='Email'
                defaultValue={profileUser?.email}
                containerProps={{ className: 'min-w-min' }}
                readOnly
              />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'></p>
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
          </div>

          <div className='flex justify-center pb-5 md:w-1/3 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/403709958_3496704047263312_6905800829882165925_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CO2MHkfaY7QAX9IyBv_&_nc_ht=scontent.fsgn5-10.fna&cb_e2o_trans=t&oh=00_AfBATazKAbvooB3C3EhGnLBP9I949LvavES7PNMGH42e-g&oe=655D34C2'
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <Input type='file' containerProps={{ className: 'hidden' }} accept='.jpg, .jpeg, png' />
              <Button type='button' className='border bg-white text-primary'>
                Choose Image
              </Button>
            </div>
          </div>
        </div>

        <hr className='mb-5 mt-5 border-t-gray-600' />
        <div className='flex items-center justify-center'>
          <Button type='submit' className='mt-2 bg-primary uppercase ' disabled={updateProfileMutation.isPending}>
            Update profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile
