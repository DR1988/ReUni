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

  generateVal = (value, dispertion) => {
    if(Math.random() < 0.5) {
      return (value - Math.random() * dispertion)
    }
    return (value + Math.random() * dispertion)
  }
  
  generateArr = (quantity, value=2500, dispertion=50 ) => {
    const arr = []
    for (var index = 0; index < quantity; index++) {
      arr.push(this.generateVal(value, dispertion))
    }
    return arr
  }
  
  multi = 1.2
  render() {
    const dataY = [0, 200, 800, 1400, 2200, 2300, ...this.generateArr(500, 2500, 20), ...this.generateArr(500, 1500, 20)]
    const dataY2 = [20, 21, 22, 24, 27, 28, ...this.generateArr(50, 30, 0.4), 31, 31, 31.5, 31.5, 32,32,33,33,33,34,34,35,35,35.5,35.5,36,36,36,37,37,37,38,38,38,38.5,38.5,39,39, ...this.generateArr(50, 40, 0.4)]
    return (
      <div className="graph-container">
        <Grid
          name='Stirer'
          name2='Temperature'
          width={1000}
          height={500}
          dataYMax={Math.max(...dataY)*this.multi}
          dataY2Max={Math.max(...dataY2)*1.5}
          domainValue={1100}
        >
          <Linear
            dataYMax={Math.max(...dataY)*this.multi}
            dataY={dataY}
          />
          <Linear
            dataYMax={Math.max(...dataY2)*1.5}
            dataY={dataY2}
          />
          
        </Grid>
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
