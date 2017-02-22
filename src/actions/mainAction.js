import mainTypes from './../constants/Main'

// const ip = location.origin

const addInputFormer = (id) => dispatch => {
  dispatch({
    type: mainTypes.ADD_INPUT_FOREMER,
    id,
  })
}

const setValues = values => dispatch => {
  // console.log(values)
  dispatch({
    type: 'SET_VALUES',
    values,
  })
}

const resetForm = () => dispatch => {
  dispatch({
    type: 'RESET_FORM',
  })
}

const mainActions = {
  addInputFormer,
  setValues,
  resetForm,
}

export default mainActions
