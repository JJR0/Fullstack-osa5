import React from 'react'
import '../App.css'

const Notification = ({ error, newBlog }) => {
  if (error === 'unsuccess') {
    return (
      <div className='error'>
        username or password invalid
      </div>
    )
  } else if (error === 'success') {
    return (
      <div className='success'>
        a new blog '{newBlog.title}' by {newBlog.author} added
      </div>
    )
  } else {
    return null
  }
}

export default Notification