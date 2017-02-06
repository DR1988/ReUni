import React from 'react'

import './checkBox.scss'

const CheckBox = (props) => <div
  className="squaredOne"
  style={{
    width: props.scale * 25,
    height: props.scale * 25,
  }}
>
  {/* eslint-disable*/}
  <label><input type="checkbox" className="input-checkbox" />
    <div className="squareCheck"></div>
  </label>
  {/* eslint-enable*/}
</div>

CheckBox.propTypes = {
  scale: React.PropTypes.number,
}

export default CheckBox
