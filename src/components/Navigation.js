import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { useLogoutUserMutation } from '../services/appApi'

function Navigation() {
  const user = useSelector((state) => state.user)
  const [logoutUser] = useLogoutUserMutation()
  async function handleLogout(e) {
    e.preventDefault()
    await logoutUser(user)
    window.location.replace('/')
  }

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            💖Love <span className="text-danger">Message❤️</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && [
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup1">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </>,
            ]}
            {!user && [
              <LinkContainer to="/chat">
                <Nav.Link>Chat</Nav.Link>
              </LinkContainer>,
            ]}
            {user && [
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                      alt="no internet"
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item className="d-grid gap-2">
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>,
            ]}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
