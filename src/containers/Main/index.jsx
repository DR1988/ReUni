import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

// import Loading from '../../components/Loading'
import mainActions from '../../actions/mainAction.js'
import MainForm from './../MainForm/MainForm.jsx'

import './style.scss'

class Main extends Component {

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

  serialize = () => {
    const form = document.getElementById('mainForm')
    // const obj = serialize(form, { hash: true })
    const lineFormer = []
    let changes = []
    let timeFormer = {}
    let lineFormerName
    for (const child of [...form.children]) {
      // console.log(+child.dataset.elemid)
      lineFormerName = child.querySelector(['input'])
      changes = []

      const timeFormers = child.querySelectorAll('div.time-former')
      // console.log(timeFormers)
      for (const timeForm of [...timeFormers]) {
        const inputs = timeForm.querySelectorAll('input')
        // console.log(inputs)
        timeFormer = {}
        for (const input of [...inputs]) {
          timeFormer[input.name] = +input.value // need to convert to numbers
        }
        changes.push(timeFormer)
      }

      // for (let i = 0; i < inputs.length; i++) {
      //   console.log(inputs[i])
      //   if (inputs[i].name !== 'id') {
      //     // console.log('equals')
      //   }
      //   // timeFormer[inputs[i].name] = +inputs[i].value
      //     // timeFormer[child.querySelectorAll('input')[i].name] = +inputs[i].value
      // }
      // for (const input of [...child.querySelectorAll('input')]) {
      //   console.log(input.name, +input.value)
      //   timeFormer[input.name] = +input.value
      //   changes.push({
      //     [input.name]: +input.value,
      //   })
      // }
      lineFormer.push(
        { id: +child.dataset.elemid,
          changes,
          name: lineFormerName.value,
        })
    }
    lineFormer[1].changes[0].duration = 300
    lineFormer[1].changes[0].endTime = 300
    lineFormer[1].changes[0].startTime = 0
    this.props.actions.setValues({ lineFormer, allTime: 780 })
    // console.log(lineFormer)
  }

  render() {
    return (
      <div className="main-flex row">
        <div className="col-xs-12 col-sm-4">
          <div className="note-box col-xs-12">
            <span>node</span>
          </div>
          <div className="picture-box col-xs-12">
            <span>picture</span>
          </div>
        </div>
        <div id="container" className="col-xs-12 col-sm-8">
          <div className="hide-scroll">
            <MainForm />
          </div>
          <div className="user-actions">
            <div className="col-xs-6">
              <div className="protocol-IO">
                <input type="file" onChange={this.loadFile} />
              </div>
            </div>
            <div className="col-xs-6">
              <div className="proptocol-manipulation">
                <button
                  onClick={this.serialize}
                >START</button>
              </div>
            </div>
          </div>
        </div>
        {/* <Loading /> */}
      </div>
    )
  }
}

Main.propTypes = {
  mainPage: React.PropTypes.array,
  actions: React.PropTypes.object,
  numActions: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    mainPage: state.mainPage,
    inputFormer: state }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mainActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
