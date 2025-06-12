import {AppBar, Toolbar, Button, IconButton, Box} from '@mui/material'
import Logo from '../components/Logo'
import {useAuth} from "../contexts/auth/use-auth"
import {useResponsive} from "../hooks/use-responsive"
import Iconify from "../components/iconify"
import React from "react"
import {useRouter} from "../hooks/use-router"
import {useNavigate} from "react-router-dom"

export default function Header() {
  const {logout, user} = useAuth()
  const lgUp = useResponsive('up', 'lg')
  const router = useRouter()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Logo/>
        </Box>

        {user ? (
          <Box>
            {lgUp ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Sair
              </Button>
            ) : (
              <IconButton onClick={handleLogout}>
                <Iconify icon="mdi:power" width={24}/>
              </IconButton>
            )}
          </Box>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/auth/login')}
          >
            Login
          </Button>
        )}

      </Toolbar>
    </AppBar>
  )
}
