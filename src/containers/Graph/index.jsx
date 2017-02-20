import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// import * as graphAction from '../../actions/graphAction.js'

import './style.scss'

// const Ps = require('perfect-scrollbar')

class Graph extends Component {
  constructor(props) {
    super(props)
    this.sliderW = null
  }
  componentDidMount() {
    this.setcoord()
    // const container = document.querySelector('.picture-cont')
    // const sliderB = document.querySelector('.mover')
    // const contentWidth = document.querySelector('.content').clientWidth
    // const sliderWidth = document.querySelector('.slider-bar').clientWidth

    // this.sliderW = (sliderWidth / contentWidth) * 100
    // // console.log('this.sliderW', this.sliderW)
    // const pos = sliderB.getBoundingClientRect().left - container.getBoundingClientRect().left
    // // console.log('pos', pos)
    // const scrollPercent = (pos / sliderWidth) * 100
    // // console.log('scrollPercent', scrollPercent)
    // const scrollPx = (scrollPercent / 100) * contentWidth
    // container.scrollLeft += scrollPx
    // console.log('scrollPx', scrollPx)
    this.forceUpdate()
    // Ps.initialize(containers)
  }

  setcoord = (e, coord) => {
    const container = document.querySelector('.picture-cont')
    const sliderB = document.querySelector('.mover')
    const contentWidth = document.querySelector('.content').clientWidth
    const sliderWidth = document.querySelector('.slider-bar').clientWidth

    this.sliderW = (sliderWidth / contentWidth) * 100
    // console.log('this.sliderW', this.sliderW)
    const pos = sliderB.getBoundingClientRect().left - container.getBoundingClientRect().left
    // console.log(coord)
    // console.log('pos', pos)
    let scrollPercent
    if (coord) {
      scrollPercent = (coord / sliderWidth) * 100
    } else {
      scrollPercent = (pos / sliderWidth) * 100
    }
    const scrollPx = (scrollPercent / 100) * contentWidth
    // console.log('scrollPx', scrollPx)
    container.scrollLeft = scrollPx
    // console.log(' container.scrollLeft', container.scrollLeft)
  }

  getCoords = (elem) =>
    elem.getBoundingClientRect().left - document.querySelector('.picture-cont')
                                                .getBoundingClientRect().left

  scrolling = (e) => {
    e.persist()
    const thumbCoords = this.getCoords(e.target)
    const shiftX = e.pageX - thumbCoords
    // console.log(shiftX)
    const sliderCoords = this.getCoords(document.querySelector('.slider-bar'))
    document.onmousemove = (evt) => {
      let newLeft = evt.pageX - shiftX - sliderCoords
      if (newLeft < 0) {
        newLeft = 0
      }
      // console.log(e.target.offsetWidth.offsetWidth)
      const rightEdge = document.querySelector('.slider-bar').offsetWidth - e.target.offsetWidth
      if (newLeft > rightEdge) {
        newLeft = rightEdge
      }
      // console.log(newLeft)
      this.setcoord(e, newLeft)
      e.target.style.left = newLeft + 'px'
    }

    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null
    }
    return false
  }
  stopdrag = (e) => {
    e.persist()
    console.log(e.target)
    e.ondragstart = () => false
  }

  render() {
    return (
      <div className="picture-cont">
        <div className="content" />
        <div className="slider-bar">
          <div
            className="mover"
            style={{ width: this.sliderW }}
            onMouseDown={this.scrolling}
            onDragStart={this.stopdrag}
          />
        </div>
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
