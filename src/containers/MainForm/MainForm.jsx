import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MainFormAction from './../../actions/MainForm.js'
import LineFormer from './../../components/LineFormer/LineFormer.jsx'
import TimeLine from './../../components/TimeLine/TimeLine.jsx'

// import ValveLine from './../../components/valveLine/valveLine.jsx'
// import RPMSetter from './../../components/RPMSetter/RPMSetter.jsx'
// import TempSetter from './../../components/TempSetter/TempSetter.jsx'

class MainForm extends Component {
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
      this
        .props
        .actions
        .changeValue(value)
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
      this
        .props
        .actions
        .increaseByTen(value, id)
    } else if (action === '-') {
      if (value - 10 >= this.props.minValue) {
        this
          .props
          .actions
          .decreaseByTen(value, id)
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
          this
            .props
            .actions
            .increaseValue(value, id)
          break
        case '-':
          if (value > this.props.minValue) {
            this
              .props
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

  readTextFile(file, callback) {
    const rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType('application/json')
    rawFile.open('GET', file, true)
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4 && rawFile.status === '200') {
        callback(rawFile.responseText)
      }
    }
    rawFile.send(null)
  }

  showModal = (elem) => {
    this.props.actions.showModal(elem)
  }

  loadFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (file) {
      reader.readAsBinaryString(file)
      reader.onloadend = (evt) => {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
          this.props.actions.setValues(JSON.parse(evt.target.result))
        }
      }
    }
  }

  decline = () => {
    this.props.actions.hideModal()
  }

  render() {
    // console.log('mainForm', this.props.mainForm)
    const { lineFormer } = this.props.mainForm
    return (
      <div className="form-Manupalation">
        <form className="data-set">
          {lineFormer.map((elem, idx) => <LineFormer
            handle={this.showModal}
            key={idx}
            elem={elem}
          />
          )}
        </form>
        <TimeLine />
        <input type="file" onChange={this.loadFile} />
      </div>
    )
  }
}

MainForm.propTypes = {
  numericProp: React.PropTypes.array,
  minValue: React.PropTypes.number,
  actions: React.PropTypes.object,
  scale: React.PropTypes.number,
  id: React.PropTypes.number,
  lineFormer: React.PropTypes.node,
  mainForm: React.PropTypes.object,
}

const mapStateToProps = (state) => ({ mainForm: state.mainForm })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MainFormAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainForm)
