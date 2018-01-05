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
  margin = { top: 50, right: 100, bottom: 50, left: 100 }

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
      .range([height, 0])
      .domain([0.0001, dataYMax])

    const yScale2 = d3.scaleLinear()
      .range([height, 0])
      .domain([0.0001, dataY2Max])

    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(-height - this.margin.bottom/2)

      const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      // .tickSize(-width)

    const yAxis2 = d3.axisRight(yScale2)
      // .ticks(5)
      // .tickSize(width)
    
    const gX = d3.select(this.node)
      .append('g')
      .attr("class", "xAxis ")
      .attr('transform', `translate(100, ${height+this.margin.bottom})`)
      .call(xAxis)
      
      d3.select(this.node)
      .append('g')
      // .attr('stroke', colors[0])
      .attr("class", "axisRed")
      .attr('transform', 'translate(100, 50)')
      .call(yAxis)
      
      d3.select(this.node)
      .append('g')
      .attr("class", "axisSteelBlue")
      //.attr('transform', 'translate(50, 25)')
      .attr("transform", `translate( ${width+this.margin.right}, 50 )`)
      .call(yAxis2)

      // d3.select(this.node)
      //   .append("text") 
      //   .attr('class', 'axisText')
      //   .attr("transform",
      //       "translate(" + (width/2) + " ," + 
      //                     (height + margin.top + 20) + ")")
      //   .text("Time");

      d3.select(this.node)
        .append("text")
        .attr('class', 'axisText')
        .attr("transform", "rotate(-90)")
        .attr("y", -10)
        .attr("x",0 - (height / 2))
        .attr("dy", "2em")
        .text("RPM");

      d3.select(this.node)
        .append("text")
        .attr('class', 'axisText')
        .attr("transform", "rotate(0)")
        .attr("y", height + this.margin.bottom)
        .attr("x", width/2 + this.margin.left)
        .attr("dy", "2em")
        .text("Time, s");

      d3.select(this.node)
        .append("text")
        .attr('class', 'axisText')
        .attr("transform", "rotate(-90)")
        .attr("y", width + this.margin.right + 20)
        .attr("x",0 - (height/2))
        .attr("dy", "2em")
        .text("Temperature, °C"); 
  
    this.forceUpdate()
  }

  render() {
    const { height, width, name, name2 } = this.props
    return (
      <section>
        <div className='graph-legend'>
          <p className='graph-name'>{name} </p> <div className='graph-name_strirer'></div>
        </div>
        <div className='graph-legend'>
          <p className='graph-name'>{name2} </p> <div className='graph-name_temp'></div>
        </div>
        <svg
          ref={(node) => { this.node = node }}
          width={width + this.margin.left + this.margin.right} height={height + this.margin.top + this.margin.bottom}
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
