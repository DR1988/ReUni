import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// import * as graphAction from '../../actions/graphAction.js'
import { Grid, Linear } from './../../components/d3js/index.jsx'
import './style.scss'

import scrolling from './../../helpers/scrolling.js'
// const Ps = require('perfect-scrollbar')

class Graph extends Component {
  constructor(props) {
    super(props)
    this.sliderW = null
    this.count = 0
  }
  componentDidMount() {
    // console.log(document.querySelector('.picture-cont').clientWidth)
    // console.log(document.querySelector('.content').clientWidth)
    // this.sliderW = (document.querySelector('.picture-cont').clientWidth
    // / document.querySelector('.content').clientWidth) * document.querySelector('.picture-cont').clientWidth // width of container
    // this.forceUpdate()
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
    const dataY = [350, 120, 80, 75, 96, 322, 250, 13]
    const dataY2 = [120, 20, 80, 15, 196, 422, 150, 213]
    return (
      <div className="picture-cont">
      <Grid
        width={900}
        height={400}
        dataYMax={450}
      >
        <Linear
          dataY={dataY}
        />
        <Linear
          dataY={dataY2}
        />
      </Grid>
      {/* asdasd*/}
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
