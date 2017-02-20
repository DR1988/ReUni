import React from 'react'
import './style.scss'

const Timeline = (props) => {
  const dividersTemplate = []
  for (let i = 0; i < 10; i++) {
    dividersTemplate.push(
      <div key={i} className="time-former">
        <div className="divider" />
        <div className="time-count">{Math.floor((props.allTime * i) / 9)}</div>
      </div>
    )
  }
  return (<div className="time-line_wraper">
    <div className="time-line" style={{ width: props.width }} >
      <div className="time-show">
        {dividersTemplate}
      </div>
    </div>
    <div className="time-presenter" style={{ left: props.timer }}>
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
