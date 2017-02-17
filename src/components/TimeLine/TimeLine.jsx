import React from 'react'
import './style.scss'

// source.addEventListener('message', (e) => {
//   const counter = JSON.parse(e.data)
//   console.log(counter)
// }, false)

// source.addEventListener('open', () => {
// }, false)


const Timeline = (props) => {
  return (<div className="time-line_wraper">
    <div className="time-line" style={{ width: props.width }} />
    <div className="time-presenter" style={{ left: props.timer}}>
      <div className="line" />
      <div className="arrow-up" />
    </div>
  </div>
  )
}


Timeline.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

Timeline.defaultProps = {
  width: '100%',
  currentTime: 10,
}

Timeline.propTypes = {
  width: React.PropTypes.string,
}

export default Timeline
