import React, { useCallback, useEffect, useState } from 'react'
import api from "../../utils/axios.js"
import { getResponseError } from "../../utils/api-helper.js"
import { useSnackbar } from "notistack"
import { CircularProgress, Backdrop, Box, Typography } from "@mui/material"
import PhotoCard from "../../components/photo-card"

const AllPhotosPage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/photos/all-photos')
      setPhotos(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  return (
    <>
      {loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <Typography variant="h5" mb={2}>All Photos</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
          />
        ))}
      </Box>
    </>
  )
}

export default AllPhotosPage
