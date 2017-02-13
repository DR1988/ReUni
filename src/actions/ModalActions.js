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

export default {
  hideModal,
  setTime,
  changeStartValue,
  changeStopValue,
}
