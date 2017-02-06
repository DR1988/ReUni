import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as graphAction from '../../actions/graphAction.js'

import './style.scss'

const Graph = () => <div className="col-xs-push-5 col-xs-6">
  Graphs
</div>

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(graphAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
