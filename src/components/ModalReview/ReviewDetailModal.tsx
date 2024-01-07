import React, { useEffect, useRef, useState } from 'react'
// import { Typography } from '@material-tailwind/react'
import { Box, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import 'moment/locale/vi'
import Comment from '../Comment/Comment'
import { UpdateGradeModal } from '.'

import Textarea from '@mui/joy/Textarea'
import { Role } from 'src/constants/enums'
import gradeReviewApi from 'src/apis/review-grade.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ReviewComment } from 'src/types/review-comment.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReviewDetailModal({ isOpen, setIsOpenReviewModal, reviewData, myRole }: any) {
  const queryClient = useQueryClient()

  const commentListRef = useRef<HTMLDivElement | null>(null)

  const onClose = () => {
    setIsOpenReviewModal(false)
    // setCommentList([])
  }

  const [isOpenUpdateModal, setIsOpenUpdateModal] = React.useState(false)

  const { register, handleSubmit, watch, setValue } = useForm()

  const content = watch('body')?.trim()
  const isCommentEmpty = content?.length === 0 || content === undefined

  const createCommentMutation = useMutation({
    mutationFn: (body: { body: string; studentId: string }) =>
      gradeReviewApi.createCommentReview(reviewData.courseId, reviewData.id, body)
  })

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      body: data.body,
      studentId: reviewData.studentId
    }
    await createCommentMutation.mutateAsync(body)
    setValue('body', '')
    // setCommentContent('')
  })

  const handleClickComplete = () => {
    setIsOpenUpdateModal(true)
    // setCommentContent('')
  }
  const markInCompleteMutation = useMutation({
    mutationFn: () => gradeReviewApi.markInComplete(reviewData?.courseId, reviewData?.id)
  })

  const handleClickIncomplete = async () => {
    await markInCompleteMutation.mutateAsync()
    await queryClient.invalidateQueries({
      queryKey: ['review-list']
    })
    onClose()
    toast.success('Mở lại Review thành công!')
  }

  const updateGradeModal = UpdateGradeModal({
    isOpen: isOpenUpdateModal,
    onCloseUpdateModal: () => setIsOpenUpdateModal(false),
    onCloseReviewModal: onClose,
    reviewData
  })

  const [commentList, setCommentList] = useState<ReviewComment[]>([])

  const commentQuery = useQuery({
    queryKey: ['comment-list', reviewData?.id, reviewData?.isResolve, isOpen],
    queryFn: () => gradeReviewApi.getCommentList(reviewData?.courseId, reviewData?.id),
    enabled: Boolean(reviewData?.id)
  })

  const commentData = commentQuery?.data?.data?.data

  useEffect(() => {
    setCommentList([])
    if (commentQuery.isSuccess) {
      setCommentList(commentData || [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentData])

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
          display: markInCompleteMutation.isPending ? 'flex' : 'none' // Hiển thị khi isLoading là true
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
          <strong>Grade Review </strong>
        </div>
        <IconButton
          onClick={onClose}
          color='inherit'
          size='small'
          disabled={markInCompleteMutation.isPending || createCommentMutation.isPending}
        >
          <Icon icon='material-symbols:close' width='25' />
        </IconButton>
      </DialogTitle>
      <DialogContent ref={commentListRef}>
        <Stack spacing={3}>
          <Stack spacing={{ xs: 2, sm: 16 }} direction={'row'}>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>Fullname: </strong> {reviewData?.fullName}
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>Grade Composition: </strong> {reviewData?.gradeName}
              </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>Student ID: </strong> {reviewData?.studentId}
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>Current Grade:</strong> {reviewData?.grade}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant='body1' className='mb-2'>
            <strong>Expectation grade:</strong> {reviewData?.expectedGrade}
          </Typography>
          <Stack direction='row' className='mb-2'>
            <strong>Explanation: </strong>
            <div>
              {' '}
              {reviewData?.explanation?.split('\n').map((p: string, index: number) => (
                <p key={index} className='ml-2'>
                  {' '}
                  {p}
                </p>
              ))}
            </div>
          </Stack>
          <Divider sx={{ borderBottomWidth: 2 }} />
          <div className='text-xl'>
            <strong>Comments</strong>
          </div>
          <Stack spacing={3} alignItems='center'>
            {commentQuery.isLoading && (
              <div className='items-center justify-center'>
                <CircularProgress />
              </div>
            )}
            <Comment commentList={commentList} setCommentList={setCommentList} />
          </Stack>
          {reviewData?.isResolve ? (
            <Typography textAlign='center'>
              <strong>Review đã được giải quyết</strong>
            </Typography>
          ) : (
            <form onSubmit={onSubmit}>
              <Stack direction='column'>
                <Stack direction={'row'}>
                  <Textarea
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      border: '1px solid',
                      borderRadius: '15px',
                      paddingX: '10px',
                      paddingY: '10px'
                    }}
                    placeholder='Type your comment here'
                    variant='outlined'
                    // onChange={handleInput}
                    // value={commentContent}
                    {...register('body')}
                    disabled={createCommentMutation.isPending || commentQuery.isLoading}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <IconButton
                      color='inherit'
                      size='medium'
                      disabled={isCommentEmpty || createCommentMutation.isPending}
                      type='submit'
                      title='Send'
                    >
                      <Icon
                        icon='fluent:send-48-filled'
                        width='30'
                        height='30'
                        color={isCommentEmpty ? '' : '#3b82f6'}
                      />
                    </IconButton>
                  </div>
                </Stack>
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {createCommentMutation.isPending && 'Đang gửi comment...'}
                </p>
              </Stack>
            </form>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {myRole === Role.TEACHER &&
          (!reviewData?.isResolve ? (
            <Button onClick={handleClickComplete} sx={{ textTransform: 'none' }}>
              Update grade and complete review
            </Button>
          ) : (
            <Button
              onClick={handleClickIncomplete}
              sx={{ textTransform: 'none' }}
              disabled={markInCompleteMutation.isPending}
            >
              Open review
            </Button>
          ))}
        <Button onClick={onClose} sx={{ textTransform: 'none' }} disabled={markInCompleteMutation.isPending}>
          Close
        </Button>
      </DialogActions>
      {updateGradeModal}
    </Dialog>
  )
}
