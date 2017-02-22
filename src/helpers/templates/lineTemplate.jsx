import React, { PropTypes } from 'react'
import './lineTemplate.scss'

const ActiveTime = (props) =>
  <div
    className="time"
    style={{
      width: props.changes.duration,
    }}
  >
    {props.changes.value ?
      <span>{props.changes.value}</span>
      : <span>{props.changes.duration}</span>}

    <input type="hidden" name="duration" defaultValue={props.changes.duration} />
    <input type="hidden" name="value" defaultValue={props.changes.value} />
    <input type="hidden" name="startTime" defaultValue={props.changes.startTime} />
    <input type="hidden" name="endTime" defaultValue={props.changes.endTime} />
    <input type="hidden" name="id" defaultValue={props.id} />
  </div>

ActiveTime.propTypes = {
  changes: PropTypes.object,
  id: PropTypes.number,
}

const GapTime = (props) =>
  <div
    className="gap"
    style={{
      width: props.width,
    }}
  />

GapTime.propTypes = {
  width: PropTypes.number,
}

const LineFormer = props => <div className="time-former">{props.children} </div>

LineFormer.propTypes = {
  children: PropTypes.node,
}

const setLineTemplate = (resultValves) => {
    // console.log('resultValves.resultchanges', resultValves.resultchanges)
  // console.log(resultValves.name)
  const lineTemplate = []
  for (let i = 0; i < resultValves.resultchanges.length; i++) {
    // console.log(resultValves.resultchanges[i])
    lineTemplate.push(
      <LineFormer key={i}>
        <ActiveTime changes={resultValves.resultchanges[i]} id={i} />
        <GapTime
          width={resultValves.resultchanges[i + 1] ?
                 resultValves.resultchanges[i + 1].startTime -
                 resultValves.resultchanges[i].endTime : null}
        />
      </LineFormer>
    )
  }
  return lineTemplate
}

export default setLineTemplate
