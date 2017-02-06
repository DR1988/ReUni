import { HOME_REQUEST, HOME_PAGE_GETTING_SUCCESS } from './../constants/Home'

const initialState = {
  gettingHomePage: false,
}

export default function HomeState(state = initialState, action) {
  switch (action.type) {
    case HOME_REQUEST:
      // TODO
      return {
        ...state,
        gettingHomePage: true,
      }
    case HOME_PAGE_GETTING_SUCCESS:
      return {
        ...state,
        gettingHomePage: false,
      }

    default:
      return state
  }
}
