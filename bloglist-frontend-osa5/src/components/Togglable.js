import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  
  toggle = () => {
    this.setState({ visible: !this.state.visible })
  }
  
  render() {
    const { buttonLabel } = this.props
    
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    
    return (
      <div>
        <div className='content' style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggle}>peruuta</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggle}>{buttonLabel}</button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable