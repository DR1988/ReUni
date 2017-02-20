import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import Loading from '../../components/Loading'
import mainActions from '../../actions/mainAction.js'
import MainForm from './../MainForm/MainForm.jsx'

import './style.scss'
/*eslint-disable*/
var Ps = require('perfect-scrollbar')

class Main extends Component {
 
  componentDidMount() {
    let container = document.getElementById('container')
    // console.log(container)
    // Ps.initialize(container)
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
        <div id='container' className="hide-scroll col-xs-12 col-sm-8">
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
