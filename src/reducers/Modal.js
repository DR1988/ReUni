const initialstate = {
  showModal: false,
  startTime: 0,
  stopTime: 0,
  RPMvalue: 0,
  TempValue: 15,
}

export default function modal(state = initialstate, action) {
  // console.log(action)
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true,
        modalType: action.modalType,
        id: action.id,
      }

    case 'HIDE_MODAL':
      return initialstate
        // ...state,
        // showModal: false,
        // id: action.id,

    case 'CHANGE_START_VALUE':
      return {
        ...state,
        startTime: action.value,
      }

    case 'CHANGE_STOP_VALUE':
      return {
        ...state,
        stopTime: action.value,
      }

    case 'CHANGE_RPM_VALUE':
      return {
        ...state,
        RPMvalue: action.value,
      }

    case 'CHANGE_TEMP_VALUE':
      return {
        ...state,
        TempValue: action.value,
      }

    default:
      return state
  }
}
