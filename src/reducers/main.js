import mainTypes from './../constants/Main'

const initialState = [
  { id: 0 },
]

export default function mainState(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case mainTypes.ADD_INPUT_FOREMER:
      // console.log(state)
      return [
        ...state,
        { id: action.id },
      ]


    default:
      return state
  }
}
