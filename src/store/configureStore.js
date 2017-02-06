import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

// const nextRootReducer = require('../reducers').default

export default function configureStore() {
  const store = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore)(rootReducer)
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () =>
  //     // nextRootReducer.rootReducer,
  //     store.replaceReducer(rootReducer)
  //   )
  // }
  return store
}
