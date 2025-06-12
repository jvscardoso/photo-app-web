import React from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box, Link,
} from '@mui/material'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useAuth} from '../../contexts/auth/use-auth'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {getResponseError} from '../../utils/api-helper'
import AuthLayout from '../../layouts/auth-layout'
import Stack from '@mui/material/Stack'
import Logo from "../../components/logo/index.jsx";
import {useTheme} from "@mui/material/styles";

const RegisterPage = () => {
  const { user_register } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { theme } = useTheme()

  const loginSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid e-mail').required('E-mail is required'),
    password: yup.string().required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      await user_register(data)
      navigate('/')
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {
        variant: 'error'
      })
    }
  }

  return (
    <AuthLayout>
      <Container maxWidth="lg" disableGutters>
        <Stack alignItems="center" spacing={2}>
          <Stack alignItems="center" spacing={2}>
            <Logo size={75}/>
            <Typography variant="h4" fontWeight="bold">
              Create your account
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2">
                Already have an account?
              </Typography>
              <Link to='/register' variant="subtitle2">
                Sign in
              </Link>
            </Stack>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ py: 2, width: '100%', maxWidth: 400 }}
          >
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Name
              </Typography>
              <TextField
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            </Box>

            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                E-mail
              </Typography>
              <TextField
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Box>

            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Password
              </Typography>
              <TextField
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            </Box>

            <Button
              variant="contained"
              sx={{ mt: 2, color: theme?.palette.primary.main }}
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              Create account
            </Button>
          </Box>
        </Stack>
      </Container>
    </AuthLayout>
  )
}

export default RegisterPage
