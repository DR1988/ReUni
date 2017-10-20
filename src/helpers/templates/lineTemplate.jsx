import React, { Component,  PropTypes } from 'react'

import './lineTemplate.scss'
/* eslint-disable */


class WaitShow extends Component {
  state={
    toolTip: true,
  }
  showTootip = (e) => {
    e.stopPropagation()
    console.log(1111);
  }
  render() {
    const { display } = this.props
    const { toolTip } = this.state
    return (
      <div
        onClick={e => this.showTootip(e)}
        className = "waitShow"
        style = {{
          display,
        }}>
    </div>
    )
  }
}
const ActiveTime = (props) =>{
  if (!props.changes.duration) {
    return null
  }
  return (
  <div
    // className="time"
    className="time"
    style={{
      width: props.changes.duration * props.scale,
    }}
  >
    <div className="time-container">
      {props.changes.value ?
        <span>{props.changes.value}</span>
        : <span>{props.changes.duration}</span>}

      <input type="hidden" name="duration" defaultValue={props.changes.duration} />
      <input type="hidden" name="value" defaultValue={props.changes.value} />
      <input type="hidden" name="startTime" defaultValue={props.changes.startTime} />
      <input type="hidden" name="endTime" defaultValue={props.changes.endTime} />
      <input type="hidden" name="id" defaultValue={props.id} />
    </div>
  </div>
  )
}

ActiveTime.propTypes = {
  changes: PropTypes.object,
  id: PropTypes.number,
}

const GapTime = (props) => <div
  className="gap"
  style={{
    width: props.width * props.scale,
  }}
/>

GapTime.propTypes = {
  width: PropTypes.number,
}


const LineFormer = props => <div className="time-former">{props.children} </div>

LineFormer.propTypes = {
  children: PropTypes.node,
}

const setLineTemplate = (resultValves, allTime) => {
    // console.log('resultValves.resultchanges', resultValves)
  // console.log(resultValves.name)
  let formWidth = 0
  let scale = 1
  const ttllefRightPadding = 40
  if (allTime > 0) {
    if (document.querySelector('.form-Manupalation')) {
      formWidth = document.querySelector('.form-Manupalation').offsetWidth
      // console.log(formWidth, allTime)
      if ((formWidth - ttllefRightPadding) / allTime > 1) {
        scale = (formWidth - ttllefRightPadding) / allTime
      }
    }
  }
  // console.log('formWidth', formWidth)
  // console.log(scale)
  const lineTemplate = []
  for (let i = 0; i < resultValves.resultchanges.length; i++) {
    // console.log(resultValves.resultchanges[i])
    // if(resultValves.elementId === 8) {
    //   console.log(resultValves)
    // }
    lineTemplate.push(
      <LineFormer key={i}>
        <ActiveTime changes={resultValves.resultchanges[i]} scale={scale} id={i} />
        <WaitShow
          display = {resultValves.resultchanges[i].waitForValue ? 'block' : 'none'}
          id={i}
        />
        <GapTime
          width={resultValves.resultchanges[i + 1] ?
                 (resultValves.resultchanges[i + 1].startTime -
                 resultValves.resultchanges[i].endTime) : null}
          scale={scale}
          id={i}
        />
      </LineFormer>
    )
  }
  return lineTemplate
}

export default setLineTemplate
