import React from 'react'
import './style.scss'
/*eslint-disable*/
const TempSetter = (props) => {
  return (<div className="rows" onClick={() => props.handle(props.id)}>
    <div className="value">
      <span>{props.elem.ShortName}</span>
    </div>
  </div>
  )
}

TempSetter.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default TempSetter
