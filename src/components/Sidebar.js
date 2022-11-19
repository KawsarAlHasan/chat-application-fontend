import React from 'react'
import { ListGroup } from 'react-bootstrap'

function Sidebar() {
  const rooms = ['first room', 'second room', 'third room']

  return (
    <div>
      <h2>Available Rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
    </div>
  )
}

export default Sidebar
