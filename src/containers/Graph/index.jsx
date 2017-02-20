import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// import * as graphAction from '../../actions/graphAction.js'

import './style.scss'

import scrolling from './../../helpers/scrolling.js'
// const Ps = require('perfect-scrollbar')

class Graph extends Component {
  constructor(props) {
    super(props)
    this.sliderW = null
    this.count=0
  }
  componentDidMount() {
    // console.log(document.querySelector('.picture-cont').clientWidth)
    // console.log(document.querySelector('.content').clientWidth)
    this.sliderW = (document.querySelector('.picture-cont').clientWidth
    / document.querySelector('.content').clientWidth) * document.querySelector('.picture-cont').clientWidth // width of container
    this.forceUpdate()
  }

  stopdrag = (e) => {
    e.persist()
    e.ondragstart = () => false
  }

  incrCount = () => {
    ++this.count
    this.forceUpdate()
  }

  render() {
    return (
      <div className="picture-cont">
        <div className="content" />
        <div className="slider-bar">
          <div
            className="mover"
            style={{ width: this.sliderW }}
            onMouseDown={scrolling}
            onDragStart={this.stopdrag}
            onTouchStart={scrolling}
          />
        </div>
        <div className="cont">adasdsa
        </div>
        {this.count}
      </div>
    )
  }
}
export default Graph
// function mapStateToProps(state) {
//   return { user: state.user }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(graphAction, dispatch),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Graph)
