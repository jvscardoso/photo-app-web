import { Tabs, Tab, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import navConfig from '../layouts/nav-config'
import Iconify from '../components/iconify'
import {useAuth} from '../contexts/auth/use-auth'

export default function NavHorizontal() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const currentTab = navConfig.find((tab) => pathname.startsWith(tab.path))?.path || false

  const visibleTabs = navConfig.filter(tab =>
    Array.isArray(tab.role) && user?.role && tab.role.includes(user.role)
  )

  return (
    <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={currentTab}
        onChange={(e, value) => navigate(value)}
        scrollButtons="auto"
        centered
      >
        {visibleTabs.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            value={tab.path}
            icon={<Iconify icon={tab.icon} />}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  )
}
