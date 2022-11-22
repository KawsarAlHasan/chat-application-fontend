import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
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
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
