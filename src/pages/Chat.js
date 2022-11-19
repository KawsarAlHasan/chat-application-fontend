import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'
import Signup from '../pages/Signup'

function Chat() {
  const user = useSelector((state) => state.user)
  if (!user) {
    return (
      <>
        <Signup />
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
