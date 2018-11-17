import React from 'react'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  login = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user: user })
    } catch (exception) {
      console.log(exception)
    }
  }
  
  logout = e => {
    e.preventDefault()
    
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }
  
  createBlog = async (e) => {
    e.preventDefault()
    
    try {
      const newblog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      
      this.setState({
        blogs: this.state.blogs.concat(newblog),
        title: '',
        author: '',
        url: ''
      })
      
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    return (
      <div className='wrapper'>
        {this.state.user !== null ?
          <div className='blogs'>
            <h2>blogit</h2>
            <span>{this.state.user.username} on kirjautunut</span>
            <button onClick={this.logout}>kirjaudu ulos</button>
            <br/>
            <Togglable buttonLabel='uusi blogi'>
              <Blogform
                createBlog={this.createBlog}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleChange={this.handleChange}
                />
            </Togglable>
            <br/>
            {this.state.blogs.map(blog => 
              <Blog key={blog.id} blog={blog}/>
            )}
          </div>
      : <div className='login'>
          <h2>kirjautuminen</h2>
          <form onSubmit={this.login}>
            käyttäjätunnus
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete='off'
              />
            <br/>
            salasana
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete='off'
              />
            <br/>
            <button type='submit'>kirjaudu</button>
          </form>
        </div>
        }
      </div>
    )
  }
}

export default App
