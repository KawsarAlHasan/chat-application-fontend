import React, { useContext, useEffect } from 'react'
import { Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap'
import { AppContext } from '../context/appContext'
import { useDispatch, useSelector } from 'react-redux'
import { addNotifications, resetNotifications } from '../features/userSlice'
import './Sidebar.css'

function Sidebar() {
  const dispatch = useDispatch()
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    privateMemberMsg,
    setPrivateMemberMsg,
    rooms,
    setRooms,
  } = useContext(AppContext)
  const user = useSelector((state) => state.user)

  function joinRoom(room, isPublic = true) {
    socket.emit('join-room', room)
    setCurrentRoom(room)

    if (isPublic) {
      setPrivateMemberMsg(null)
    }
    dispatch(resetNotifications(room))
  }

  socket.off('notifications').on('notifications', (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room))
  })

  function getRooms() {
    fetch('https://chat-application-server-k4ks.onrender.com/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data))
  }

  useEffect(() => {
    if (user) {
      setCurrentRoom('General')
      getRooms()
      socket.emit('join-room', 'General')
      socket.emit('new-user')
    }
  }, [])

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload)
  })

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member)
    const roomId = orderIds(user._id, member._id)
    joinRoom(roomId, false)
  }

  return (
    <div>
      <InputGroup size="sm" className="my-3">
        <Form.Control
          placeholder="search person.."
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>

      <div className="slideber-scroll">
        <ListGroup>
          {members.map((member) => (
            <ListGroup.Item
              key={member.id}
              style={{ cursor: 'pointer' }}
              active={privateMemberMsg?._id === member?._id}
              onClick={() => handlePrivateMemberMsg(member)}
              disabled={member._id === user._id}
            >
              <Row>
                <Col xs={2} className="member-status">
                  <img
                    src={member.picture}
                    className="member-status-img"
                    alt="user"
                  />
                  {member.status === 'online' ? (
                    <i className="fas fa-circle sidebar-online-status"></i>
                  ) : (
                    <i className="fas fa-circle sidebar-offline-status"></i>
                  )}
                </Col>
                <Col className="d-none d-md-block" sm={9}>
                  {member.name}
                  {member._id === user?._id && ' (You)'}
                  {member.status === 'offline' && ' (offline)'}
                </Col>
                <Col xs={1}>
                  <span className="badge rounded-pill bg-primary">
                    {user.newMessages[orderIds(member._id, user._id)]}
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="d-sm-block d-none">
        <h2 className="d-flex">
          <span className="d-none d-lg-block me-1">Discussion</span>
          <span className="text-danger"> Rooms</span>
        </h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => joinRoom(room)}
              active={room === currentRoom}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {room}{' '}
              {currentRoom !== room && (
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[room]}
                </span>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default Sidebar
