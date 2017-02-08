import React from 'react'

const EditModal = (props) => <div className="cover">
  <div className="edit-modal">
    <div className="parts inputs">
      <input type="text" placeholder="Start time" />
    </div>
    <div className="parts inputs">
      <input type="text" placeholder="End time" />
    </div>
    <div className="parts">
      <button className="btn btn-success">Accept</button>
    </div>
    <div className="parts">
      <button
        className="btn btn-warning"
        onClick={props.decline}
      >Decline</button>
    </div>
  </div>
</div>

EditModal.propTypes = {
  scale: React.PropTypes.number,
}

export default EditModal
