import { Avatar, Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import { SOCKET_MESSAGES } from 'src/constants/constants'
import { ReviewComment } from 'src/types/review-comment.type'
import socket from 'src/utils/socket'
import moment from 'moment'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Comment({
  setCommentList,
  commentList
}: {
  setCommentList: React.Dispatch<React.SetStateAction<ReviewComment[]>>
  commentList: ReviewComment[]
}) {
  useEffect(() => {
    const listener = async (data: ReviewComment) => {
      // await queryClient.invalidateQueries({
      //   queryKey: ['notifications']
      // })
      setCommentList((prevCommentList) => [...prevCommentList, data])
    }

    socket.on(SOCKET_MESSAGES.REVIEW_COMMENTED, listener)

    return () => {
      socket.off(SOCKET_MESSAGES.REVIEW_COMMENTED, listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {commentList.map((comment) => (
        <Paper style={{ padding: '1rem 0.5rem' }} sx={{ width: '100%' }} key={comment.id}>
          <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
              <Avatar alt='Remy Sharp' src={comment?.createdBy?.avatar}>
                {comment?.createdBy?.firstName[0]}
              </Avatar>
            </Grid>
            <Grid justifyContent='left' item xs zeroMinWidth>
              <div className='md:flex'>
                <h4 style={{ margin: 0, textAlign: 'left' }}>
                  <strong>
                    {comment?.createdBy?.firstName} {comment?.createdBy?.lastName}
                  </strong>
                </h4>
                <p className='text-left text-[0.8rem] text-gray-600 md:ml-2 md:mt-[0.2rem]'>
                  {moment(comment?.createdAt)
                    .locale('vi')
                    .format('HH:mm DD-MM-YYYY')}
                </p>
              </div>
              {comment?.body.split('\n').map((paragraph, index) => (
                <p key={index} style={{ textAlign: 'justify', color: 'black' }}>
                  {paragraph}
                </p>
              ))}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}
