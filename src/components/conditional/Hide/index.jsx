import React from 'react'
import PropTypes from 'prop-types'

import Render from 'src/components/conditional/Render'

const Hide = ({children, if: condition}) => <Render if={!condition}>{children}</Render>

Hide.propTypes = {
  if: PropTypes.any,
  children: PropTypes.any,
}

Hide.defaultProps = {
  if: false,
}

export default Hide
