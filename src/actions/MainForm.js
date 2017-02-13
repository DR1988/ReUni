/*
const increaseValue = (value, id,) => dispatch => {
  dispatch({
    type: 'INCREASE_VALUE_BY_ONE',
    value,
    id,
  })
}

const decreaseValue = (value, id) => dispatch => {
  dispatch({
    type: 'DECREASE_VALUE_BY_ONE',
    value,
    id,
  })
}

const increaseByTen = (value, id) => dispatch => {
  dispatch({
    type: 'INCREASE_VALUE_BY_TEN',
    value,
    id,
  })
}

const decreaseByTen = (value, id) => dispatch => {
  dispatch({
    type: 'DECREASE_VALUE_BY_TEN',
    value,
    id,
  })
}

const changeValue = (value, id) => dispatch => {
  dispatch({
    type: 'CHANGE_VALUE',
    value,
    id,
  })
}
*/
const showModal = (modalType) => dispatch => {
  dispatch({
    type: 'SHOW_MODAL',
    modalType,
  })
}

const hideModal = () => dispatch => {
  dispatch({
    type: 'HIDE_MODAL',
  })
}

const setValues = values => dispatch => {
  // console.log(values)
  dispatch({
    type: 'SET_VALUES',
    values,
  })
}

const MainFormAction = {
  showModal,
  hideModal,
  setValues,
}

export default MainFormAction
