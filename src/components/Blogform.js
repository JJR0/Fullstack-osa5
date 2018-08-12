import React from 'react'
import '../App.css'

const Blogform = ({ addBlog, title, author, url, handleFieldChange }) => {
  return (
    <div>
      <h3>create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          author
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          url
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleFieldChange}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default Blogform