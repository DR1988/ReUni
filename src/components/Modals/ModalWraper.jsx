/*eslint-disable*/
import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/RaisedButton';

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
    <FlatButton
      label={props.okText}
      onClick={onOk}
      disabled={props.isAcceptable}
      style={{ margin: '10px' }}
      labelStyle={{ color: '#fff', fontWeight: '700' }}
      buttonStyle={{backgroundColor: '#B6B4BF'}}
    />
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
