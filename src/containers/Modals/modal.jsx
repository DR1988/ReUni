import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ValveModal from './../../components/Modals/valveModal.jsx'
import RPMandTempModal from './../../components/Modals/RPMandTempModal.jsx'

import modalActions from './../../actions/ModalActions.js'

class Modal extends Component {

  componentDidUpdate() {
    if (this.btn) {
      this.btn.focus()
    }
  }

  handelKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.props.actions.hideModal()
    }
  }

  reFocus = () => {
    this.inpt.focus()
  }

  render() {
    const { modalType, startTime, stopTime } = this.props.modal
    let template
    let name
    if (modalType) {
      name = modalType.name
    }
    switch (name) {
      case 'ValveLine':
        template = (<ValveModal
          actions={this.props.actions}
          id={modalType.id}
          startTime={startTime}
          stopTime={stopTime}
        />
        )
        break
      case 'RPMSetter':
      case 'TempSetter':
        template = (<RPMandTempModal
          actions={this.props.actions}
          id={modalType.id}
        />
        )
        break

      default:
        template = null
        break
    }
    return (
      <div>
        { this.props.modal.showModal ? template : null }
      </div>
    )
  }
}

Modal.propTypes = {
  modal: PropTypes.object,
  hideModal: PropTypes.func,
  modalType: PropTypes.string,
  actions: PropTypes.object,
}

const mapStateToProps = (state) => ({ modal: state.modal })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(modalActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
