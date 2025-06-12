import React, {useCallback, useState} from 'react'
import {
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog
} from '@mui/material'
import {format, parseISO} from 'date-fns'
import {ROLE_LABELS} from '../../utils/user-enums'
import api from '../../utils/axios'
import {useSnackbar} from 'notistack'
import {getResponseError} from '../../utils/api-helper'
import ConfirmDialog from '../confirmation-dialog/index'
import UserForm from '../user-form/index'

const UserDetails = ({userData, onSuccess}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmRestore, setConfirmRestore] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

  const handleUpdate = () => {
    setOpenForm(true)
  }

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    try {
      await api.delete(`/users/admin/${userData?.id}`)
      enqueueSnackbar('User deleted successfully', {variant: 'success'})
      onSuccess()
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setIsLoading(false)
    }
  }, [enqueueSnackbar, onSuccess, userData?.id])

  const handleRestore = useCallback(async () => {
    setIsLoading(true)
    try {
      await api.patch(`/users/admin/${userData?.id}/restore`)
      enqueueSnackbar('User restored successfully', {variant: 'success'})
      onSuccess()
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setIsLoading(false)
    }
  }, [enqueueSnackbar, onSuccess, userData?.id])


  return (
    <Container sx={{p: 3}}>
      <Grid container spacing={1} sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Grid item size={12}>
          <Typography variant="body2" color="text.secondary">Name</Typography>
          <Typography variant="subtitle2">{userData?.name}</Typography>
        </Grid>

        <Grid item size={6}>
          <Typography variant="body2" color="text.secondary">Type</Typography>
          <Typography variant="subtitle2">{ROLE_LABELS[userData?.role]}</Typography>
        </Grid>

        <Grid item size={6}>
          <Typography variant="body2" color="text.secondary">E-mail</Typography>
          <Typography variant="subtitle2">{userData?.email}</Typography>
        </Grid>

        <Grid item size={12}>
          <Typography variant="body2" color="text.secondary">Created at</Typography>
          <Typography variant="subtitle2">
            {format(parseISO(userData?.created_at), 'dd/MM/yyyy HH:mm')}
          </Typography>
        </Grid>

        {userData.deleted_at && (
          <Grid item size={12}>
            <Typography variant="body2" color="text.secondary">Deleted at</Typography>
            <Typography variant="subtitle2">
              {format(parseISO(userData?.deleted_at), 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Grid>
        )}

        <Grid item size={12}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleUpdate}>
              Edit
            </Button>
            {userData?.deleted_at ? (
              <Button variant="contained" onClick={() => setConfirmRestore(true)}>
                Restore
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            )}
          </Stack>
        </Grid>

      </Grid>
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>
          Edit user
        </DialogTitle>
        <DialogContent>
          <UserForm user={userData}/>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenForm(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmRestore}
        onClose={() => setConfirmRestore(false)}
        title="Confirm restore"
        content="Are you sure you want to restore?"
        action={
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setConfirmRestore(false)}
            >
              No
            </Button>

            <Button
              loading={isLoading}
              variant="contained"
              onClick={() => {
                handleRestore()
              }}
            >
              Yes
            </Button>
          </DialogActions>
        }
        showCancelButton={false}
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Confirm deletion"
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
                handleDelete()
              }}
            >
              Yes
            </Button>
          </DialogActions>
        }
        showCancelButton={false}
      />
    </Container>
  )
}

export default UserDetails
