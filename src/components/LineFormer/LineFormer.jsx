import React, { PropTypes } from 'react'
import RPMSetter from './../RPMSetter/RPMSetter.jsx'
import TempSetter from './../TempSetter/TempSetter.jsx'
import ValveLine from './../valveLine/valveLine.jsx'

const LineFormer = props => {
  const template = []
  const elem = props.elem
  if (elem.name === 'ValveLine') {
    template.push(
      <ValveLine
        key={elem.id}
        elem={elem}
        handle={() => props.handle(elem)}
      />)
  }
  if (elem.name === 'RPMSetter') {
    template.push(
      <RPMSetter
        key={elem.id}
        elem={elem}
        handle={() => props.handle(elem)}
      />)
  }
  if (elem.name === 'TempSetter') {
    template.push(
      <TempSetter
        key={elem.id}
        elem={elem}
        handle={() => props.handle(elem)}
      />)
  }
  return (
    <div>
      { template }
    </div>
  )
}
LineFormer.propTypes = {
  elem: PropTypes.object,
  handle: PropTypes.func,
}

export default LineFormer
