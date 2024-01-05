import React from 'react'
// import { Typography } from '@material-tailwind/react'
import { Divider, IconButton, Stack, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Comment from '../Comment/Comment'
import { UpdateGradeModal } from '.'

import Textarea from '@mui/joy/Textarea'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReviewDetailModal({ isOpen, onClose }: any) {
  const [commentContent, setCommentContent] = React.useState('')

  const [isOpenUpdateModal, setIsOpenUpdateModal] = React.useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (e: any) => {
    console.log(e.target.value)
    setCommentContent(e.target.value)
  }

  const isCommentEmpty = commentContent.trim().length === 0

  const handleSendClick = () => {
    setCommentContent('')
  }

  const handleClick = () => {
    setIsOpenUpdateModal(true)
    // setCommentContent('')
  }

  const updateGradeModal = UpdateGradeModal({
    isOpen: isOpenUpdateModal,
    onCloseUpdateModal: () => setIsOpenUpdateModal(false),
    onCloseReviewModal: onClose
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
        <IconButton onClick={onClose} color='inherit' size='small'>
          <Icon icon='material-symbols:close' width='25' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Stack spacing={{ xs: 2, sm: 16 }} direction={'row'}>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>Fullname:</strong> Nguyen Tan Chu
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>Grade Composition:</strong> Giua ki
              </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
              <Typography variant='body1' className='mb-2'>
                <strong>Student ID:</strong> 20120443
              </Typography>
              <Typography variant='body1' className='mb-2'>
                <strong>Current Grade:</strong> 8
              </Typography>
            </Stack>
          </Stack>
          <Typography variant='body1' className='mb-2'>
            <strong>Expectation grade:</strong> 10
          </Typography>
          <Typography variant='body1' className='mb-2'>
            <strong>Explanation:</strong> Em lam tot, lam chuan, khong biet sai o dau ma lai co 8 diem, mong thay xem
            xet va cho em loi nhan xet ve bai lam cua em a
          </Typography>
          <Divider sx={{ borderBottomWidth: 2 }} />
          <div className='text-xl'>
            <strong>Comments</strong>
          </div>
          <Comment />
          <Stack direction={'row'} style={{ alignItems: 'flex-end' }} sx={{ paddingBottom: 1 }}>
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
              onChange={handleInput}
              value={commentContent}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleSendClick} color='inherit' size='medium' disabled={isCommentEmpty}>
                <Icon icon='fluent:send-48-filled' width='30' height='30' color={isCommentEmpty ? '' : '#3b82f6'} />
              </IconButton>
            </div>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} sx={{ textTransform: 'none' }}>
          Update grade and complete review
        </Button>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
      {updateGradeModal}
    </Dialog>
  )
}
