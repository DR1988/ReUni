import React from 'react'
import './style.scss'

const Timeline = (props) => {
  const dividersTemplate = []
  const maxI = props.allTime / 50
  for (let i = 0; i <= maxI; i++) {
    dividersTemplate.push(
      <div key={i} className="time-former">
        <div className="divider" />
        <div className="time-count">{Math.floor((props.allTime * i) / maxI)}</div>
      </div>
    )
  }

  let formWidth = 0
  let scale = 1
  if (document.querySelector('.form-Manupalation')) {
    formWidth = document.querySelector('.form-Manupalation').offsetWidth
    if (formWidth / props.allTime > 1) {
      scale = formWidth / props.allTime
    }
  }
  console.log(scale)
  console.log('distance', props.distance, 'time', props.time)
  return (<div className="time-line_wraper">
    <div className="time-line" style={{ width: props.width }} >
      <div className="time-show">
        {dividersTemplate}
      </div>
    </div>
    <div
      className="time-presenter"
      style={{ left: props.distance * scale - 12, transition: `left ${props.time}s linear` }}
    >
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
  distance: 0,
  currentTime: 10,
}

Timeline.propTypes = {
  width: React.PropTypes.string,
}

export default Timeline
