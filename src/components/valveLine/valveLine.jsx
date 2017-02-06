import React from 'react'
import './style.scss'

const ValveLine = (props) => <div className="rows" onClick={()=>props.handle(props.id)}></div>

ValveLine.propTypes = {
  scale: React.PropTypes.number,
}

export default ValveLine
