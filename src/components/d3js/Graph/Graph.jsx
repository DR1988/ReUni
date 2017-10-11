import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import uuidv4 from 'uuid/v4'

import s from './Graph.scss'

class Graph extends PureComponent /* = ({
  node,
  width,
  height,
  margin,
  dataX,
  dataY,
  barWidth,
  color,
}) => */ {
  componentWillMount() {
    const {
      node,
      width,
      height,
      margin,
      dataX,
      dataY,
      barWidth,
      color,
    } = this.props
    const createBarChart = () => {
      const partWidth = (width / dataX.length) * (barWidth < 1 ? barWidth : 1)
      const dataYMax = d3.max(dataY)
      const uuid = uuidv4()
      console.log(uuid)
      const yScale =
      d3.scaleLinear()
      .domain([0, dataYMax])
      .range([0, height])

      d3.select(node)
      .selectAll('rect')
      .data(dataY)
      .enter()
      .append('rect')
      .attr('uuid', uuid)

      d3.select(node)
      .selectAll('rect')
      // .selectAll('#uuid' + uuid)
      .data(dataY)
      .exit()
      .remove()
      // console.log("selectAll('#uuid' + uuid)", d3.select(node).selectAll('#uuid' + uuid))
      d3.select(node)
      .selectAll('rect')
      // .selectAll('#uuid' + uuid)
      .data(dataY)
      .style('fill', color)
      .attr('x', (d, i) => (i * partWidth) + (margin.left / 2) + 1)
      .attr('width', partWidth)
      .attr('y', d => (height - yScale(d)) + (margin.top / 2))
      .attr('height', d => yScale(d))
    }
    createBarChart()
  }
  render() {
    return null
  }
}

  Graph.propTypes = {
  }
  export default Graph