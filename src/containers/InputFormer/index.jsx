import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import NumericInput from './../../containers/NumericInput'
import NumericInputComponent from './../../components/NumericInput/'
import InputFormerAction from './../../actions/InputFormerAction'
// import CheckBox from './../CheckBox/checkBox.jsx' import Slider from
// './../CheckBox/slider.jsx'
import './style.scss'

class InputFormer extends Component {
  constructor(props) {
    super(props)
    this.timerIdInner = null
    this.timerIdOuter = null
    this.hold = false
    this.action = null
  }


  onChange = (e, id) => {
    const value = +e.target.value
    // const inputFormerId = this.props.inputFormerId
    if (Number.isInteger(value) && value >= 0) {
      this.props.actions.changeValue(value, id, /*inputFormerId*/)
    }
  }

  handlePress = (e, id) => {
    this.action = e.target.innerHTML
    // this.props.inputf(this.props.inputFormerId)
    // const inputFormerId = this.props.inputFormerId
    const change = () => {
      this.hold = true
      this.pressedTimer(this.action, id, /*inputFormerId*/)
      this.timerIdInner = setTimeout(change, 100)
    }
    this.timerIdOuter = setTimeout(change, 750)
  }

  pressedTimer = (action, id) => {
    const inputFormerId = this.props.inputFormerId
    const { value } = this.props.InputFormer[id]
    if (action === '+') {
      this.props.actions.increaseByTen(value, id, inputFormerId)
    } else if (action === '-') {
      if (value - 10 >= 0) {
        this.props.actions.decreaseByTen(value, id, /*inputFormerId*/)
      }
    }
  }

  changeValue = (id) => {
    if (!this.hold) {
      const inputFormerId = this.props.inputFormerId
      const { value } = this.props.InputFormer[id]
      switch (this.action) {
        case '+':
          this.props
          .actions
          .increaseValue(value, id, inputFormerId)
          break
        case '-':
          if (value > 0) {
            this.props
            .actions
            .decreaseValue(value, id, /*inputFormerId*/)
          }
          break
        default:
          return
      }
    }
    this.hold = false
    clearTimeout(this.timerIdInner)
    clearTimeout(this.timerIdOuter)
  }

  render() {
    return (<div className="flex-container">
    {this.props.InputFormer.map((childElem, index) => (
      <NumericInputComponent
        key={index}
        id={childElem.id}
        scale={2}
        // inputFormerId={this.props.inputFormerId}
        value={childElem.value}
        handlePress={this.handlePress}
        changeValue={this.changeValue}
        onChange={this.onChange}
      />))
    }
     {/* <Slider scale={1} /> */}
    </div>
    )
  }
}

InputFormer.propTypes = {
  InputFormer: React.PropTypes.array,
  // minValue: React.PropTypes.number,
  actions: React.PropTypes.object,
  scale: React.PropTypes.number,
  id: React.PropTypes.number,
  inputFormerId: React.PropTypes.number,
}

const mapStateToProps = (state) => (
  {
    InputFormer: state.InputFormer,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(InputFormerAction, dispatch),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(InputFormer)
