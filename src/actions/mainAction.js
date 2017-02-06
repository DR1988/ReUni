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

/* export const getSearched = (value) => (dispatch) => {
  dispatch({
    type: searchTypes.SEARCH_REQUEST,
    payload: {
      value,
    },
  })
  // 10.99.44.106
  if (value) {
    fetch(`${ip}/getFiltred/${value}`).then(res => {
      res.json().then(friends => dispatch({
        type: searchTypes.SEARCH_REQUEST_COMPLETE,
        payload: {
          friends,
          searching: false,
        },
      }))
    })
  } else {
    dispatch({ type: searchTypes.RESET_SEARCH })
  }
}

export const resetSearch = () =>


  (dispatch) => {
    dispatch({ type: searchTypes.RESET_SEARCH })
  }*/
