import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Main from './containers/Main'
import Graph from './containers/Graph'
import UserPage from './components/UserPage'

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/graph" component={UserPage} />
    </Route>
  </div>
)

export default routes
