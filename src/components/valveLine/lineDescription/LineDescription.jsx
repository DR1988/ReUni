import React from 'react'
import './LineDescription.scss'

const LineDecription = ({ valve }) => {
  const descriotionShow = (valve) => {
    switch (valve) {
      case 'GV1':
        return 'Inert gas inlet into reagent chamber 1'
      case 'GV2':
        return 'Inert Gas Outlet from reagent chamner 1'
      case 'GV3':
        return 'Inert gas inlet into reagent chamber 2'
      case 'GV4':
        return 'Inert Gas Outlet from reagent chamner 2'
      case 'GV5':
        return 'Inert gas inlet into reaction camera'
      case 'GV6':
        return 'Inert gas outlet from reaction camera'
      case 'HV1':
        return 'Reactive 1 Inlet'
      case 'HV2':
        return 'Reactive 2 Inlet'
      case 'RPM':
        return 'Stirrer'
      case 'T°C':
        return 'Temperature'
      default:
        return 'Inert Gas'
    }
  }
  return (
    <div className='lineDecription-container'>
      <span>
        {descriotionShow(valve)} 
      </span>
    </div>
  )
}

export default LineDecription
