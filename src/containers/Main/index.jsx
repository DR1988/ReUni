import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import Loading from '../../components/Loading'
import mainActions from '../../actions/mainAction.js'
import MainForm from './../MainForm/MainForm.jsx'

import './style.scss'
/*eslint-disable*/

class Main extends Component {

  handlePress = (e) => {
    e.preventDefault()
    this.props.actions.addInputFormer(this.props.mainPage.length)
  }


  inputf = (idVal) => {
  }

  handle = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (file) {
      reader.readAsBinaryString(file)
      reader.onloadend = (evt) => {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
          this.props.numActions.setValues(JSON.parse(evt.target.result))
        }
      }
    }
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
        <div className="col-xs-12 col-sm-8">
          <MainForm />
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
