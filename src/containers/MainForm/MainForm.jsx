import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MainFormAction from './../../actions/MainForm.js'
import NumericInputComponent from './../../components/NumericInput/'
import ValveLine from './../../components/valveLine/valveLine.jsx'
import EditModal from './../../components/editModal/editModal.jsx'

class MainForm extends Component {
  constructor(props) {
    super(props)
    this.timerIdInner = null
    this.timerIdOuter = null
    this.hold = false
    this.action = null
    this.arr = [1, 2, 3]
    this.rows = [1, 2, 3, 4, 5 ,6, 7, 8]
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

  load = (e) => {
    console.log(e.target.files)
    const reader = new FileReader()
    this.readTextFile(e.target.files[0].name, (text) => {
      const data = JSON.parse(text)
      console.log(data)
    })
  }

  handle = (id) => {
    this.props.actions.showEditModal(id)
  }

  render() {
    console.log(this.props.mainForm.showEditModal);    
    return (
      <div className="form-Manupalation">
      {this.props.mainForm.showEditModal ? <EditModal /> : null}
        <form className="data-set">
          {this.rows.map((elem, idx) => <ValveLine handle={this.handle} id={idx} key={idx} />
          )}
        </form>
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
}

const mapStateToProps = (state) => ({ mainForm: state.mainForm })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MainFormAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainForm)
