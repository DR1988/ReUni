import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FileSaver from 'file-saver'
import io from 'socket.io-client'

// import Loading from '../../components/Loading'
import mainActions from '../../actions/mainAction.js'
import MainForm from './../MainForm/MainForm.jsx'
import NavLink from './../../components/NavLink/index.jsx'

import './style.scss'

// const oldip = '10.99.44.106:3001'
const newIp = location.origin.replace(/(?:\d+$)/, 3333)

const socket = io(`${newIp}`)

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 123,
    }
  }
  componentDidMount() {
    socket.on('START', data => {
      this.distance = data.distance
      this.time = data.time
      console.log(data)
      this.forceUpdate()
    })
    socket.on('STOP', data => {
      this.distance = data.curDistance
      console.log(data)
      this.setState({
        test: 333,
      })
      this.forceUpdate()
    })
    socket.on('RESET', () => {
      this.distance = 0
      this.time = 1
      console.log('reseted')
      this.forceUpdate()
    })
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

  save = () => {
    let fileToSave = {}
    fileToSave.allTime = this.props.mainForm.allTime
    fileToSave.lineFormer = this.props.mainForm.lineFormer
    fileToSave = JSON.stringify(fileToSave)
    const blob = new Blob([fileToSave], { type: 'application/json;charset=utf-8' })
    FileSaver.saveAs(blob, 'saveAs.json')
  }

  clearForm = () => {
    document.getElementById('file').value = ''
    this.props.actions.resetForm()
  }

  start = () => {
    const protocol = {}
    protocol.allTime = this.props.mainForm.allTime
    protocol.lineFormer = this.props.mainForm.lineFormer
    // console.log('protocol', protocol)
    if (fetch) {
      fetch(`${newIp}/start`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(protocol),
      }).then(res => console.log(res))
    } else {
      const xhr = new XMLHttpRequest()
      const body = JSON.stringify(protocol)
      xhr.open('POST', `${newIp}/start`, true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
      xhr.send(body)
    }
  }

  connect = () => {
    fetch(`${newIp}/connect`)
    .then(res => res.json()
            .then(messagee => console.log(messagee)))
  }

  reset = () => {
    fetch(`${newIp}/reset`)
      .then(res => res)
  }
  render() {
    // this.getSource()
    // console.log(this.props.mainForm)
    return (
      <div className="main-flex row">
        <div>{this.state.test}</div>
        <div className="col-xs-12 col-sm-4">
          <div className="note-box col-xs-12">
            <span>node</span>
          </div>
          <div className="picture-box col-xs-12">
            <span>picture</span>
          </div>
        </div>
        <div id="container" className="col-xs-12 col-sm-8">
          <NavLink to="protocol2">Another </NavLink>
          <div className="hide-scroll">
            <MainForm distance={this.distance} time={this.time} />
          </div>
          <div className="user-actions">
            <div className="col-xs-6">
              <div>
                <input type="file" name="file" id="file" className="inputfile" onChange={this.loadFile} />
                <label htmlFor="file">Choose a file</label>
              </div>
              <div>
                <button
                  onClick={this.save}
                >SAVE</button>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="proptocol-manipulation">
                <div>
                  <button
                    onClick={this.clearForm}
                  >CLEAR</button>
                </div>
                <div>
                  <button
                    onClick={this.start}
                    onTouchStart={this.start}
                  >START</button>
                </div>
                <div>
                  <button
                    onClick={this.connect}
                  >Connect</button>
                </div>
                <div>
                  <button
                    onClick={this.reset}
                  >Reset</button>
                </div>
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
  mainForm: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    mainPage: state.mainPage,
    mainForm: state.mainForm }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mainActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
