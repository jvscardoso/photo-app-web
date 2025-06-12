import React, {useEffect, useState, useImperativeHandle, forwardRef} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import api from '../../utils/axios'
import {getResponseError} from '../../utils/api-helper'
import {useSnackbar} from 'notistack'

const CustomDataTable = forwardRef(({endpoint, columns}, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const {enqueueSnackbar} = useSnackbar()

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await api.get(endpoint)
      const data = response?.data

      setRows(data || [])
    } catch (error) {
      console.error(error)
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchData,
  }))

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return (
    <Box sx={{height: 500, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        getRowId={(row) => row.id}
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Não há itens para exibir
            </Stack>
          ),
        }}
      />
    </Box>
  )
})

CustomDataTable.displayName = 'CustomDataTable'

CustomDataTable.defaultProps = {
  filters: {},
}

export default CustomDataTable
