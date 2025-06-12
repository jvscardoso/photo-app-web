import React, {useCallback, useEffect, useState} from 'react'
import api from "../../utils/axios.js"
import {getResponseError} from "../../utils/api-helper.js"
import {useSnackbar} from "notistack"
import {CircularProgress, Backdrop, Box, Button, Dialog, DialogTitle, DialogContent, Container} from "@mui/material"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/index.js"
import Iconify from "../../components/iconify/index.js"
import PhotoItem from "../../components/photo-item"
import PhotoForm from "../../components/photo-form/index"

const AllPhotosPage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const {enqueueSnackbar} = useSnackbar()
  const [photoDialog, setPhotoDialog] = useState(false)

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/photos/all-photos')
      setPhotos(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const newUserButton = (
    <Button
      variant='contained'
      onClick={() => setPhotoDialog(true)}
      endIcon={<Iconify icon="solar:camera-bold-duotone"/>}
    >
      Add photo
    </Button>
  )

  return (
    <Container sx={{p: 3}}>
      {loading && (
        <Backdrop open sx={{zIndex: (theme) => theme.zIndex.modal + 1}}>
          <CircularProgress color="primary"/>
        </Backdrop>
      )}

        <CustomBreadcrumbs
          heading="All photos"
          links={[{name: 'Home', href: '/'}, {name: 'All photos'}]}
          sx={{
            my: {xs: 3, md: 5}
          }}
          action={newUserButton}
          mobileActions={newUserButton}
        />

        <Box display="flex" flexDirection="column" gap={2}>
          {photos.map(photo => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              onLikedPhoto={fetchPhotos}
            />
          ))}
        </Box>

        <Dialog open={photoDialog} onClose={() => setPhotoDialog(false)} fullWidth>
          <DialogTitle> Add new photo </DialogTitle>
          <DialogContent>
            <PhotoForm onCancel={() => setPhotoDialog(false)} onSuccess={fetchPhotos}/>
          </DialogContent>
        </Dialog>
    </Container>
  )
}

export default AllPhotosPage
