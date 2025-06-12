import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom"
import {ThemeProvider} from "@mui/material"
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)