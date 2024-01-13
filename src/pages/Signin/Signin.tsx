import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaGoogle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import authApi, { SigninBodyRequest } from 'src/apis/auth.api'
import { useAppDispatch } from 'src/app/store'
import path from 'src/constants/path'
import useQueryString from 'src/hooks/useQueryString'
import { signin as signinAction } from 'src/slices/auth.slice'
import { AuthQueryConfig } from 'src/types/auth.type'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosBadRequestError, isAxiosNotFound, isAxiosUnauthorized } from 'src/utils/utils'

type FormData = LoginSchema

function Signin() {
  const { t } = useTranslation()
  const queryString: AuthQueryConfig = useQueryString()
  const queryConfig: AuthQueryConfig = {
    access_token: queryString.access_token || '',
    refresh_token: queryString.refresh_token || ''
  }

  const dispatch = useAppDispatch()
  const location = useLocation()

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

  const getMeQuery = useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    enabled: signinMutation.isSuccess,
    gcTime: 0
  })

  useEffect(() => {
    if (getMeQuery.isSuccess) {
      const profile = getMeQuery.data.data
      dispatch(signinAction({ profile }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeQuery.isSuccess])

  useEffect(() => {
    if (queryConfig.access_token && queryConfig.refresh_token) {
      getMeQuery.refetch()
    }
  }, [getMeQuery, queryConfig.access_token, queryConfig.refresh_token])

  const onSubmit = handleSubmit((data) => {
    if (signinMutation.isPending || getMeQuery.isFetching) return

    signinMutation.mutate(data, {
      onError: (error) => {
        if (
          isAxiosBadRequestError<{ message: string }>(error) ||
          isAxiosUnauthorized<{ message: string }>(error) ||
          isAxiosNotFound<{ message: string }>(error)
        ) {
          setError('email', {
            message: error.response?.data.message,
            type: 'Server'
          })
        }
      }
    })
  })

  return (
    <>
      <Helmet>
        <title>{t('signIn')}</title>
      </Helmet>

      <div className='px-5'>
        <Typography variant='h3' className='mb-8'>
          {t('signIn')}
        </Typography>

        <form onSubmit={onSubmit}>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12'>
              <Input size='lg' label='Email' {...register('email')} containerProps={{ className: 'min-w-min' }} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.email?.message)}
              </p>
            </div>

            <div className='col-span-12'>
              <Input size='lg' label='Password' type='password' {...register('password')} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.password?.message)}
              </p>
            </div>
          </div>

          <Button
            type='submit'
            className='mt-2 bg-primary uppercase'
            disabled={getMeQuery.isFetching || signinMutation.isPending}
          >
            {t('signIn')}
          </Button>
        </form>

        <div className='mb-0 mt-2 flex justify-between pt-1'>
          <p className='text-sm font-normal'>
            {t('dontHaveAnAccount')}
            <Link
              to={path.signup}
              state={location.state}
              className='ml-1 text-red-500 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700'
            >
              {t('signUp')}
            </Link>
          </p>

          <Link to={path.forgotPassword} className='text-sm font-normal text-red-500'>
            {t('forgotPassword')}
          </Link>
        </div>

        <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
          <p className='mx-4 mb-0 text-center font-semibold dark:text-neutral-200'>{t('or')}</p>
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
            {t('continueWithFacebook')}
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
            {t('continueWithGoogle')}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signin
