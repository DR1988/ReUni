const hideModal = (id) => dispatch => {
  dispatch({
    type: 'HIDE_MODAL',
    id,
  })
}

const setTime = (id, seTtime) => dispatch => {
  dispatch({
    type: 'SET_TIME',
    id,
    seTtime,
  })
}

const changeStartValue = value => dispatch => {
  dispatch({
    type: 'CHANGE_START_VALUE',
    value,
  })
}

const changeStopValue = value => dispatch => {
  dispatch({
    type: 'CHANGE_STOP_VALUE',
    value,
  })
}

const changeRPMValue = value => dispatch => {
  dispatch({
    type: 'CHANGE_RPM_VALUE',
    value,
  })
}

const changeTempValue = value => dispatch => {
  dispatch({
    type: 'CHANGE_TEMP_VALUE',
    value,
  })
}

export default {
  hideModal,
  setTime,
  changeStartValue,
  changeStopValue,
  changeRPMValue,
  changeTempValue,
}
