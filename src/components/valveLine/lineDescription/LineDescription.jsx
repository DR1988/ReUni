import React from 'react'
import Snackbar from 'material-ui/Snackbar'

import './LineDescription.scss'

const LineDecription = ({
  valve,
  currentElem,
  showDescription,
  hideDescrioption,
}) => {
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
  const open=currentElem ? currentElem.ShortName === valve && showDescription : false
  return (
    <Snackbar
      open={open}
      style={{
        position: 'absolute',
        left: '50px',
        display: 'flex',
        bottom: 'auto',
        zIndex: 2,
        visibility: 'visible',
        transform: open ? 'translate(0, 0px)' : 'translate(-200%, 0px)',
        transition: 'transform 700ms cubic-bezier(.62,-.73,.4,.4) 0ms',
        top: '0px',
        boxShadow: '0px 0px 5px 3px rgba(0,0,0,0.3)',
      }}
      contentStyle={{
        backgroundColor: '#fff',
        color: '#a52323',
        fontWeight: 'bold',
      }}
      bodyStyle={{
        backgroundColor: '#fff',
      }}
      autoHideDuration={4000}
      onRequestClose={hideDescrioption}
      message={descriotionShow(valve)}
    />
    // <div className='lineDecription-container'>
    //   <span>
    //     {descriotionShow(valve)} 
    //   </span>
    // </div>
  )
}

export default LineDecription
