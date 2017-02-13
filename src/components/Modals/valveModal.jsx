import React, { PropTypes } from 'react'
import ModalWrapper from './ModalWraper.jsx'

import './valveModal.scss'
/*eslint-disable*/
const ValveModal = (props) => {
  const changeStartValue = (e) => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      props
      .actions
      .changeStartValue(value)
    }
  }

  const changeStopValue = e => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      props
      .actions
      .changeStopValue(value)
    }
  }

  let _inpStart
  let _inpEnd
  // console.log(props)
  return (
    <ModalWrapper
      {...props}
      onOk={() => props.actions.setTime(props.id, { start: _inpStart.value, stop: _inpEnd.value })}
      okText={'Accept'}
    >
      <div className="parts inputs">
        <input
          ref={inp => (_inpStart = inp)}
          type="text"
          placeholder="Start time"
          onChange={changeStartValue}
          value={props.startTime}
        />
      </div>
      <div className="parts inputs">
        <input
          type="text"
          placeholder="End time"
          ref={inp => (_inpEnd = inp)}
          onChange={changeStopValue}
          value={props.stopTime}
        />
      </div>
    </ModalWrapper>
  )
}

ValveModal.propTypes = {
  scale: PropTypes.number,
  decline: PropTypes.func,
  handleBackgroundClick: PropTypes.func,
  actions: PropTypes.object,
}

export default ValveModal
