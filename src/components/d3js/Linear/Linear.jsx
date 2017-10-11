import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import s from './Linear.scss'

class Linear extends PureComponent {

  componentWillMount() {
    const {
      node,
      margin,
      width,
      height,
      dataY,
      dataX,
      dataYMax,
      color,
    } = this.props
    const yScale = d3.scaleLinear()
    .domain([0, dataYMax])
    .range([height, 0])

    const xScale = d3.scaleLinear()
    .domain([0, dataY.length + 1]) // input
    .range([0, width])

    // const dataset = d3.range(8).map(function(d) { return {"y": d3.randomUniform(100)() } })
    const line = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveLinear)
    // console.log('valueline', line)
    d3.select(node)
    .append('path')
    .datum(dataY)
    .attr('fill', 'none')
    .attr('transform', 'translate(25, 25)')
    .attr('stroke', color)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line)
  }

  render() {
    return null
  }
}

Linear.propTypes = {

}

export default Linear
