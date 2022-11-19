import React from 'react'
import './MessageForm.css'
import { Button, Col, Form, Row } from 'react-bootstrap'

function MessageForm() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div>
      <div className="messages-output"></div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Control
              type="text"
              placeholder="Your Message.."
            ></Form.Control>
          </Col>
          <Col md={1}>
            <Button variant="success" type="submit" style={{ width: '100%' }}>
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default MessageForm
