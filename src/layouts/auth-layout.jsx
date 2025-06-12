import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'

export default function AuthLayout({ children }) {
  return (
    <Stack
      component="main"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        width: '100vw',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <Stack
        sx={{
          width: 1,
          maxWidth: 480,
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}
