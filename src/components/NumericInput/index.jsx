import React from 'react'
import './style.scss'


const NumericInputComponent = (props) => {
  console.log(props) //eslint-disable-line
  return (
    <div
      className="numeric-input"
      style={{
        width: props.scale * 100,
        height: props.scale * 25,
        fontSize: props.scale * 14,
      }}
    >
      <input
        type="text" onChange={(e) => props.onChange(e, props.id)}
        value={props.value}
        maxLength="8"
      />
      <button
        className="numeric_input_btn increase"
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => props.handlePress(e, props.id)}
        onMouseUp={() => props.changeValue(props.id)}
      >+</button>
      <button
        className="numeric_input_btn decrease"
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => props.handlePress(e, props.id)}
        onMouseUp={() => props.changeValue(props.id)}
      >-</button>
    </div>
  )
}

NumericInputComponent.propTypes = {
  scale: React.PropTypes.number,
  value: React.PropTypes.number,
  handlePress: React.PropTypes.func,
  changeValue: React.PropTypes.func,
  onChange: React.PropTypes.func,
  id: React.PropTypes.number,
}
export default NumericInputComponent
