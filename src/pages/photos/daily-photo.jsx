import React, {useCallback, useEffect, useState} from 'react'
import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Box,
  Paper
} from '@mui/material'
import {RouterLink} from '../../components/router-link'
import {useSnackbar} from 'notistack'
import {getResponseError} from '../../utils/api-helper'
import api from '../../utils/axios'
import {useAuth} from "../../contexts/auth/use-auth"

const DailyPhotoPage = () => {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const {enqueueSnackbar} = useSnackbar()
  const {user} = useAuth()

  const fetchPhoto = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/photos/daily-photo')
      setPhoto(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchPhoto()
  }, [fetchPhoto])

  return (
    <>
      {loading && (
        <Backdrop open sx={{zIndex: (theme) => theme.zIndex.modal + 1}}>
          <CircularProgress color="primary"/>
        </Backdrop>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h4">
          Daily photo
        </Typography>
        <Typography variant="subtitle2">
          Check this page daily to see amazing photos.
        </Typography>

        {photo && (
          <>
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: '#eee',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: 2
              }}
            >
              <img
                src={photo?.url}
                alt={photo.alt}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </Box>

            <Paper elevation={3} sx={{p: 2, maxWidth: 400, width: '100%'}}>
              <Typography variant="subtitle1">
                <strong>Alt:</strong> {photo.alt}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Photographer:</strong>{' '}
                <a
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.photographer}
                </a>
              </Typography>
              <Typography variant="subtitle1">
                <strong>Likes:</strong> {photo.likes}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Dimensions:</strong> {photo.width} x {photo.height}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Average Color:</strong>{' '}
                <span
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    backgroundColor: photo.avg_color,
                    border: '1px solid #ccc',
                    marginLeft: 4
                  }}
                />
              </Typography>
            </Paper>
          </>
        )}

        {!user && (
          <Button
            variant=""
            sx={{mt: 4}}
            component={RouterLink}
            href="/auth/login"
          >
            Click here to see all photos
          </Button>
        )}
      </Box>
    </>
  )
}

export default DailyPhotoPage
