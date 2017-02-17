import React, { Component } from 'react'
import './style.scss'

class ValveLine extends Component {
  constructor(props) {
    super(props)
    this.valvesTemplate = []
    this.resultValves = []
  }

  componentWillMount() {
    // console.log(this.props.elem)
    const { changes } = this.props.elem
    this.getUniqTimeLines(changes)
    this.setValveTemplate(this.resultValves)
  }

  componentWillReceiveProps(nextProps) {
    this.getUniqTimeLines(nextProps.elem.changes)
    this.setValveTemplate(this.resultValves)
  }

  getUniqTimeLines(valves) {
    // TODO: setting next start time less then previus endtime not overwrite previus one
    this.resultValves = []
    for (let i = 0; i < valves.length; i++) {
      if (i + 1 < valves.length) {
        if (valves[i].endTime > valves[i + 1].startTime) {
          valves[i].endTime = valves[i + 1].endTime //eslint-disable-line
          this.resultValves.push(valves[i])
          i += 1
        } else {
          this.resultValves.push(valves[i])
        }
      } else {
        this.resultValves.push(valves[i])
      }
    }
    if (this.props.elem.id === 7) {
      this.resultValves.forEach(elem => {
        console.log(elem.id, '*******************************')
        console.log(`start %c ${elem.startTime}`, 'color: green; font-weight: bold;')
        console.log(`stop %c  ${elem.endTime}`, 'color: red; font-weight: bold;')
      }
    )
      console.log('result', this.resultValves)
    }
  }

  setValveTemplate(resultValves) {
    // console.log('resultValves', resultValves)
    this.valvesTemplate = []
    for (let i = 0; i < resultValves.length; i++) {
      this.valvesTemplate.push(
        <div
          className="time-former"
          key={i}
        >
          <div
            className="time" style={{
              width: resultValves[i].endTime - resultValves[i].startTime,
            }}
          />
          <div
            className="gap"
            style={{
              width: resultValves[i + 1] ?
              resultValves[i + 1].startTime - resultValves[i].endTime
              : null,
            }}
          />
        </div>
      )
    }
  }

  render() {
    return (<div className="line-wraper">
      <div className="valve-number">
        <span>{this.props.elem.id + 1}</span>
      </div>
      <div className="time-box">
        { this.valvesTemplate }
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
