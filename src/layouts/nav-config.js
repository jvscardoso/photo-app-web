const navConfig = [
  {
    label: 'Daily photo',
    path: '/photos/daily',
    icon: 'solar:calendar-bold-duotone',
    role: ['admin', 'user']

  },
  {
    label: 'All photos',
    path: '/photos/all',
    icon: 'solar:camera-bold-duotone',
    role: ['admin', 'user']
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: 'material-symbols:person-rounded',
    role: ['admin', 'user']
  },
  {
    label: 'Users',
    path: '/users',
    icon: 'mdi:account-group',
    role: ['admin']
  },

]

export default navConfig
