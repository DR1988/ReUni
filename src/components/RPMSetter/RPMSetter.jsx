import React, { Component } from 'react'
import './style.scss'
/*eslint-disable*/
class RPMSetter extends Component {

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render() {
    return (<div className="value">
        <span>{this.props.elem.ShortName}</span>
      </div>
    )
  }
}
RPMSetter.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default RPMSetter
