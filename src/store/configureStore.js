import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

// const nextRootReducer = require('../reducers').default
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const store = composeEnhancers(
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
