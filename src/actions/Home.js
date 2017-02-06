import { HOME_REQUEST } from './../constants/Home'
// var ip = location.origin;

const homeLoad = () =>
  (dispatch) => {
    dispatch({ type: HOME_REQUEST })
  }

export default homeLoad
