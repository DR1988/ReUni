import React from 'react'
import './style.scss'

const Validation = () => <div className="component">
  <div className="content">
    <ul>
      {this.props.messages.map((elem, i) => <li key={i}>
        <span className="text-danger">
          <strong>{elem}</strong>
        </span>
      </li>)}
    </ul>
  </div>
</div>

Validation.defaultProps = {
  messages: [],
}

export default Validation
