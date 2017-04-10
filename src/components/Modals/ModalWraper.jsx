/*eslint-disable*/
import React, { PropTypes } from 'react'

import './ModalWraper.scss'

const ModalWrapper = props => {
  // console.log(props)
  // console.log('props', props)
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      props.actions.hideModal()
    }
  }

  const onOk = () => {
    props.onOk()
    props.actions.hideModal()
  }

  const okButton = props.showOk
    ? (
    <button className="ok-btn btn btn-success"
      onClick={onOk}
      disabled={props.isAcceptable}
    >
      {props.okText}
    </button>
    ) : null

  return (
    <div className="cover" onClick={handleBackgroundClick}>
      <div className="wraper-modal-body">
        <header className="header">
          <span>{props.title}</span>
          <button className="away" onClick={props.actions.hideModal}>Close</button>
        </header>
        {props.children}
        {okButton}
      </div>
    </div>
  )
}

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
}

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {},
}

export default ModalWrapper
