import React, { Component } from 'react'
import './style.scss'

import getUniqTimeLines from './../../helpers/getUniqTimeLines.js'
import setLineTemplate from './../../helpers/templates/lineTemplate.jsx'
import LineDescription from './lineDescription/lineDescription.jsx'

class ValveLine extends Component {
  constructor(props) {
    super(props)
    this.linesTemplate = []
    this.resultLines = {}
  }

  state = {
    showDescription: true,
  }

  componentWillMount() {
    // const { changes } = this.props.elem
    const { elem } = this.props
    this.resultLines = getUniqTimeLines(elem)
    this.linesTemplate = setLineTemplate(this.resultLines, this.props.allTime)
  }

  componentWillReceiveProps(nextProps) {
    // this.resultLines = getUniqTimeLines(nextProps.elem.changes)
    this.resultLines = getUniqTimeLines(nextProps.elem)
    this.linesTemplate = setLineTemplate(this.resultLines, nextProps.allTime)
  }

  showDescription = () => {
    this.setState({
      showDescription:true
    }) 
  }

  hideDescrioption = () => {
    this.setState({
      showDescription:false
    })
  }

  render() {
    return (<div className="line-wraper">
      <div className="line-definition">
        <span
          onMouseEnter={this.showDescription}
          onMouseLeave={this.hideDescrioption}
        >{this.props.elem.ShortName}</span>
        {this.state.showDescription ? <LineDescription
          valve = {this.props.elem.ShortName}
          /> : null }
      </div>
      <div className="time-box_keeper">
        <div className="time-box">
          { this.linesTemplate }
        </div>
      </div>
    </div>
    )
  }
}

ValveLine.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
  width: React.PropTypes.string,
  elem: React.PropTypes.object,
}

ValveLine.defaultProps = {
  width: '20%',
}

export default ValveLine
