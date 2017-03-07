import React, { Component } from 'react'
import './style.scss'

import getUniqTimeLines from './../../helpers/getUniqTimeLines.js'
import setLineTemplate from './../../helpers/templates/lineTemplate.jsx'

class ValveLine extends Component {
  constructor(props) {
    super(props)
    this.linesTemplate = []
    this.resultLines = {}
  }

  componentWillMount() {
    // const { changes } = this.props.elem
    const { elem } = this.props
    this.resultLines = getUniqTimeLines(elem)
    this.linesTemplate = setLineTemplate(this.resultLines)
  }

  componentWillReceiveProps(nextProps) {
    // this.resultLines = getUniqTimeLines(nextProps.elem.changes)
    this.resultLines = getUniqTimeLines(nextProps.elem)
    this.linesTemplate = setLineTemplate(this.resultLines, this.props.allTime)
  }

  render() {
    return (<div className="line-wraper">
      <div className="line-definition">
        <span>{this.props.elem.id + 1}</span>
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
