import React from 'react'
import './style.scss'

const EditModal = (props) => <div className="edit-modal">
    <div className="flex-item inputs">
        <input type="text" placeholder="Start time"/>
    </div>
    <div className="flex-item inputs">
        <input type="text" placeholder="End time"/>
    </div>
    <div className="flex-item">
        <button>Accept</button>
    </div>
    <div className="flex-item">
        <button>Decline</button>
    </div>
</div>

EditModal.propTypes = {
  scale: React.PropTypes.number,
}

export default EditModal