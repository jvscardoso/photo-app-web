import React, {useEffect, useState} from 'react'
import {
  Container,
  Typography,
  Card,
  Avatar,
  Stack,
  Divider,
  Box,
} from '@mui/material'
import {useSnackbar} from 'notistack'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import api from '../../utils/axios'
import {getResponseError} from '../../utils/api-helper'
import UserPhotosPage from "../photos/user-photos.jsx";

const ProfilePage = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    }
  }

  useEffect(() => {
    fetchUser()
  })

  if (!user) return null

  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        backButton
        heading="My Profile"
        links={[{name: 'Home', href: '/'}, {name: 'Profile'}]}
        sx={{my: {xs: 3, md: 5}}}
      />

      <Card sx={{p: 3}}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32}}
          >
            {user.name?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{my: 3}}/>

        <UserPhotosPage userId={user.id}/>
      </Card>
    </Container>
  )
}

export default ProfilePage
