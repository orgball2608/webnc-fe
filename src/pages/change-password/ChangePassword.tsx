import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userApi, { ChangePasswordRequest } from 'src/apis/user.api'
import path from 'src/constants/path'
import { ErrorResponseApi } from 'src/types/utils.type'
import { ChangePasswordSchema, changePasswordSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = ChangePasswordSchema

function ChangePassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    resolver: zodResolver(changePasswordSchema)
  })

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordRequest) => userApi.changePassword(body)
  })

  const onSubmit = handleSubmit(async (data) => {
    if (changePasswordMutation.isPending) return

    try {
      const res = await changePasswordMutation.mutateAsync(data)
      toast.success(res.data.message)
      navigate(path.home)
    } catch (error) {
      reset()
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className=' mt-32 flex flex-col items-center justify-center'>
      <div className='mb-5 text-center text-5xl font-bold uppercase text-primary'>{t('changePassword')}</div>
      <form className='w-4/5 md:w-2/5' onSubmit={onSubmit}>
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='grid w-full grid-cols-6 gap-2 px-10'>
            <div className='col-span-12'>
              <Input
                autoFocus={true}
                type='password'
                label={t('currentPassword')}
                {...register('oldPassword')}
                containerProps={{ className: 'min-w-min focus' }}
              />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.oldPassword?.message)}
              </p>
            </div>

            <div className='col-span-12'>
              <Input
                label={t('newPassword')}
                type='password'
                {...register('newPassword')}
                containerProps={{ className: 'min-w-min' }}
              />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.newPassword?.message)}
              </p>
            </div>

            <div className='col-span-12'>
              <Input
                type='password'
                label={t('confirmNewPassword')}
                {...register('confirmPassword')}
                containerProps={{ className: 'min-w-min' }}
              />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.confirmPassword?.message)}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-10 flex items-center justify-center'>
          <Button type='submit' className='mt-2 bg-primary uppercase ' disabled={changePasswordMutation.isPending}>
            {t('changePassword')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
