import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'
import { useState } from 'react'
import { AppContext, socket } from './context/appContext'

function App() {
  const user = useSelector((state) => state.user)

  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState({})
  const [newMessages, setNewMessages] = useState({})

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        setMessages,
        messages,
        setPrivateMemberMsg,
        privateMemberMsg,

        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && [
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>,
          ]}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
