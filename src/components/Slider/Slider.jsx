import React from 'react'
import './style.scss'
/*eslint-disable*/
const Slider = (props) => {
  let diveders = [1,2,3,4,5,6,7,8]
  let dividersTemplate=[]
  diveders.map((elem, idx)=>dividersTemplate
    .push(<div key={idx}  className="slider_divider" />))
  return (<div className="slider-container">
    <div className="slider" style={{left: props.sliderValue+'%'}} />
    
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

Slider.defaultProps = {
  sliderValue: '0.25',
}
export default Slider
