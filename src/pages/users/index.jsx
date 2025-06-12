import React, {useRef, useState} from 'react'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/'
import CustomDataTable from '../../components/custom-data-table/index'
import {format, parseISO} from 'date-fns'
import UserDetails from '../../components/user-details/index'
import {ROLE_LABELS} from '../../utils/user-enums'
import UserForm from "../../components/user-form/index.jsx";

const UsersPage = () => {
  const table = useRef()

  const [selectedUser, setSelectedUser] = useState([])
  const [openDetails, setOpenDetails] = useState(false)
  const [openForm, setOpenForm] = useState(false)


  const handleDetails = (row) => {
    setSelectedUser(row)
    setOpenDetails(true)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      flex: 1,
      renderCell: (params) => format(parseISO(params?.row?.created_at), 'dd/MM/yyyy HH:mm')
    },
    {
      field: 'role',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => ROLE_LABELS[params?.row?.role] || params?.row?.role,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) =>
        params.row.deleted_at ? 'Deleted' : 'Active'
    },
    {
      flex: 1,
      type: 'actions',
      renderCell: ({row}) => (
        <Button
          size="small"
          onClick={() => handleDetails(row)}
          variant="contained"
          sx={{marginLeft: 1,}}>
          Details
        </Button>
      )
    }
  ]

  const newUserButton = (
    <Button variant='contained' onClick={() => setOpenForm(true)}>
      New user
    </Button>
  )

  const handleSuccess = () => {
    setSelectedUser(null)
    setOpenDetails(false)
    window.location.reload()
  }

  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Users"
        links={[{name: 'Home', href: '/'}, {name: 'Users'}]}
        sx={{
          my: {xs: 3, md: 5}
        }}
        action={newUserButton}
        mobileActions={newUserButton}
      />

      <CustomDataTable
        ref={table}
        endpoint="/users/all"
        columns={columns}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>
          Edit user
        </DialogTitle>
        <DialogContent>
          <UserForm onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenForm(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth>
        <DialogTitle>
          User details
        </DialogTitle>
        <DialogContent>
          <UserDetails userData={selectedUser} onSuccess={handleSuccess}/>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenDetails(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UsersPage