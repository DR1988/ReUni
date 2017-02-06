import graphTypes from '../constants/Graph.js'

const initialState = {
  isFetching: false,
  isPresent: false,
  isAuthenticated: true,
}

export default function graphState(state = initialState, action) {
  switch (action.type) {
    case graphTypes.LOGIN_REQUEST:
      // TODO
      return {
        ...state,
        gettingUser: true,
        loginError: action.payload.errors,
      }

    case graphTypes.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        isAuthenticated: action.payload.isAuthenticated,
        gettingUser: action.payload.gettingUser,
      }

    case graphTypes.LOGIN_INVALID:
      return {
        ...state,
        gettingUser: false,
        loginError: action.payload.errors.error,
        loginValid: action.payload.errors.valid,
      }

    case graphTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        gettingUser: false,
        loginError: action.payload.errors,
      }

    case graphTypes.LOGOUT_SUCCESS:
      // TODO
      return state

    case graphTypes.REGISTER_SUCCES:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isFetching: false,
      }

    case graphTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case graphTypes.REGISTER_FAIL:
      return {
        ...state,
        // isAuthenticated: action.payload.isAuthenticated,
        isFetching: false,
        isPresent: action.payload.isPresent,
        name: action.payload.name,
        error: action.payload.error,
      }

    case graphTypes.REREGISTER_REQUEST:
      return {
        ...state,
        isPresent: action.payload.isPresent,
      }

    case graphTypes.REGISTER_INVALID:
      return {
        ...state,
        error: action.payload.error.error,
        valid: action.payload.error.valid,
        isFetching: false,
      }
    case graphTypes.ADD_REQUEST:
      return {
        ...state,
        removeRequestFrom: null,
        userToAdd: action.payload.userToAdd,
      }

    case graphTypes.REMOVE_REQUEST:
      return {
        ...state,
        userToAdd: null,
        removeRequestFrom: action.payload.removeRequestFrom,
      }

    case graphTypes.REMOVE_SUCCES:
      return {
        ...state,
        userToAdd: null,
        removeRequestFrom: null,
        userToRemove: action.payload.userToRemove,
      }

    case graphTypes.ADD_COMPLETE:
      return state

    case graphTypes.CLEAR_REAQUESTS:
      return {
        ...state,
        userToAdd: action.payload.userToAdd,
        removeRequestFrom: action.payload.removeRequestFrom,
        userToRemove: action.payload.userToRemove,
      }

    default:
      return state
  }
}
