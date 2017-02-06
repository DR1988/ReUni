import { graphTypes } from '../constants/Graph'

const clearRequests = () => (dispatch) => {
  dispatch({
    type: graphTypes.CLEAR_REAQUESTS,
    payload: {
      userToAdd: null,
      removeRequestFrom: null,
      userToRemove: null,
    },
  })
}

export default clearRequests
