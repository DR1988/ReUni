const initialstate = {
  showEditModal: false,
  allTime: 0,
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      valves: [{ startTime: 0, endTime: 10, id: 0 },
               { startTime: 20, endTime: 130, id: 1 },
               { startTime: 220, endTime: 930, id: 2 }] },
    { name: 'ValveLine',
      id: 1,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 2,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 3,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 4,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 5,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 6,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'ValveLine',
      id: 7,
      valves: [{ startTime: 0, endTime: 0, id: 0 }] },
    { name: 'RPMSetter', ShortName: 'S', id: 8, startTime: 0, endTime: 0, RPMvalue: 0 },
    { name: 'TempSetter', ShortName: 'T', id: 9, startTime: 0, endTime: 0, TempValue: 0 },
  ],
}

export default function mainForm(state = initialstate, action) {
  // console.log(action)
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

    case 'SET_TIME':
      // console.log(action)
      if (action.seTtime.stop > state.allTime) {
        return {
          ...state,
          allTime: state.allTime + (action.seTtime.stop - state.allTime),
          lineFormer: state.lineFormer.map(changeElem => {
            if (changeElem.id !== action.id) {
              return changeElem
            }
            changeElem.valves.push(
              { endTime: +action.seTtime.stop,
                startTime: +action.seTtime.start,
                id: action.id,
              }
            )
            return {
              ...changeElem,
              // startTime: action.seTtime.start,
              // endTime: action.seTtime.stop,
            }
          }),
        }
      }
      return {
        ...state,
        lineFormer: state.lineFormer.map(changeElem => {
          if (changeElem.id !== action.id) {
            return changeElem
          }
          changeElem.valves.push(
            { endTime: +action.seTtime.stop,
              startTime: +action.seTtime.start,
              id: action.id,
            }
          )
          return {
            ...changeElem,
            // startTime: action.seTtime.start,
            // endTime: action.seTtime.stop,
          }
        }),
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
