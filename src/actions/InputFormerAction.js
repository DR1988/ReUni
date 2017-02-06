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

const setValues = values => dispatch => {
  dispatch({
    type: 'SET_VALUES',
    values,
  })
}

export default {
  changeValue,
  increaseValue,
  decreaseValue,
  increaseByTen,
  decreaseByTen,
  setValues,
}
