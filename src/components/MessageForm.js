import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AppContext } from '../context/appContext'
import './MessageForm.css'

function MessageForm() {
  const [message, setMessage] = useState('')
  const user = useSelector((state) => state.user)
  const {
    socket,
    currentRoom,
    messages,
    setMessages,
    privateMemberMsg,
  } = useContext(AppContext)
  const messageEndRef = useRef(null)
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function getFormattedDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()

    month = month.length > 1 ? month : '0' + month
    let day = date.getDate().toString()

    day = day.length > 1 ? day : '0' + day

    return day + '/' + month + '/' + year
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const todayDate = getFormattedDate()

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages)
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!message) return
    const today = new Date()
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    const time = today.getHours() + ':' + minutes
    const roomId = currentRoom
    socket.emit('message-room', roomId, message, user, time, todayDate)
    setMessage('')
  }

  return (
    <div>
      <div className="userInfo">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info text-center">
            You are in the <span className="fw-bold">{currentRoom}</span> room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                <img
                  src={privateMemberMsg.picture}
                  className="conversation-profile-pic"
                  alt="no internet"
                />
                <span className="fw-bold display-7 ms-2">
                  {privateMemberMsg.name}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="messages-output">
        {messages.map(({ _id: date, messagesByDate }, idx) => (
          <div key={idx}>
            <p className="alert alert-info text-center message-date-indicator">
              {date}
            </p>
            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
              <div
                className={
                  sender?.email === user?.email ? 'message' : 'incoming-message'
                }
                key={msgIdx}
              >
                <div className="message-inner">
                  <div className="d-flex align-items-center">
                    <img
                      src={sender.picture}
                      style={{
                        width: 27,
                        height: 27,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginRight: 10,
                      }}
                      alt="sender "
                    />
                    <p className="message-sender">
                      {sender._id === user?._id ? 'You' : sender.name}
                    </p>
                  </div>
                  <p className="message-content">{content}</p>
                  <p className="message-timestamp-left">{time}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10} md={11}>
            <Form.Control
              type="text"
              placeholder="Your message..."
              value={message}
              style={{ width: '100%' }}
              onChange={(e) => setMessage(e.target.value)}
            ></Form.Control>
          </Col>
          <Col xs={2} md={1}>
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

// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Button, Col, Form, Row } from 'react-bootstrap'
// import { useSelector } from 'react-redux'
// import { AppContext } from '../context/appContext'
// import { useSignupUserMutation } from '../services/appApi'
// import './MessageForm.css'

// function MessageForm() {
//   const [message, setMessage] = useState('')
//   const user = useSelector((state) => state.user)
//   const {
//     socket,
//     currentRoom,
//     messages,
//     setMessages,
//     privateMemberMsg,
//   } = useContext(AppContext)
//   const messageEndRef = useRef(null)
//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   function getFormattedDate() {
//     const date = new Date()
//     const year = date.getFullYear()
//     let month = (1 + date.getMonth()).toString()

//     month = month.length > 1 ? month : '0' + month
//     let day = date.getDate().toString()

//     day = day.length > 1 ? day : '0' + day

//     return day + '/' + month + '/' + year
//   }

//   function scrollToBottom() {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const todayDate = getFormattedDate()

//   socket.off('room-messages').on('room-messages', (roomMessages) => {
//     setMessages(roomMessages)
//   })

//   // image upload states
//   const [signupUser] = useSignupUserMutation()
//   const [image, setImage] = useState(null)
//   const [uploadingImg, setUploadingImg] = useState(false)
//   const [imagePreview, setImagePreview] = useState(null)

//   function validateImg(e) {
//     const file = e.target.files[0]

//     if (file) {
//       if (file.size >= 1048576) {
//         return alert('Max file size is 1 MB')
//       } else {
//         setImage(file)
//         setImagePreview(URL.createObjectURL(file))
//         console.log('file', file)
//       }
//     }
//   }

//   async function uploadImage() {
//     const data = new FormData()
//     data.append('file', image)
//     data.append('upload_preset', 'v3hakopx')
//     try {
//       setUploadingImg(true)
//       let res = await fetch(
//         'https://api.cloudinary.com/v1_1/daizkkv04/image/upload',
//         {
//           method: 'post',
//           body: data,
//         },
//       )
//       const urlData = await res.json()
//       setUploadingImg(false)
//       return urlData.url
//     } catch (error) {
//       setUploadingImg(false)
//       console.log(error)
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()
//     const url = await uploadImage(image)
//     console.log(url)
//     if (!message) return
//     const today = new Date()
//     const minutes =
//       today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
//     const time = today.getHours() + ':' + minutes
//     const roomId = currentRoom
//     socket.emit('message-room', roomId, message, user, time, todayDate)
//     setMessage('')
//   }

//   return (
//     <div>
//       <div className="userInfo">
//         {user && !privateMemberMsg?._id && (
//           <div className="alert alert-info text-center">
//             You are in the <span className="fw-bold">{currentRoom}</span> room
//           </div>
//         )}
//         {user && privateMemberMsg?._id && (
//           <>
//             <div className="alert alert-info conversation-info">
//               <div>
//                 <img
//                   src={privateMemberMsg.picture}
//                   className="conversation-profile-pic"
//                   alt="no internet"
//                 />
//                 <span className="fw-bold display-7 ms-2">
//                   {privateMemberMsg.name}
//                 </span>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="messages-output">
//         {messages.map(({ _id: date, messagesByDate }, idx) => (
//           <div key={idx}>
//             <p className="alert alert-info text-center message-date-indicator">
//               {date}
//             </p>
//             {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
//               <div
//                 className={
//                   sender?.email === user?.email ? 'message' : 'incoming-message'
//                 }
//                 key={msgIdx}
//               >
//                 <div className="message-inner">
//                   <div className="d-flex align-items-center">
//                     <img
//                       src={sender.picture}
//                       style={{
//                         width: 27,
//                         height: 27,
//                         objectFit: 'cover',
//                         borderRadius: '50%',
//                         marginRight: 10,
//                       }}
//                       alt="sender "
//                     />
//                     <p className="message-sender">
//                       {sender._id === user?._id ? 'You' : sender.name}
//                     </p>
//                   </div>
//                   <p className="message-content">{content}</p>
//                   <p className="message-timestamp-left">{time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//         <div ref={messageEndRef}></div>
//       </div>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col xs={10} md={11}>
//             <div className="d-flex flex-row">
//               <label htmlFor="image-upload" className="image-icon">
//                 <i class="fas fa-image fa-2xl"></i>
//               </label>
//               <input
//                 type="file"
//                 id="image-upload"
//                 hidden
//                 accept="image/png, image/jpg, image/jpeg"
//                 onChange={validateImg}
//               />
//               <Form.Control
//                 type="text"
//                 placeholder="Your message..."
//                 value={message}
//                 style={{ width: '100%' }}
//                 onChange={(e) => setMessage(e.target.value)}
//               ></Form.Control>
//             </div>
//           </Col>
//           <Col xs={2} md={1}>
//             <Button variant="success" type="submit" style={{ width: '100%' }}>
//               <i className="fas fa-paper-plane"></i>
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   )
// }

// export default MessageForm
