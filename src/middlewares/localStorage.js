import { graphTypes } from './../constants/Graph.js'

const changeLocalStorage = store => next => action => { //eslint-disable-line
  console.log('action', action)
  if (action) {
    if (action.type === graphTypes.LOGIN_SUCCESS) {
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
    }
    return next(action)
  }
}

export default changeLocalStorage
