const increaseValue = (value, id, /* inputFormeId*/) => dispatch => {
  dispatch({
    type: 'INCREASE_VALUE_BY_ONE',
    value,
    id,
    // inputFormerId,
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
const showEditModal = (id) => dispatch => {
  console.log(id); //eslint-disable-line
  dispatch({
    type: 'SHOW_EDIT_MODAL',
    id,
  })
}

const MainFormAction = {
  changeValue,
  increaseValue,
  decreaseValue,
  increaseByTen,
  decreaseByTen,
  showEditModal,
}

export default MainFormAction
