const hideModal = () => dispatch => {
  // console.log('id', id)
  dispatch({
    type: 'HIDE_MODAL',
  })
}


const setLineValues = (id, payload) => dispatch => {
  dispatch({
    type: 'SET_LINE_VALUES',
    id,
    payload,
  })
}

// const changeStartValue = value => dispatch => {
//   dispatch({
//     type: 'CHANGE_START_VALUE',
//     value,
//   })
// }

// const changeStopValue = value => dispatch => {
//   dispatch({
//     type: 'CHANGE_STOP_VALUE',
//     value,
//   })
// }

// const changeRPMValue = value => dispatch => {
//   dispatch({
//     type: 'CHANGE_RPM_VALUE',
//     value,
//   })
// }

// const changeTempValue = value => dispatch => {
//   dispatch({
//     type: 'CHANGE_TEMP_VALUE',
//     value,
//   })
// }

export default {
  hideModal,
  // changeStartValue,
  // changeStopValue,
  // changeRPMValue,
  // changeTempValue,
  setLineValues,
}
