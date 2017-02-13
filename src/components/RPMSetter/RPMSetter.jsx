import React from 'react'
import './style.scss'
/*eslint-disable*/
const RPMSetter = (props) => {
  return (<div className="rows" onClick={() => props.handle(props.id)}>
    <div className="value">
      <span>{props.elem.ShortName}</span>
    </div>
  </div>
  )
}
RPMSetter.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default RPMSetter
