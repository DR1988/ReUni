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
    this.timer = null
  }

  getSource = () => {
    const source = new EventSource('/stream')
    source.onmessage = (e) => {
      const data = JSON.parse(e.data)
      this.timer = data.counts
      this.forceUpdate()
    }
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
    // this.getSource()
    const { lineFormer } = this.props.mainForm
    return (
      <div className="form-Manupalation">
        <div className="data-set">
          <form>
            {lineFormer.map((elem, idx) => <LineFormer
              handle={this.showModal}
              key={idx}
              elem={elem}
            />
            )}
          </form>
          <TimeLine timer={this.timer} allTime={this.props.mainForm.allTime} />
        </div>
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
