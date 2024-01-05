import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
  Button,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UpdateGradeModal({ isOpen, onCloseUpdateModal, onCloseReviewModal }: any) {
  const handleClick = () => {
    onCloseReviewModal()
    onCloseUpdateModal()
  }
  return (
    <Dialog
      open={isOpen}
      onClose={onCloseUpdateModal}
      maxWidth='xs'
      sx={{
        backdropFilter: 'blur(5px) sepia(5%)'
      }}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
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
        <IconButton onClick={onCloseUpdateModal} color='inherit' size='small'>
          <Icon icon='material-symbols:close' width='25' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Typography variant='body1' className='mb-2'>
            <strong>Current Grade: </strong> 8
          </Typography>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography variant='body1' sx={{ marginRight: '5px' }}>
                <strong>New Grade: </strong>
              </Typography>
            </Grid>
            <Grid item>
              <TextField type='number' variant='standard' />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'none' }} onClick={handleClick}>
          Complete review
        </Button>
        <Button sx={{ textTransform: 'none' }} onClick={onCloseUpdateModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
