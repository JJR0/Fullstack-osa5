import React from 'react'
import '../App.css'

const Loginform = ({ login, username, password, handleFieldChange}) => {
  return (
    <div>
      <h3>login</h3>
      <form onSubmit={login}>
        <div>
          username
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleFieldChange}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Loginform