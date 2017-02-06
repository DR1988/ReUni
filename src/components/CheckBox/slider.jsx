import React from 'react'

import './slider.scss'

const Slider = (props) => <div
  className="sliderOne"
  style={{
    width: props.scale * 75,
    height: props.scale * 25,
    fontSize: props.scale * 14,
    borderRadius: props.scale * 15,
  }}
>
    {/* eslint-disable*/}
    <label style={{
      borderRadius: props.scale * 15
    }}>
      {/* eslint-enable*/}
      <input type="checkbox" className="input-slider" />
      <div
        style={{
          borderRadius: props.scale * 15,
        }}
        className="sliderCheck"
      />
      <span className="on">ON</span>
      <span className="off">OFF</span>
    </label>
</div>

Slider.propTypes = {
  scale: React.PropTypes.number,
}

export default Slider
