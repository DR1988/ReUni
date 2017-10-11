import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import s from './Chart.scss'

class Axis extends Component {
  static propTypes = {
    h: PropTypes.number.isRequired,
    axis: PropTypes.func.isRequired,
  }

  componentDidMount() { this.renderAxis() }
  componentDidUpdate() { this.renderAxis() }
  renderAxis = () => {
    const node = ReactDOM.findDOMNode(this)
    d3.select(node).call(this.props.axis)
  }
  render = () => {
    const translate = `translate(0, ${this.props.h})`
    return (
      <g className="axis" transform={translate} />
    )
  }
}

class Grid extends Component {
  static propTypes = {
    h: PropTypes.number.isRequired,
    grid: PropTypes.func.isRequired,
  }

  componentDidMount() { this.renderGrid() }

  componentDidUpdate() { this.renderGrid() }

  renderGrid = () => {
    const node = ReactDOM.findDOMNode(this)
    d3.select(node).call(this.props.grid)
  }
  render = () => {
    const translate = `translate(25, 25)`
    // const translate = `translate(25,(${this.props.h}))`
    return <g
      className="y-grid"
      transform={translate}
    />
  }
}

class Chart extends Component {

  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }

  margin = { top: 50, right: 50, bottom: 50, left: 50 }

  createBarChart = () => {
    const { dataY, dataX, height, width, barWidth } = this.props
    const partWidth = width / dataY.length
    const node = this.node
    const dataYMax = d3.max(dataY)
    const yScale =
      d3.scaleLinear()
        .domain([0, dataYMax])
        .range([0, height])

    d3.select(node)
     .selectAll('rect')
     .data(dataY)
     .enter()
     .append('rect')

    d3.select(node)
     .selectAll('rect')
     .data(dataY)
     .exit()
     .remove()

/*  d3.select(node)
     .selectAll('text')
     .data(dataY)
     .enter()
     .append('text')

    d3.select(node)
     .selectAll('text')
     .data(dataY)
     .exit()
     .remove()
*/

    const xOffset = (partWidth * barWidth + this.margin.left) / 2
    const yOffset = this.margin.bottom / 2
    d3.select(node)
     .selectAll('rect')
     .data(dataY)
     .style('fill', '#fe9922')
     .attr('x', (d,i) => i * partWidth + this.margin.left / 2)
     .attr('width', partWidth * (barWidth < 1 ? barWidth : 1))
     .attr('y', d => height - yScale(d) + 25)
     .attr('height', d => yScale(d))
    
    // d3.select(node)
    //  .selectAll('text')
    //  .data(dataX)
    //  .attr('x', (d,i) => i * partWidth + xOffset)
    //  .attr('y', d => height + yOffset)
    //  .attr('font-weight', 'bold')
    //  .attr('transform', (d, i) => `rotate(-90 ${i * partWidth + xOffset}, ${height + yOffset})`)
    //  .text(d => d)
  }
  render() {
    const { dataY, width, height } = this.props
    const dataYMax = d3.max(dataY)
    const yScale = d3.scaleLinear()
      .domain([0, dataYMax])
      .range([height, 0])

    const yGrid = d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
    return (
      <svg
        ref={(node) => { this.node = node }}
        width={width + this.margin.left} height={height + this.margin.top}
      >
        <Grid h={100} grid={yGrid} />
      </svg>
    )
  }
}

Chart.propTypes = {
  height: PropTypes.number,
  barWidth: PropTypes.number,
  width: PropTypes.number,
  dataY: PropTypes.arrayOf(PropTypes.number).isRequired,
}

Chart.defaultProps = {
  height: 300,
  width: 1000,
  barWidth: 0.5,
}

export default Chart
