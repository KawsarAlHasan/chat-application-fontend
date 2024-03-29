import React, { useState } from 'react'
import './Signup.css'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useSignupUserMutation } from '../services/appApi'
import { Link, useNavigate } from 'react-router-dom'
import nobody from '../assets/nobody.png'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init'

function Signup() {
  const [fUser] = useAuthState(auth)
  let fEmail = fUser.email
  let setFEmail
  const [email, setEmail] = (useState('')[(fEmail, setFEmail)] = useState(''))
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [signupUser, { isLoding, error }] = useSignupUserMutation()

  // image upload states
  const [image, setImage] = useState(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  function validateImg(e) {
    const file = e.target.files[0]
    if (file.size >= 1048576) {
      return alert('Max file size is 1 MB')
    } else {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage() {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'v3hakopx')
    try {
      setUploadingImg(true)
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/daizkkv04/image/upload',
        {
          method: 'post',
          body: data,
        },
      )
      const urlData = await res.json()
      setUploadingImg(false)
      return urlData.url
    } catch (error) {
      setUploadingImg(false)
      console.log(error)
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    if (!image) return alert('Please upload your profile picture')
    const url = await uploadImage(image)
    console.log(url)
    // signup the user
    signupUser({ name, email, fEmail, password, picture: url }).then(
      ({ data }) => {
        if (data) {
          console.log(data)
          navigate('/chat')
        }
      },
    )
  }

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create Account</h1>
            <div className="signup-profile-pic__container">
              <img
                src={imagePreview || nobody}
                alt="nobody"
                className="signup-profile-pic"
              />
              <label htmlFor="image-upload" className="">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpg, image/jpeg"
                onChange={validateImg}
              />
            </div>
            {error && <p className="alert alert">{error.data}</p>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImg || isLoding
                ? 'Signing you up...'
                : 'Create Account'}
            </Button>
            <div className="d-none">
              <Form.Control
                type="email"
                onChange={(e) => setFEmail(e.target.value)}
                value={fEmail}
              />
            </div>
            <div className="py-4">
              <p className="text-center">
                Already have an account?{' '}
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

export default Signup
