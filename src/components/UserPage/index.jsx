import React, { Component } from 'react'

class UserPage extends Component {
  constructor() {
    super()
    this.state = {
      src: '',
    }
  }

  render() {
    return (
      <div >
        <form>
          <input name="photos" type="file" />
          <button>load</button>
        </form>
      </div>
    )
  }
}

export default UserPage
