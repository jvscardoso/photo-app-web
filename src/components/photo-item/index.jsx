import React, {useState} from 'react'
import {Box, Typography, Avatar, Link, IconButton} from '@mui/material'
import Iconify from '../iconify'
import api from '../../utils/axios'
import {useSnackbar} from 'notistack'
import {getResponseError} from '../../utils/api-helper'
import Stack from "@mui/material/Stack"
import {format, parseISO} from 'date-fns'

const PhotoItem = ({photo, onLikedPhoto}) => {
  const [liked, setLiked] = useState(photo.liked_by_user)
  const {enqueueSnackbar} = useSnackbar()

  const handleToggleLike = async () => {
    try {
      await api.post(`/photos/${photo.id}/like`)
      setLiked(prev => !prev)
      onLikedPhoto()
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    }
  }

  return (
    <Box display="flex" alignItems="center" p={1}>
      <IconButton size="small" onClick={handleToggleLike}>
        <Iconify
          icon={liked ? 'solar:star-bold' : 'solar:star-linear'}
          sx={{color: liked ? '#FFD700' : 'inherit'}}
        />
      </IconButton>

      <Avatar
        variant="rounded"
        src={photo.src_medium || undefined}
        alt={photo.alt}
        sx={{width: 75, height: 75, bgcolor: '#eee', mx: 1}}
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
            }}
          />
        </Box>
        <Typography fontSize="0.85rem">{photo.likes} Likes</Typography>
        <Typography fontSize="0.85rem">
          <Typography fontSize="0.85rem">
            Published in {photo?.created_at ? format(parseISO(photo.created_at), 'dd/MM/yyyy') : 'Unknown date'}
          </Typography>
        </Typography>
      </Box>

      <Stack>
        {photo.photographer_url ? (
          <Link
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            fontSize="0.8rem"
            underline="hover"
            sx={{whiteSpace: 'nowrap', ml: 2, alignItems: 'center'}}
          >
            <Iconify icon="flowbite:link-outline"/>
            Portfolio
          </Link>
        ) : (
          <Link
            href={`/photos/${photo.photographer_id}`}
            rel="noopener noreferrer"
            fontSize="0.8rem"
            underline="hover"
            sx={{whiteSpace: 'nowrap', ml: 2, alignItems: 'center'}}
          >
            <Iconify icon="material-symbols:person-rounded"/>
            Profile
          </Link>
        )}

        <Link
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          fontSize="0.8rem"
          underline="hover"
          sx={{whiteSpace: 'nowrap', ml: 2}}
        >
          <Iconify icon="mdi:arrow-right-top"/>
          Details
        </Link>
      </Stack>
    </Box>
  )
}

export default PhotoItem
