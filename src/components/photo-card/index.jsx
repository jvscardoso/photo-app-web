import React, {useState} from 'react'
import {Box, Typography, Avatar, Link, IconButton} from '@mui/material'
import Iconify from '../iconify'
import api from '../../utils/axios'
import {useSnackbar} from 'notistack'
import {getResponseError} from '../../utils/api-helper'

const PhotoCard = ({photo}) => {
  const [liked, setLiked] = useState(photo.liked_by_user)
  const {enqueueSnackbar} = useSnackbar()

  const handleToggleLike = async () => {
    try {
      await api.post(`/photos/${photo.id}/like`)
      setLiked(prev => !prev)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    }
  }

  return (
    <Box display="flex" alignItems="center" p={1}>
      <IconButton size="small" onClick={handleToggleLike}>
        <Iconify icon={liked ? 'solar:star-bold' : 'solar:star-linear'}/>
      </IconButton>

      <Avatar
        variant="rounded"
        src={photo.url || undefined}
        alt={photo.alt}
        sx={{width: 48, height: 48, bgcolor: '#eee', mx: 1}}
      />

      <Box flex={1}>
        <Typography fontWeight="bold" fontSize="0.95rem">
          {photo?.photographer}
        </Typography>
        <Typography fontSize="0.85rem">{photo.alt}</Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography fontSize="0.85rem" color="green">
            {photo.avg_color}
          </Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              border: '1px solid #ccc',
              backgroundColor: photo.avg_color,
              borderRadius: 0.5
            }}
          />
        </Box>
      </Box>

      <Link
        href={photo.photographer_url}
        target="_blank"
        rel="noopener noreferrer"
        fontSize="0.8rem"
        underline="hover"
        sx={{whiteSpace: 'nowrap', ml: 2}}
      >
        Portfolio
      </Link>
    </Box>
  )
}

export default PhotoCard
