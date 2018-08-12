import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user})
    } catch (exception) {
      console.log('kirjautuminen ei onnistunut')
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h3>login</h3>
          <form onSubmit={this.login}>
            <div>
              username
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              password
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        {this.state.user.username} is logged in
        <p/>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
