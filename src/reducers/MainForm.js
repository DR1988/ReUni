import setLineFormer from './../helpers/setLineFormer.js'

const initialstate = {
  showEditModal: false,
  allTime: 930,
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      changes: [{ startTime: 0, endTime: 10, id: 0 },
               { startTime: 20, endTime: 130, id: 1 },
               { startTime: 220, endTime: 930, id: 2 }] },
    { name: 'ValveLine',
      id: 1,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 2,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 3,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 4,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 5,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 6,
      changes: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 7,
      changes: [{ startTime: 0, endTime: 100, id: 0 },
               { startTime: 150, endTime: 230, id: 1 }] },
    { name: 'RPMSetter',
      ShortName: 'S',
      id: 8,
      changes: [{ startTime: 0, endTime: 150, value: 1000 }] },
    { name: 'TempSetter',
      ShortName: 'T',
      id: 9,
      changes: [{ startTime: 0, endTime: 120, value: 15 },
                { startTime: 130, endTime: 220, value: 25 }] },
  ],
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
          value: action.value + 0,
        }
      })

    case 'DECREASE_VALUE_BY_ONE':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }
        return {
          ...inputNum,
          value: action.value - 0,
        }
      })

    case 'INCREASE_VALUE_BY_TEN':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }

        return {
          ...inputNum,
          value: action.value + 0,
        }
      })

    case 'DECREASE_VALUE_BY_TEN':
      return state.map(inputNum => {
        if (inputNum.id !== action.id) {
          return inputNum
        }

        return {
          ...inputNum,
          value: action.value - 0,
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

    case 'SET_LINE_VALUES':
      if (action.payload.stop > state.allTime) {
        return {
          ...state,
          allTime: state.allTime + (action.payload.stop - state.allTime),
          lineFormer: setLineFormer(state, action),
        }
      }
      return {
        ...state,
        lineFormer: setLineFormer(state, action),
      }

    case 'SET_VALUES':
      return {
        ...state,
        ...action.values,
        showEditModal: false,
      }

    default:
      return state
  }
}
