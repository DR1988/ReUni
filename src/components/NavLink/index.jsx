import React from 'react'
import { Link } from 'react-router'

import './style.scss'

const NavLink = (props) =>
  <Link {...props} activeClassName="active" />

export default NavLink
