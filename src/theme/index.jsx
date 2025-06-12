import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0075EB',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F1FFE7',
    },
    error: {
      main: '#FF4C4C',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
    },
  },

  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none' },
  },

  shape: {
    borderRadius: 12
  },
})

export default theme
