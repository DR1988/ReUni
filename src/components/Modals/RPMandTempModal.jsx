import React, { PropTypes, Component } from 'react'
import Checkbox from 'material-ui/Checkbox';

import './RPMandTempModal.scss'
import ModalWrapper from './ModalWraper.jsx'
/*eslint-disable*/

class RPMandTempModal extends Component  {
  // console.log(this.props)
  // const handleBackgroundClick = e => {
  //   if (e.target === e.currentTarget) {
  //     this.props.actions.hideModal()
  //   }
  // }
  constructor(props) {
    super(props)
    this.inpStart = null
    this.inpEnd = null
    this.inpValue = null
    this.state ={
      checked: false,
      startTime: 0,
      stopTime: 0,
      inpValue: 0,
      RPMvalue: 0,
      TempValue: 0,
    }
  }

  changeStartValue = (e) => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      this.setState({startTime: value});
    }
  }

  changeStopValue = e => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= 0) {
      this.setState({stopTime: value});
    }
  }

  changeValue = (e) => {
    const value = +e.target.value
    switch (this.props.name) {
      case 'RPMSetter':
        if (Number.isInteger(value) && value >= 0) {
          this.setState({inpValue: value});
          // this.props
          // .actions
          // .changeRPMValue(value)
        }
      case 'TempSetter':
        if (Number.isInteger(value) && value >= 0) {
          this.setState({inpValue: value});
          // this.props
          // .actions
          // .changeTempValue(value)
        }
    }
  }
  waitValue = (e) => {
    this.setState({
      checked: e.target.checked
    })
  }

  render() {
    return (
      <ModalWrapper
        {...this.props}
        isAcceptable = {this.state.startTime >= this.state.stopTime}
        onOk={() => this.props.actions.setLineValues(this.props.id,
          { start: this.inpStart.value,
            stop: this.inpEnd.value,
            value:this.inpValue.value,
            waitForValue: this.state.checked            
           }
        )}
        okText={'Accept'}
      >
        <div className="setter inputs">
          <input
            type="text"
            placeholder="Set Value"
            value={this.state.inpValue}
            onChange={this.changeValue}
            ref={inp => (this.inpValue = inp)}
          />
        </div>
        <div className="parts inputs">
          <input
            type="text"
            placeholder="Start time"
            value={this.state.startTime}
            onChange={this.changeStartValue}
            ref={inp => (this.inpStart = inp)}
          />
        </div>
        <div className="parts inputs">
          <input 
            type="text"
            placeholder="End time"
            value={this.state.stopTime}
            onChange={this.changeStopValue}
            ref={inp => (this.inpEnd = inp)}
          />
        </div>
        <div className="ckeck-value"> 
          <Checkbox
            id="hold"
            onCheck={this.waitValue}
            style={{width: 'auto'}}
          />
          <label htmlFor="hold">Wait for that value before continue</label>
        </div>
      </ModalWrapper>
    )
  }
}

RPMandTempModal.propTypes = {
  scale: PropTypes.number,
  decline: PropTypes.func,
  handleBackgroundClick: PropTypes.func,
  actions: PropTypes.object,
}

export default RPMandTempModal
