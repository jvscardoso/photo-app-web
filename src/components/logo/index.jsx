import { Box } from '@mui/material'

export default function Logo({ size = 32 }) {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt="logo"
      sx={{
        height: size,
        width: size,
      }}
    />

  )
}