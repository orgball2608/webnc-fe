// Profile.tsx
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextField, Button, Grid, Paper, Typography } from '@mui/material'

interface FormData {
  name: string
  birthday: string
  email: string
  phone: string
}

function Profile() {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>()

  const maxDate = new Date().toISOString().split('T')[0] // Get today's date

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle data when the form is submitted
    console.log(data)
  }

  const handleDateChange = (date: string) => {
    setValue('birthday', date, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <Grid container justifyContent='center' alignItems='center' height='100vh'>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant='h5' gutterBottom>
            My Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              render={({ field }) => <TextField {...field} label='Name' fullWidth margin='normal' />}
            />

            <Controller
              name='birthday'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Birthday'
                  type='date'
                  fullWidth
                  margin='normal'
                  onChange={(e) => handleDateChange(e.target.value)}
                  inputProps={{ max: maxDate }}
                  InputLabelProps={{ shrink: true }} // Fix for label overlapping
                />
              )}
            />

            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => <TextField {...field} label='Email' type='email' fullWidth margin='normal' />}
            />

            <Controller
              name='phone'
              control={control}
              defaultValue=''
              render={({ field }) => <TextField {...field} label='Phone' type='tel' fullWidth margin='normal' />}
            />

            <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: 2 }}>
              Update Profile
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Profile
