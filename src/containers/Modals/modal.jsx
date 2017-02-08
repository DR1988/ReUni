import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import './style.scss'

import modal from './../../actions/ModalActions.js'

class Modal extends Component {

  componentDidUpdate() {
    if (this.btn) {
      this.btn.focus()
    }
  }

  handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      this.props.hideModal()
    }
  }

  render() {
    const template = (<div
      className="cover"
      onClick={this.handleBackgroundClick}
    >
      <div className="edit-modal">
        <div className="parts inputs">
          <input type="text" placeholder="Start time" />
        </div>
        <div className="parts inputs">
          <input type="text" placeholder="End time" />
        </div>
        <div className="parts">
          <button className="btn btn-success">Accept</button>
        </div>
        <div className="parts">
          <button
            className="btn btn-warning"
            ref={btn => { this.btn = btn }}
            onClick={this.props.hideModal}
          >Decline</button>
        </div>
      </div>
    </div>
    )
    return (
      this.props.modal.showModal ? template : null
    )
  }
}

Modal.propTypes = {
  modal: PropTypes.object,
  hideModal: PropTypes.func,
}

const mapStateToProps = (state) => ({ modal: state.modal })

export default connect(mapStateToProps, {
  hideModal: modal.hideModal,
})(Modal)
