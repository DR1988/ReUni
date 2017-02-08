const initialstate = {
  showModal: false,
}

export default function modal(state = initialstate, action) {
  console.log(action.type)
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true,
        id: action.id,
      }

    case 'HIDE_MODAL':
      return {
        ...state,
        showModal: false,
        id: action.id,
      }

    default:
      return state
  }
}
