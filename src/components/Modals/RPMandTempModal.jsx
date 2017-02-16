import React, { PropTypes } from 'react'
import './RPMandTempModal.scss'
import ModalWrapper from './ModalWraper.jsx'
/*eslint-disable*/
const RPMandTempModal = (props) => {
  console.log(props)
  // const handleBackgroundClick = e => {
  //   if (e.target === e.currentTarget) {
  //     props.actions.hideModal()
  //   }
  // }
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

  const changeRPMValue = (e) => {
    const value = +e.target.value
    switch (props.name) {
      case 'RPMSetter':
        if (Number.isInteger(value) && value >= 0) {
          props
          .actions
          .changeRPMValue(value)
        }
      case 'TempSetter':
        if (Number.isInteger(value) && value >= 0) {
          props
          .actions
          .changeTempValue(value)
        }
    }
  }
  return (
    <ModalWrapper
      {...props}
      okText={'Accept'}
    >
      <div className="setter inputs">
        <input
          type="text"
          placeholder="Set Value"
          value={props.value}
          onChange={changeRPMValue}
        />
      </div>
      <div className="parts inputs">
        <input
          type="text"
          placeholder="Start time"
          value={props.startTime}
          onChange={changeStartValue}
        />
      </div>
      <div className="parts inputs">
        <input 
          type="text"
          placeholder="End time"
          value={props.stopTime}
          onChange={changeStopValue}
        />
      </div>
    </ModalWrapper>
  )
}

RPMandTempModal.propTypes = {
  scale: PropTypes.number,
  decline: PropTypes.func,
  handleBackgroundClick: PropTypes.func,
  actions: PropTypes.object,
}

export default RPMandTempModal
