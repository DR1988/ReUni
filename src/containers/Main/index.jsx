import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FileSaver from 'file-saver'

// import Loading from '../../components/Loading'
import mainActions from '../../actions/mainAction.js'
import MainForm from './../MainForm/MainForm.jsx'
import NavLink from './../../components/NavLink/index.jsx'

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
    const lineFormer = []
    let changes = []
    let timeFormer = {}
    let lineFormerName
    for (const child of [...form.children]) {
      lineFormerName = child.querySelector(['input'])
      changes = []
      const timeFormers = child.querySelectorAll('div.time-former')
      for (const timeForm of [...timeFormers]) {
        const inputs = timeForm.querySelectorAll('input')
        timeFormer = {}
        for (const input of [...inputs]) {
          timeFormer[input.name] = +input.value
        }
        changes.push(timeFormer)
      }
      lineFormer.push(
        { id: +child.dataset.elemid,
          changes,
          name: lineFormerName.value,
        })
    }

    let allTime = 0
    lineFormer.forEach(line => {
      const currentMax = Math.max.apply(null, line.changes.map(elem => elem.endTime))
      if (currentMax > allTime) {
        allTime = currentMax
      }
    })
    // let send
    // this.file = JSON.stringify({ lineFormer, allTime })

    return { lineFormer, allTime }
  }

  save = () => {
    const fileToSave = JSON.stringify(this.serialize())
    const blob = new Blob([fileToSave], { type: 'application/json;charset=utf-8' })
    FileSaver.saveAs(blob, 'saveAs.json')
  }

  clearForm = () => {
    document.getElementById('file').value = ''
    this.props.actions.resetForm()
  }

  // start = () => {
  //   const protocol = this.serialize()
  //   let queryString = ''
  //   protocol.lineFormer.forEach(line => {
  //     queryString += (line.id + line.changes + line.name)
  //   })
  //   console.log(queryString)
  //   fetch('http://192.168.1.33:3333/start', {
  //     method: 'post',
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     },
  //     body: `protocol=${queryString}`,
  //   }).then(res => console.log(res))
  // }

  start = () => {
    const protocol = this.serialize()
    fetch('http://192.168.1.33:3333/start', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(protocol),
    }).then(res => console.log(res))
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
          <NavLink to="protocol2">Another </NavLink>
          <div className="hide-scroll">
            <MainForm />
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
                  >START</button>
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
