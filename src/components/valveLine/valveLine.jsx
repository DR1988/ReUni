import React, { Component } from 'react'
import './style.scss'

class ValveLine extends Component {
  constructor(props) {
    super(props)
    this.valvesTemplate = []
    this.resultValves = []
  }

  componentWillMount() {
    const { valves } = this.props.elem
    this.getUniqTimeLines(valves)
    this.setValveTemplate(this.resultValves)
  }

  componentWillReceiveProps(nextProps) {
    this.getUniqTimeLines(nextProps.elem.valves)
    this.setValveTemplate(this.resultValves)
  }

  getUniqTimeLines(valves) {
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
    // console.log('result', this.resultValves)
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
    return (<div className="rows" onClick={this.props.handle}>
      <div className="valve-number col-xs-1">
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
