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
  margin = { top: 50, right: 50, bottom: 25, left: 100 }

  childrenWithProps
  componentDidMount() {
    const {
      height,
      width,
      dataYMax,
      dataY2Max,
      domainValue,
   } = this.props
    this.childrenWithProps = React.Children.map(this.props.children,
      (child, idx) => React.cloneElement(child, {
        node: this.node,
        margin: this.margin,
        width,
        height,
        //dataYMax,
        color: colors[idx],
      }),
    )
    const xScale = d3.scaleLinear()
      .domain([0, domainValue])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([0.0001, dataYMax])
      .range([height, 0])

    const yScale2 = d3.scaleLinear()
      .domain([0.0001, dataY2Max])
      .range([height, 0])

    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickSize(height)

    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      // .tickSize(-width)

    const yAxis2 = d3.axisRight(yScale2)
      .ticks(5)
      // .tickSize(width)
    console.log('yAxis2', yAxis2);
    const gX = d3.select(this.node)
      .append('g')
      .attr('transform', 'translate(50, 25)')
      .call(xAxis)

    d3.select(this.node)
      .append('g')
      .attr('transform', 'translate(50, 25)')
      .call(yAxis)

    d3.select(this.node)
      .append('g')
      .attr('transform', 'translate(50, 25)')
      .call(yAxis2)

    this.forceUpdate()
  }

  render() {
    const { height, width, name } = this.props
    return (
      <section>
        <h3 className='graph-name'>{name}</h3>
        <svg
          ref={(node) => { this.node = node }}
          width={width + this.margin.left} height={height + this.margin.top}
        >
          { this.childrenWithProps }
        </svg>
      </section>
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
  name: 'Graph'
}

export default Grid
