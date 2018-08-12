import React from 'react'

const Loginform = ({ login, username, password, handleLoginChange}) => {
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
            onChange={handleLoginChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleLoginChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Loginform