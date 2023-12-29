import { useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import courseApi from 'src/apis/courses.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useQueryString from 'src/hooks/useQueryString'
import { useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function InvitationEmail() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const currentURL = useLocation().pathname
  const { token } = useQueryString()

  const dataCourse = useMutation({
    mutationKey: ['invite-email'],
    mutationFn: courseApi.acceptInvitation
  })

  const hanlde = () => {
    dataCourse.mutate(token, {
      onSuccess: async (res) => {
        const course = res.data.data
        const classURL = currentURL.replace(`/join`, `/${course?.courseId}/news`)
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['teaching-list']
          }),
          queryClient.invalidateQueries({
            queryKey: ['enrolled-list']
          }),
          queryClient.invalidateQueries({
            queryKey: ['classes']
          })
        ])
        navigate(classURL)
      },
      onError: () => {
        navigate(path.home)
      }
    })
  }

  useEffect(() => {
    hanlde()
  }, [])

  return (
    <>
      <Box
        marginTop={32}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: dataCourse.isPending ? 'flex' : 'none' // Hiển thị khi isLoading là true
        }}
      >
        <CircularProgress />
      </Box>
    </>
  )
}
