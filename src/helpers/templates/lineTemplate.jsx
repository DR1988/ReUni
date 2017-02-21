import React from 'react'
import './lineTemplate.scss'

const setLineTemplate = (resultValves) => {
    // console.log('resultValves.resultchanges', resultValves.resultchanges)
  // console.log(resultValves.name)
  const lineTemplate = []
  for (let i = 0; i < resultValves.resultchanges.length; i++) {
    // console.log(resultValves.resultchanges[i])
    lineTemplate.push(
      <div
        className="time-former"
        key={i}
      >
        <div
          className="time"
          data-duration={resultValves.resultchanges[i].duration}
          data-startTime={resultValves.resultchanges[i].startTime}
          data-endTime={resultValves.resultchanges[i].endTime}
          style={{
            width: resultValves.resultchanges[i].duration,
          }}
        >
          {resultValves.resultchanges[i].value ? (<div>
            <span>{resultValves.resultchanges[i].value}</span>
            <span className="pull-right">{i}</span>
          </div>
          ) :
            (<div>
              <span>{resultValves.resultchanges[i].duration}</span>
              <span className="pull-right">{i}</span>
            </div>
          )
         }
          <input type="hidden" name="duration" value={resultValves.resultchanges[i].duration} />
          <input type="hidden" name="value" value={resultValves.resultchanges[i].value} />
          <input type="hidden" name="startTime" value={resultValves.resultchanges[i].startTime} />
          <input type="hidden" name="endTime" value={resultValves.resultchanges[i].endTime} />
          <input type="hidden" name="id" value={i} />
        </div>
        <div
          className="gap"
          style={{
            width: resultValves.resultchanges[i + 1] ?
            resultValves.resultchanges[i + 1].startTime - resultValves.resultchanges[i].endTime
            : null,
          }}
        />
      </div>
    )
  }
  return lineTemplate
}

export default setLineTemplate
