import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch (exception) {
      this.setState({ error: 'unsuccess' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000);
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.setState({ 
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: '',
        error: 'success'
      })

      setTimeout(() => {
        this.setState({ error: null })
      }, 3000);

    } catch (exception) {
      console.log('exception: ', exception)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification error={this.state.error} />
          <Togglable buttonLabel='login'>
            <Loginform 
              login={this.login}
              username={this.state.username}
              password={this.state.password}
              handleFieldChange={this.handleFieldChange}
              />
            </Togglable>
        </div>
      )
    }

    return (
      <div>
        <Notification error={this.state.error} newBlog={this.state.blogs[this.state.blogs.length-1]}/>
        {this.state.user.username} is logged in
        <button id='logout-button' onClick={this.logout}>log out</button>
        <p/>
        <Blogform
          addBlog={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleFieldChange={this.handleFieldChange}
          />
        <p/>

        <h3>all blogs</h3>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
