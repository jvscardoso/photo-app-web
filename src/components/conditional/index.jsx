import React from 'react'
import PropTypes from 'prop-types'

export const If = ({condition, children}) => {
  const elses = React.Children.toArray(children).filter(
    (element) => React.isValidElement(element) && element.type.name === 'Else'
  )

  const content = React.Children.toArray(children).filter(
    (element) => React.isValidElement(element) && element.type.name !== 'Else'
  )

  return condition ? content : elses
}

export class Else extends React.Component {
  static propTypes = {
    condition: PropTypes.any,
    children: PropTypes.any,
  }

  static defaultProps = {
    condition: true,
  }

  render() {
    return this.props.condition ? this.props.children : <></>
  }
}

If.propTypes = {
  condition: PropTypes.any,
  children: PropTypes.any,
}
