import React from 'react'
import './style.scss'
/*eslint-disable*/
const Slider = (props) => {
  let diveders = [1,2,3,4,5,6,7,8]
  let dividersTemplate=[]
  diveders.map(()=>dividersTemplate.push(<div className="slider_divider" />))
  return (<div className="slider-container">
    <div className="slider" />
    
    <div className="divider_container">
      {dividersTemplate}
    </div>
  </div>
  )
}

Slider.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default Slider
