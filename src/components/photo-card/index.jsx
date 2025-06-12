import React from 'react'
import {Card, CardContent, Typography, Box, Button} from '@mui/material'
import {format} from 'date-fns'
import Iconify from "../iconify/index.js";
import Stack from "@mui/material/Stack";

const PhotoCard = ({photo, onDelete, showDeleteButton}) => {
  const formattedDate = format(new Date(photo.created_at), 'dd/MM/yyyy')

  return (
    <Card
      sx={{
        width: 250,
        bgcolor: '#fff',
        boxShadow: 6,
        borderRadius: '12px',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'monospace',
        position: 'relative'
      }}
    >
      <Box
        component="img"
        src={photo.src_original}
        alt={photo.alt}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
          borderRadius: '8px',
          mb: 1,
        }}
      />

      <CardContent sx={{textAlign: 'center', pt: 0}}>
        <Typography variant="subtitle2" color="text.primary" gutterBottom noWrap>
          {photo.alt}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>

        <Stack direction="row" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>
          <Iconify icon='solar:star-linear'/>
          <Typography variant="caption">{photo.likes} Likes</Typography>
        </Stack>

        {showDeleteButton && (
          <Button
            onClick={() => onDelete(photo.id)}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>}
          >
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default PhotoCard
