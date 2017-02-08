const hideModal = (id) => dispatch => {
  dispatch({
    type: 'HIDE_MODAL',
    id,
  })
}

export default {
  hideModal,
}
