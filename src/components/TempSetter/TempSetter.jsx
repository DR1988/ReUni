import React, { Component } from 'react'
import './style.scss'
/*eslint-disable*/
class TempSetter extends Component {
  constructor(props) {
    super(props)
    this.arrValueTemplate = []
    this.resultArrValue = []
  }
  componentWillMount(){
    const { changes } = this.props.elem 
    this.getUniqTimeLines(changes)
    this.setValveTemplate(this.resultArrValue)
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps) 
    this.getUniqTimeLines(nextProps.elem.changes)
    this.setValveTemplate(this.resultArrValue)
  }

  getUniqTimeLines(arrValue) {
    // TODO: setting next start time less then previus endtime not overwrite previus one
    this.resultArrValue = []
    for (let i = 0; i < arrValue.length; i++) {
      if (i + 1 < arrValue.length) {
        if (arrValue[i].endTime > arrValue[i + 1].startTime) {
          arrValue[i].endTime = arrValue[i + 1].endTime //eslint-disable-line
          this.resultArrValue.push(arrValue[i])
          i += 1
        } else {
          this.resultArrValue.push(arrValue[i])
        }
      } else {
        this.resultArrValue.push(arrValue[i])
      }
    }
  }

  setValveTemplate(resultArrValue) {
    // console.log('resultValves', resultValves)
    this.arrValueTemplate = []
    for (let i = 0; i < resultArrValue.length; i++) {
      this.arrValueTemplate.push(
        <div
          className="time-former"
          key={i}
        >
          <div
            className="time" style={{
              width: resultArrValue[i].endTime - resultArrValue[i].startTime,
            }}
          >
          <span>{this.props.elem.changes[i].value}</span>
          </div>
          <div
            className="gap"
            style={{
              width: resultArrValue[i + 1] ?
              resultArrValue[i + 1].startTime - resultArrValue[i].endTime
              : null,
            }}
          />
        </div>
      )
    }
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
