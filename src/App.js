import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  const user = useSelector((state) => state.user)
  return (
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
  )
}

export default App
