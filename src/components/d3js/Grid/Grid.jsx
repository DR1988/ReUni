import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import s from './Grid.scss'

const colors = [
  'red',
  'blue',
  'green',
]

class Grid extends Component {
  margin = { top: 50, right: 50, bottom: 50, left: 50 }

  childrenWithProps
  componentDidMount() {
    const {
      height,
      width,
      dataYMax,
   } = this.props
    this.childrenWithProps = React.Children.map(this.props.children,
      (child, idx) => React.cloneElement(child, {
        node: this.node,
        margin: this.margin,
        width,
        height,
        dataYMax,
        color: colors[idx],
      }),
    )
    // const dataY = [1, 2, 3, 4, 5]
    // const dataYMax = dataY && dataY.length ? d3.max(dataY) : 5
    const xScale = d3.scaleLinear()
    .domain([0, width])
    .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([0.0001, dataYMax])
      .range([height, 0])

    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickSize(height)
      // .tickSizeOuter([0])

    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      .tickSize(-width)

    const yAxis2 = d3.axisRight(yScale)
      .ticks(10)
      .tickSize(width)
      // .tickSizeOuter([0])

    const gX = d3.select(this.node)
    .append('g')
    .attr('transform', 'translate(25, 25)')
    // .attr('class', 'axis axis--x')
    .call(xAxis)

    const gY = d3.select(this.node)
    .append('g')
    // .attr('stroke', 'red')
    // .attr('fill', 'red')

    .attr('transform', 'translate(25, 25)')
    .call(yAxis)

    // const gY2 = d3.select(this.node)
    // .append('g')
    // .attr('transform', 'translate(25, 25)')
    // .call(yAxis2)
    this.forceUpdate()
  }

  render() {
    const { height, width } = this.props
    return (
      <svg
        ref={(node) => { this.node = node }}
        width={width + this.margin.left} height={height + this.margin.top}
      >
        { this.childrenWithProps }
      </svg>
    )
  }
}

Grid.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  dataYMax: PropTypes.number,
}

Grid.defaultProps = {
  dataYMax: 5,
}

export default Grid
