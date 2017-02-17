import React, { Component } from 'react'
import './style.scss'

import getUniqTimeLines from './../../helpers/getUniqTimeLines.js'
import setLineTemplate from './../../helpers/lineTemplate.jsx'

/*eslint-disable*/
class TempSetter extends Component {
  constructor(props) {
    super(props)
    this.arrValueTemplate = []
    this.resultArrValue = []
  }
  componentWillMount(){
    const { changes } = this.props.elem 
    this.resultArrValue = getUniqTimeLines(changes)
    this.arrValueTemplate = setLineTemplate(this.resultArrValue )
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps) 
    this.resultArrValue = getUniqTimeLines(nextProps.elem.changes)
    this.arrValueTemplate = setLineTemplate(this.resultArrValue )
  }

  render() {
    return (<div className="line-wraper">
      <div className="line-definition">
        <span>{this.props.elem.ShortName}</span>
      </div>
      <div className="time-box">
        { this.arrValueTemplate }
      </div>
    </div>
    )
  }
}
TempSetter.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
}

export default TempSetter
