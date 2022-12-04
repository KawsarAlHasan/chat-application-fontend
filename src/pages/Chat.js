import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'
import Login from './Login'

function Chat() {
  const user = useSelector((state) => state.user)
  if (!user) {
    return (
      <>
        <Login />
      </>
    )
  }
  return (
    <div className="chat-container">
      <Row>
        <Col md={3} xs={2}>
          <Sidebar />
        </Col>
        <Col md={9} xs={10}>
          <MessageForm />
        </Col>
      </Row>
    </div>
  )
}

export default Chat
