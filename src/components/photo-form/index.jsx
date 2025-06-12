import React, {useCallback, useState} from 'react'
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  InputLabel,
  DialogActions, Alert, AlertTitle
} from '@mui/material'
import {HexColorPicker} from 'react-colorful'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import api from "../../utils/axios.js";
import {useSnackbar} from "notistack";
import {getResponseError} from "../../utils/api-helper.js";

const PhotoForm = ({onCancel, onSuccess}) => {
  const {enqueueSnackbar} = useSnackbar()

  const [activeStep, setActiveStep] = useState(0)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')

  const steps = ['Photo', 'Photo info']

  const schemaStep1 = Yup.object({
    url: Yup.string().url('Enter a valid URL').required('Image URL is required'),
  })

  const schemaStep2 = Yup.object({
    alt: Yup.string().required('Alt text is required'),
    width: Yup.number().typeError('Must be a number').required('Width is required'),
    height: Yup.number().typeError('Must be a number').required('Height is required'),
    avg_color: Yup.string()
      .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color')
      .required('Color is required'),
  })

  const currentSchema = activeStep === 0 ? schemaStep1 : schemaStep2

  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      url: '',
      alt: '',
      width: '',
      height: '',
      avg_color: '#cccccc',
    },
    resolver: yupResolver(currentSchema),
    mode: 'onBlur',
  })

  const isImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const handleLoadImage = async () => {
    const isValid = await trigger('url')
    if (isValid) {
      const url = getValues('url')
      const validImage = await isImage(url)

      if (validImage) {
        setImagePreview(url)
      } else {
        setError('The URL does not point to a valid image.')
      }
    }
  }

  const handleClearImage = () => {
    setValue('url', null)
    setImagePreview(null)
    setError('')
  }

  const handleNext = async () => {
    const isValid = await trigger()
    if (isValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const onSubmit = useCallback(async (data) => {
    try {
      await api.post('/photos/new-photo', data)
      onSuccess()
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {
        variant: 'error'
      })
    }
  }, [onSuccess, enqueueSnackbar])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{maxWidth: 600, mx: 'auto', mt: 4}}
    >
      <Stepper activeStep={activeStep} sx={{mb: 4}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box display="flex" flexDirection="column" gap={2}>
          {getValues('url') && (
            error ? (
              <Alert severity="warning">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            ) : imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 2}}
              />
            )
          )}

          <Controller
            name="url"
            control={control}
            render={({field}) => (
              <TextField
                label="Photo URL"
                {...field}
                error={!!errors.url}
                helperText={errors.url?.message}
                fullWidth
                onChange={(e) => {
                  field.onChange(e)
                  setError('')
                  setImagePreview(null)
                }}
              />
            )}
          />


          <Button variant="contained" onClick={handleLoadImage}>
            Load photo
          </Button>

          <Button variant="outlined" onClick={handleClearImage}>
            Clear photo
          </Button>

          <DialogActions>
            <Button variant="soft" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleNext} disabled={!imagePreview}>
              Next
            </Button>
          </DialogActions>
        </Box>
      )}

      {activeStep === 1 && (
        <Box display="flex" flexDirection="column" gap={2}>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 2}}
            />
          )}

          <Controller
            name="alt"
            control={control}
            render={({field}) => (
              <TextField
                label="Alternative text or photo description"
                {...field}
                error={!!errors.alt}
                helperText={errors.alt?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="width"
            control={control}
            render={({field}) => (
              <TextField
                label="Width"
                type="number"
                {...field}
                error={!!errors.width}
                helperText={errors.width?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="height"
            control={control}
            render={({field}) => (
              <TextField
                label="Height"
                type="number"
                {...field}
                error={!!errors.height}
                helperText={errors.height?.message}
                fullWidth
              />
            )}
          />

          <Box>
            <InputLabel sx={{mb: 1}}>Average color</InputLabel>
            <Controller
              name="avg_color"
              control={control}
              render={({field}) => (
                <>
                  <HexColorPicker color={field.value} onChange={field.onChange}/>
                  <Typography mt={1}>
                    Selected Color: <b>{field.value}</b>
                  </Typography>
                  {errors.avg_color && (
                    <Typography color="error" fontSize="0.8rem">
                      {errors.avg_color.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleBack}>Back</Button>
            <Button type="submit" variant="contained">
              Add photo
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PhotoForm
