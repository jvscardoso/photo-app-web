import PropTypes from 'prop-types'

const Render = ({ children, if: condition }) => (condition ? children : null)

Render.propTypes = {
  if: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

Render.defaultProps = {
  if: false,
}

export default Render
