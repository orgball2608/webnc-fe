// ChangePassword.tsx
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextField, Button, Grid, Paper, Typography } from '@mui/material'

interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

function ChangePassword() {
  const { control, handleSubmit } = useForm<ChangePasswordFormData>()

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    // Handle change password logic
    console.log(data)
  }

  return (
    <Grid container justifyContent='center' alignItems='center' height='100vh'>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant='h5' gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='currentPassword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} label='Current Password' type='password' fullWidth margin='normal' />
              )}
            />

            <Controller
              name='newPassword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} label='New Password' type='password' fullWidth margin='normal' />
              )}
            />

            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} label='Confirm Password' type='password' fullWidth margin='normal' />
              )}
            />

            <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: 2 }}>
              Change Password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ChangePassword
