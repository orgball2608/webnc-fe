// import { Typography } from '@material-tailwind/react'
import { Box, CircularProgress, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Textarea from '@mui/joy/Textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GradeReviewSchema, gradeReviewSchema } from 'src/utils/rules'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import gradeReviewApi from 'src/apis/review-grade.api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type FormData = GradeReviewSchema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateReviewModal({ isOpen, onClose, gradeData, infoSutdent }: any) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    resolver: zodResolver(gradeReviewSchema)
  })
  const reviewGradeMutation = useMutation({
    mutationFn: (body: GradeReviewSchema) =>
      gradeReviewApi.createReviewGrade(gradeData.courseId, gradeData.id, gradeData?.grades[0]?.id, body)
  })

  const onSubmit = handleSubmit((data) => {
    reviewGradeMutation.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['my-grade']
        })
        toast.success(t('submitReviewSuccessfully'))
        onClose()
      }
    })
  })

  return (
    <Dialog
      open={isOpen}
      fullWidth
      sx={{
        backdropFilter: 'blur(5px) sepia(5%)'
      }}
      PaperProps={{ sx: { borderRadius: '10px', maxWidth: '720px!important' } }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: reviewGradeMutation.isPending ? 'flex' : 'none' // Hiển thị khi isLoading là true
        }}
      >
        <CircularProgress />
      </Box>
      <DialogTitle
        variant='h5'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: 1
        }}
      >
        <div className='flex'>
          {' '}
          <Icon icon='material-symbols:rate-review-outline' className='mr-3 mt-1' width='30' height='30' />
          <strong>{t('gradeReview')} </strong>
        </div>
        <IconButton onClick={onClose} color='inherit' size='small' disabled={reviewGradeMutation.isPending}>
          <Icon icon='material-symbols:close' width='25' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Stack spacing={{ xs: 2, sm: 16 }} direction={'row'}>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>{t('fullname')}: </strong>
                {infoSutdent?.fullName}
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>{t('gradeComposition')}: </strong> {gradeData?.name}
              </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>{t('studentId')}:</strong> {infoSutdent?.studentId}
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>{t('currentGrade')}:</strong> {gradeData?.grades[0]?.grade}
              </Typography>
            </Stack>
          </Stack>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography variant='body1' sx={{ marginRight: '5px' }}>
                <strong>{t('expectGrade')}: </strong>
              </Typography>
            </Grid>
            <Grid item className='pt-4'>
              <TextField
                type='number'
                variant='standard'
                disabled={reviewGradeMutation.isPending}
                {...register('expectedGrade')}
              />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {t(errors.expectedGrade?.message) as string}
              </p>
            </Grid>
          </Grid>
          <Typography variant='body1' className=''>
            <strong>{t('explanation')}:</strong>{' '}
          </Typography>
          <div>
            <Textarea
              sx={{
                width: '100%',
                overflow: 'hidden',
                border: '1px solid',
                borderRadius: '15px',
                paddingX: '10px',
                paddingY: '10px'
              }}
              placeholder='Type your explanation here'
              variant='outlined'
              minRows={3}
              {...register('explanation')}
              disabled={reviewGradeMutation.isPending}
            />
            <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
              {t(errors.explanation?.message) as string}
            </p>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} disabled={reviewGradeMutation.isPending} sx={{ textTransform: 'none' }}>
          {t('sent')}
        </Button>
        <Button onClick={onClose} disabled={reviewGradeMutation.isPending} sx={{ textTransform: 'none' }}>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
