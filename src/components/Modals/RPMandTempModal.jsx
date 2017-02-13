import React, { PropTypes } from 'react'
import './RPMandTempModal.scss'
import ModalWrapper from './ModalWraper.jsx'
/*eslint-disable*/
const RPMandTempModal = (props) => {
  // const handleBackgroundClick = e => {
  //   if (e.target === e.currentTarget) {
  //     props.actions.hideModal()
  //   }
  // }
  return (
    <ModalWrapper
      {...props}
      okText={'Accept'}
    >
      <div className="setter inputs">
        <input
          type="text"
          placeholder="Set Value"
        />
      </div>
      <div className="parts inputs">
        <input
          type="text"
          placeholder="Start time"
        />
      </div>
      <div className="parts inputs">
        <input type="text" placeholder="End time" />
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
