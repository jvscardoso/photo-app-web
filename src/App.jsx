import {CssBaseline} from "@mui/material"
import {AuthProvider} from "./contexts/auth/auth-provider"
import {SnackbarProvider} from 'notistack'
import Router from "./routes/index"

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <CssBaseline/>
        <Router />
      </SnackbarProvider>
    </AuthProvider>
  )
}

export default App
