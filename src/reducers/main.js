import mainTypes from './../constants/Main'

const initialState = [
  { id: 0 },
]

export default function mainState(state = initialState, action) {
  switch (action.type) {
    case mainTypes.ADD_INPUT_FOREMER:
      return state

    default:
      return state
  }
}
