import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../firebase.init'
import Loading from '../components/Loading'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import googleImage from '../assets/google.png'

function FirebaseLogin() {
  const [signInWithGoogle, fUser, loading, error] = useSignInWithGoogle(auth)

  const navigate = useNavigate()

  let errorElement

  if (error) {
    errorElement = <div className="text-danger">Error: {error?.message}</div>
  }

  if (fUser) {
    navigate('/signup2')
  }
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: '80%', maxWidth: 500 }}>
            <h1 className="text-center">Create Account</h1>
            <div className="d-grid gap-2">
              {!loading ? (
                <Button
                  onClick={() => signInWithGoogle()}
                  variant="primary"
                  size="lg"
                >
                  <img
                    style={{ width: '50px' }}
                    className="img-fluid px-2"
                    src={googleImage}
                    alt="G logo"
                  />
                  Google sign In
                </Button>
              ) : (
                <Loading />
              )}
              {errorElement}
            </div>
            <div className="py-4">
              <p className="text-center">
                Already have an account?
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  )
}

export default FirebaseLogin
