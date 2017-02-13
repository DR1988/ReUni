const initialstate = {
  showModal: false,
  startTime: 0,
  stopTime: 0,
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

    default:
      return state
  }
}
