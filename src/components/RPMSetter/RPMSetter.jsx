import React, { Component } from 'react'
import './style.scss'

import getUniqTimeLines from './../../helpers/getUniqTimeLines.js'
import setLineTemplate from './../../helpers/templates/lineTemplate.jsx'
/*eslint-disable*/
class RPMSetter extends Component {
  constructor(props) {
    super(props)
    this.arrValueTemplate = []
    this.resultArrValue = []
  }
  componentWillMount(){
    // const { changes } = this.props.elem 
    // console.log(this.props.elem )
    const { elem } = this.props

    this.resultArrValue = getUniqTimeLines(elem)
    this.arrValueTemplate = setLineTemplate(this.resultArrValue, this.props.allTime)
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    // this.getUniqTimeLines(nextProps.elem.changes)
    this.resultArrValue = getUniqTimeLines(nextProps.elem)
    this.arrValueTemplate = setLineTemplate(this.resultArrValue, nextProps.allTime)
  }

  render() {
    return (<div className="line-wraper">
      <div className="line-definition">
        <span>{this.props.elem.ShortName}</span>
      </div>
      <div className="time-box_keeper">
        <div className="time-box">
          { this.arrValueTemplate }
        </div>
      </div>
    </div>
    )
  }
}
RPMSetter.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default RPMSetter
