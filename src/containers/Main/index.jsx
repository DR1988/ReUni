import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FileSaver from 'file-saver'
import io from 'socket.io-client'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';

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
  }
  state = {
    values: 'V0Y|V1Y|V2Y|V3Y|V4Y|V5Y|V6Y|V7Y|R81500|T915|',
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
          // console.log('evt.target.result', evt.target.result);
          // console.log('JSON.parse(evt.target.result)', JSON.parse(evt.target.result));
          this.props.actions.setValues(JSON.parse(evt.target.result).form)
          this.props.actions.setNotes(JSON.parse(evt.target.result).notes)
        }
      }
    }
  }

  save = () => {
    let fileToSave = {notes: '', form: {}}
    console.log('this.props.mainForm', this.props.mainForm);
    console.log(fileToSave);
    fileToSave.notes = this.props.mainForm.notes
    fileToSave.form.allTime = this.props.mainForm.allTime
    fileToSave.form.lineFormer = this.props.mainForm.lineFormer
    fileToSave = JSON.stringify(fileToSave)
    console.log('fileToSave', fileToSave);
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

  check = () => {
    console.log(2222)
    const values = document.getElementById('message').value

    const protocol = {}
    protocol.allTime = this.props.mainForm.allTime
    protocol.lineFormer = this.props.mainForm.lineFormer
    // console.log('protocol', protocol)
    if (fetch) {
      fetch(`${newIp}/check`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ values }),
      }).then(res => res)
    } else {
      const xhr = new XMLHttpRequest()
      const body = JSON.stringify(values)
      xhr.open('POST', `${newIp}/check`, true)
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

  changeValues = (value) => {
    this.setState({
      values: value,
    })
  }

  render() {
    // this.getSource()
    // console.log(this.props.mainForm)
    console.log(this.props.mainForm);
    return (
      <div className="main-flex row">
        <div>{this.state.test}</div>
        <div className="col-xs-12 col-sm-4">
          <div className="note-box col-xs-12">
            <span>Notes</span>
            <section className='textField' >
              <TextField 
                value={this.props.mainForm.notes}
                onChange={(e, newValue) => this.props.actions.setNotes(newValue)}
                multiLine
                rows={10}
                rowsMax={10}
                fullWidth
                hintText="Input Note Here"
                style={{backgroundColor: 'white'}}
              />
            </section>
          </div>
          <div className="picture-box col-xs-12">
            <span>picture</span>
          </div>
        </div>
        <div id="container" className="col-sm-8 col-xs-12">
          <div className="hide-scroll">
            <MainForm distance={this.distance} time={this.time} />
          </div>
          <div className="user-actions">
            <div>
              <input type="file" name="file" id="file" className="inputfile" onChange={this.loadFile} />
              <label htmlFor="file">Choose a file</label>
            </div>
            <div>
              <FlatButton
                label="SAVE"
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: '#00BCD4', height: '50px', marginTop: '2rem' }}
                className="login-container_button"
                onClick={this.save}
              />
            </div>
            <div>
              <FlatButton
                label="clear"
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: '#00BCD4', height: '50px', marginTop: '2rem' }}
                className="login-container_button"
                onClick={this.clearForm}
                onTouchStart={this.clearForm}
              />
            </div>
             {/* <div>
                <input
                  type="text"
                  id="message"
                  value={this.state.values}
                  onChange={(e) => this.changeValues(e.target.value)}
                />
                <button
                  onClick={this.check}
                >Check</button>
              </div>*/}
            <div>
              <FlatButton
                label="Start"
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: '#00BCD4', height: '50px', marginTop: '2rem' }}
                className="login-container_button"
                onClick={this.start}
                onTouchStart={this.start}
                />
            </div>
            <div>
              <FlatButton
                label="Connect"
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: '#00BCD4', height: '50px', marginTop: '2rem' }}
                className="login-container_button"
                onClick={this.connect}
                onTouchStart={this.connect}
                />
            </div>
            <div>
              <FlatButton
                label="Reset"
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: '#00BCD4', height: '50px', marginTop: '2rem' }}
                className="login-container_button"
                onClick={this.reset}
                onTouchStart={this.reset}
                />
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
