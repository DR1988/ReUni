import React, { PropTypes, Component } from 'react'
import ModalWrapper from './ModalWraper.jsx'

import './valveModal.scss'
/*eslint-disable*/
class ValveModal extends Component  {
   constructor(props) {
    super(props)
    this._inpStart = null
    this._inpEnd = null
    this.state ={
      startTime: 0,
      stopTime: 0,
    }
  }

  changeStartValue = (e) => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      this.setState({startTime: value});
      // this.props
      // .actions
      // .changeStartValue(value)
    }
  }

  changeStopValue = e => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      this.setState({stopTime: value});
      // this.props
      // .actions
      // .changeStopValue(value)
    }
  }

  // let _inpStart
  // let _inpEnd
  // console.log(props)
  render(){
    return (
      <ModalWrapper
        {...this.props}
        isAcceptable = {this.state.startTime >= this.state.stopTime}
        onOk={() => this.props.actions.setLineValues(this.props.id, { start: this._inpStart.value, stop: this._inpEnd.value })}
        okText={'Accept'}
      >
        <div className="parts inputs">
          <input
            ref={inp => (this._inpStart = inp)}
            type="text"
            placeholder="Start time"
            onChange={this.changeStartValue}
            value={this.state.startTime}
          />
        </div>
        <div className="parts inputs">
          <input
            type="text"
            placeholder="End time"
            ref={inp => (this._inpEnd = inp)}
            onChange={this.changeStopValue}
            value={this.state.stopTime}
          />
        </div>
      </ModalWrapper>
    )
  }
}

ValveModal.propTypes = {
  scale: PropTypes.number,
  decline: PropTypes.func,
  handleBackgroundClick: PropTypes.func,
  actions: PropTypes.object,
}

export default ValveModal
