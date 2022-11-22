import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div>
      <div class="loading">
        <svg>
          <circle cx="150" cy="150" r="140"></circle>
          <circle cx="150" cy="150" r="100"></circle>
        </svg>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading
