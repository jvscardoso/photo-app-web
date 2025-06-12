import React, {useCallback, useEffect, useState} from 'react'
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/index.js"
import {getResponseError} from "../../utils/api-helper.js"
import {useSnackbar} from "notistack"
import api from "../../utils/axios.js"
import {useParams} from "react-router-dom"
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import PhotoCard from "../../components/photo-card/index"
import {useAuth} from "../../contexts/auth/use-auth"
import ConfirmDialog from "../../components/confirmation-dialog/index.jsx";
import Render from "../../components/conditional/Render/index.jsx";
import Iconify from "../../components/iconify/index.js";
import PhotoForm from "../../components/photo-form/index.jsx";

const UserPhotosPage = ({userId}) => {
  const {enqueueSnackbar} = useSnackbar()
  const {id} = useParams()
  const {user} = useAuth()

  const [userPhotos, setUserPhotos] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState(null)
  const [photoDialog, setPhotoDialog] = useState(false)

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/photos/user-photos/${userId ?? id}`)
      setUserPhotos(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setIsLoading(false)
    }
  }, [enqueueSnackbar, id, userId])

  const handleDeletePhoto = async (photoId) => {
    setIsLoading(true)
    try {
      await api.delete(`/photos/${photoId}`)
      enqueueSnackbar('Photo deleted successfully', {variant: 'success'})
      fetchPhotos()
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccess = () => {
    setPhotoDialog(false)
    fetchPhotos()
  }

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  return (
    <Container sx={{p: 3}}>
      <Render if={!userId}>
        <CustomBreadcrumbs
          backButton
          heading={userPhotos[0]?.photographer || 'Back to home'}
          links={[{name: 'Home', href: '/'}, {name: 'User Photos'}]}
          sx={{my: {xs: 3, md: 5}}}
        />

        <Backdrop open={isLoading}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <Render if={!isLoading && userPhotos.length === 0}>
          <Typography variant="h1" color="primary" gutterBottom>
            Sorry
          </Typography>
          <Typography variant="h5" gutterBottom>
            This user does not have any photos.
          </Typography>
          <Typography variant="body1" sx={{mb: 4}}>
            Go back to the home back to discover amazing photographers.
          </Typography>
        </Render>
      </Render>

      <Render if={userId && userPhotos.length === 0}>
        <Typography variant="h4" gutterBottom>
          Look's like you don't have any photos yet.
        </Typography>
        <Button
          variant='contained'
          onClick={() => setPhotoDialog(true)}
          endIcon={<Iconify icon="solar:camera-bold-duotone"/>}
        >
          Create your photo
        </Button>
      </Render>

      <Render if={!isLoading && userPhotos.length > 0}>
        <Box
          padding={2}
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          }}>
          {userPhotos.map(photo => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              showDeleteButton={user?.id === photo.photographer_id}
              onDelete={() => {
                setSelectedPhotoId(photo.id)
                setConfirmDelete(true)
              }}
            />
          ))}
        </Box>
      </Render>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Confirm delete"
        content="Are you sure you want to delete?"
        action={
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setConfirmDelete(false)}
            >
              No
            </Button>

            <Button
              loading={isLoading}
              variant="contained"
              onClick={() => {
                handleDeletePhoto(selectedPhotoId)
                setConfirmDelete(false)
              }}
            >
              Yes
            </Button>
          </DialogActions>
        }
        showCancelButton={false}
      />

      <Dialog open={photoDialog} onClose={() => setPhotoDialog(false)} fullWidth>
        <DialogTitle> Add new photo </DialogTitle>
        <DialogContent>
          <PhotoForm onCancel={() => setPhotoDialog(false)} onSuccess={handleSuccess}/>
        </DialogContent>
      </Dialog>

    </Container>
  )
}

export default UserPhotosPage
