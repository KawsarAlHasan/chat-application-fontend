import React, { useContext, useState } from 'react'
import './Login.css'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import { useLoginUserMutation } from '../services/appApi'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { socket } = useContext(AppContext)
  const [loginUser, { isLoding, error }] = useLoginUserMutation()

  async function handleLogin(e) {
    e.preventDefault()
    // Login the user
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit('new-user')
        // navigate to the chat
        navigate('/chat')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleLogin}>
            <h1 className="text-center">Please Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {error && <p className="alert alert">{error.data}</p>}
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoding ? <Spinner animation="grow" /> : 'Login'}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account?{' '}
                <Link to="/signup1" className="text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
