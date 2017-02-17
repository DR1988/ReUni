import React, { PropTypes } from 'react'
import './RPMandTempModal.scss'
import ModalWrapper from './ModalWraper.jsx'
/*eslint-disable*/
const RPMandTempModal = (props) => {
  // console.log(props)
  // const handleBackgroundClick = e => {
  //   if (e.target === e.currentTarget) {
  //     props.actions.hideModal()
  //   }
  // }
  let _inpStart
  let _inpEnd
  let _inpValue

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

  const changeValue = (e) => {
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
      onOk={() => props.actions.setRPMorTemp(props.id, { start: _inpStart.value, stop: _inpEnd.value, value:_inpValue.value })}
      okText={'Accept'}
    >
      <div className="setter inputs">
        <input
          type="text"
          placeholder="Set Value"
          value={props.value}
          onChange={changeValue}
          ref={inp => (_inpValue = inp)}
        />
      </div>
      <div className="parts inputs">
        <input
          type="text"
          placeholder="Start time"
          value={props.startTime}
          onChange={changeStartValue}
          ref={inp => (_inpStart = inp)}
        />
      </div>
      <div className="parts inputs">
        <input 
          type="text"
          placeholder="End time"
          value={props.stopTime}
          onChange={changeStopValue}
          ref={inp => (_inpEnd = inp)}
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
