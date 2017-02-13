import React from 'react'
import './style.scss'

const Timeline = (props) => <div className="time-line" style={{ width: props.width }} />

Timeline.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

Timeline.defaultProps = {
  width: '100%',
}

Timeline.propTypes = {
  width: React.PropTypes.string,
}

export default Timeline
