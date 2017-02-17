  export default(valves) => {
    // TODO: setting next start time less then previus endtime not overwrite previus one
    let resultValves = []//eslint-disable-line
    for (let i = 0; i < valves.length; i++) {
      if (i + 1 < valves.length) {
        if (valves[i].endTime > valves[i + 1].startTime) {
          valves[i].endTime = valves[i + 1].endTime //eslint-disable-line
          resultValves.push(valves[i])
          i += 1
        } else {
          resultValves.push(valves[i])
        }
      } else {
        resultValves.push(valves[i])
      }
    }
    return resultValves
  }
