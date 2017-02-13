import mainTypes from './../constants/Main'

// const ip = location.origin

const addInputFormer = (id) => dispatch => {
  dispatch({
    type: mainTypes.ADD_INPUT_FOREMER,
    id,
  })
}

const mainActions = {
  addInputFormer,
}

export default mainActions
