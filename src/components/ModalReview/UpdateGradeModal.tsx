import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateGradeSchema, updateGradeSchema } from 'src/utils/rules'
import gradeReviewApi from 'src/apis/review-grade.api'
import { toast } from 'react-toastify'

type FormData = UpdateGradeSchema

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UpdateGradeModal({ isOpen, onCloseUpdateModal, onCloseReviewModal, reviewData }: any) {
  const queryClient = useQueryClient()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    resolver: zodResolver(updateGradeSchema)
  })

  const updateGradeMutation = useMutation({
    mutationFn: (body: UpdateGradeSchema) =>
      gradeReviewApi.updateGrade(reviewData?.courseId, reviewData?.compositionId, reviewData?.gradeId, body)
  })

  const markCompletedMutation = useMutation({
    mutationFn: () => gradeReviewApi.markCompleted(reviewData?.courseId, reviewData?.id)
  })

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      grade: data.grade,
      studentId: reviewData?.studentId
    }

    await (updateGradeMutation.mutateAsync(body), markCompletedMutation.mutateAsync())
    await queryClient.invalidateQueries({
      queryKey: ['review-list']
    })
    toast.success('Hoàn thành Review!')
    // onClose()
    onCloseReviewModal()
    onCloseUpdateModal()
  })

  return (
    <Dialog
      open={isOpen}
      maxWidth='xs'
      sx={{
        backdropFilter: 'blur(5px) sepia(5%)'
      }}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: updateGradeMutation.isPending || markCompletedMutation.isPending ? 'flex' : 'none' // Hiển thị khi isLoading là true
        }}
      >
        <CircularProgress />
      </Box>
      <DialogTitle
        variant='h6'
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
          <strong>Update Grade </strong>
        </div>
        <IconButton
          onClick={onCloseUpdateModal}
          color='inherit'
          size='small'
          disabled={updateGradeMutation.isPending || markCompletedMutation.isPending}
        >
          <Icon icon='material-symbols:close' width='25' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Typography variant='body1' className='mb-2'>
            <strong>Current Grade: </strong> {reviewData?.grade}
          </Typography>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography variant='body1' sx={{ marginRight: '5px' }}>
                <strong>New Grade: </strong>
              </Typography>
            </Grid>
            <Grid item>
              <TextField type='number' variant='standard' {...register('grade')} />
              <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                {errors.grade?.message as string}
              </p>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'none' }}
          onClick={onSubmit}
          disabled={updateGradeMutation.isPending || markCompletedMutation.isPending}
        >
          Complete review
        </Button>
        <Button
          sx={{ textTransform: 'none' }}
          onClick={onCloseUpdateModal}
          disabled={updateGradeMutation.isPending || markCompletedMutation.isPending}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
