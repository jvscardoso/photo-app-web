function findTruthy(arr) {
  return Array.isArray(arr) ? arr.find(Boolean) : arr
}

export function getInvalidFields(error) {
  try {
    const responseError = error.response?.data?.message

    if (Array.isArray(responseError)) {
      const messages = error?.response?.data?.error?.map((errorMessage) => {
        const [[, message = []]] = Object.entries(errorMessage)
        return message?.[0]
      })

      return messages.find(Boolean)
    }
    if (typeof responseError === 'string') {
      return responseError
    }
    return null
  } catch (exception) {
    console.info(error, exception)
    return ''
  }
}

export function getResponseError(error, defaultMessage) {
  const validationError = getInvalidFields(error)

  if (validationError) {
    return validationError
  }

  const defaults = {
    401: 'Você precisa fazer auth',
    422: 'Verifique os dados e tente novamente',
    403: 'Você não possui permissão para usar este recurso',
    0: 'Verifique sua conexão com a internet',
  }

  defaultMessage =
    defaults[error.response?.status] || defaultMessage || 'Tente novamente em alguns instantes'

  const messages = error.response?.data?.error || error.message
  if (typeof messages === 'string') {
    return messages
  }
  try {
    let firstMessage = ''

    const validatorError = Array.isArray(messages) ? findTruthy(messages) : messages

    if (validatorError) {
      const [key] = Object.keys(validatorError)
      if (key) {
        firstMessage = key ? findTruthy(validatorError[key]) : ''
      }
    }

    return firstMessage || defaultMessage
  } catch (err) {
    console.warn(err)
    return defaultMessage
  }
}