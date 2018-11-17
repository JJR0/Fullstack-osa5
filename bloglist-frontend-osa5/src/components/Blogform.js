import React from 'react'
import PropTypes from 'prop-types'

const Blogform = (props) => {
  const { createBlog, title, author, url, handleChange } = props

  return (
    <div>
      <h3>luo uusi blogi</h3>
      <form onSubmit={createBlog}>
        otsikko
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
          />
        <br/>
        tekijä
        <input
          type='text'
          name='author'
          value={author}
          onChange={handleChange}
          />
        <br/>
        url
        <input
          type='text'
          name='url'
          value={url}
          onChange={handleChange}
          />
        <br/>
        <button type='submit'>luo</button>
      </form>
    </div>
  )
}

Blogform.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired
}

export default Blogform