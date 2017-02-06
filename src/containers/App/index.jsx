import React from 'react'
import NavLink from './../../components/NavLink'

import './style.scss'

const App = (props) => <div className="container">
  <nav className="navbar navbar-default">
    <ul className="nav nav-tabs">
      <li className="">
        <NavLink onlyActiveOnIndex to="/">Main</NavLink>
      </li>
      <li>
        <NavLink to="/graph">Graph</NavLink>
      </li>
    </ul>
  </nav>
  {props.children}
</div>

App.propTypes = {
  children: React.PropTypes.node,
}

export default App
