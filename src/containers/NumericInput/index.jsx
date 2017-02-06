import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
/*eslint-disable*/
import NumericAction from './../../actions/numeric.js'
import NumericInputComponent from './../../components/NumericInput/'

class NumericInput extends Component {
  constructor(props) {
    super(props)
    this.timerIdInner = null
    this.timerIdOuter = null
    this.hold = false
    this.action = null
  }

  onChange = (e) => {
    const value = +e.target.value
    if (Number.isInteger(value) && value >= this.props.minValue) {
      this.props.actions.changeValue(value)
    }
  }

  handlePress = (e) => {
    this.action = e.target.innerHTML
    const change = () => {
      this.hold = true
      this.pressedTimer(this.action)
      this.timerIdInner = setTimeout(change, 100)
    }
    this.timerIdOuter = setTimeout(change, 750)
  }

  pressedTimer = (action) => {
    const { value } = this.props.numericProp[this.props.id]
    const { id } = this.props
    if (action === '+') {
      this.props.actions.increaseByTen(value, id)
    } else if (action === '-') {
      if (value - 10 >= this.props.minValue) {
        this.props.actions.decreaseByTen(value, id)
      }
    }
  }

  changeValue = () => {
    // console.log(this.props.numericProp[this.props.id])
    if (!this.hold) {
      const { value } = this.props.numericProp[this.props.id]
      const { id } = this.props
      switch (this.action) {
        case '+':
          this.props
          .actions
          .increaseValue(value, id)
          break
        case '-':
          if (value > this.props.minValue) {
            this.props
            .actions
            .decreaseValue(value, id)
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
    // console.log(this.props.numericProp[this.props.id])
    return (
      <NumericInputComponent
        {...this.props.numericProp[this.props.id]}
        scale={this.props.scale}
        handlePress={this.handlePress}
        changeValue={this.changeValue}
        onChange={this.onChange}
      />
    )
  }
}

NumericInput.propTypes = {
  numericProp: React.PropTypes.array,
  minValue: React.PropTypes.number,
  actions: React.PropTypes.object,
  scale: React.PropTypes.number,
  id: React.PropTypes.number,
}

const mapStateToProps = (state) => (
  {
    numericProp: state.numericInput,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(NumericAction, dispatch),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NumericInput)
