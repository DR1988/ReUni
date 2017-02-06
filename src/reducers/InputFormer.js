const initialState =
  [
    { id: 0, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
  ]

export default function numericInput(state = initialState, action) {
  // console.log(state)
  switch (action.type) {
    case 'INCREASE_VALUE_BY_ONE':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }

        return {
          ...inputNum,
          value: action.value + 1,
        }
      })

    case 'DECREASE_VALUE_BY_ONE':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }
        return {
          ...inputNum,
          value: action.value - 1,
        }
      })

    case 'INCREASE_VALUE_BY_TEN':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }

        return {
          ...inputNum,
          value: action.value + 10,
        }
      })

    case 'DECREASE_VALUE_BY_TEN':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }

        return {
          ...inputNum,
          value: action.value - 10,
        }
      })

    case 'CHANGE_VALUE':
      return state.map(changingNum => {
        if (changingNum.id !== action.id) {
          return changingNum
        }

        return {
          ...changingNum,
          value: action.value,
        }
      })

    case 'SET_VALUES':
      return action.values

    default:
      return state
  }
}
