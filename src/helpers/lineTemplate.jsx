import React from 'react'

const setLineTemplate = (resultValves) => {
    // console.log('resultValves', resultValves)
  const lineTemplate = []
  for (let i = 0; i < resultValves.length; i++) {
    lineTemplate.push(
      <div
        className="time-former"
        key={i}
      >
        <div
          className="time" style={{
            width: resultValves[i].duration,
          }}
        >
          {resultValves[i].value ? <span>{resultValves[i].value}</span> : resultValves[i].duration }
        </div>
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
  return lineTemplate
}

export default setLineTemplate
