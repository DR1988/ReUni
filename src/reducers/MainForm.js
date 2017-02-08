const initialstate = {
  showEditModal: false,
}

export default function mainForm(state = initialstate, action) {
  switch (action.type) {
   /*
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
      */

    case 'SHOW_EDIT_MODAL':
      return {
        ...state,
        showEditModal: true,
        id: action.id,
      }

    case 'HIDE_EDIT_MODAL':
      return {
        ...state,
        showEditModal: false,
      }

    default:
      return state
  }
}
