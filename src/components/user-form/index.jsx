import React, {useCallback, useState} from 'react'
import * as yup from 'yup'
import {useForm, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button
} from '@mui/material'
import {getResponseError} from '../../utils/api-helper'
import {useSnackbar} from 'notistack'
import api from '../../utils/axios'

export default function UserForm({user, onSuccess}) {
  const [loading, setLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

  const userSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    email: yup.string().required('E-mail is required.'),
    role: yup.string().required('Select user role'),
    password: yup.string().when([], {
      is: () => !user?.id,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  })


  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || ''
    }
  })

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = methods

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        if (user?.id) {
          delete data.password
          await api.patch(`/users/${user?.id}`, data)
          enqueueSnackbar('User updated successfully', {variant: 'success'})
          onSuccess()
        } else {
          await api.post('/auth/register', data)
          enqueueSnackbar('User created successfully', {variant: 'success'})
          onSuccess()
        }
      } catch (error) {
        enqueueSnackbar(getResponseError(error), {variant: 'error'})
      } finally {
        setLoading(false)
      }
    },
    [enqueueSnackbar, onSuccess, user?.id]
  )

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{width: '100%', mt: 2}}
      >
        <Grid container spacing={2}>
          <Grid item size={12}>
            <TextField
              fullWidth
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item size={12}>
            <TextField
              fullWidth
              label="E-mail"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {!user && (
            <Grid item size={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          )}

          <Grid item size={12}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">User type</InputLabel>
              <Select
                labelId="role-label"
                label="User type"
                defaultValue=""
                {...register('role')}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {user?.id ? 'Update user' : 'Create user'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}
