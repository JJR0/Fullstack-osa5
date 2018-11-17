import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders all content', () => {
    const blog = {
      title: 'otsikko',
      author: 'tekijä',
      likes: 5
    }
    
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const blogDiv = blogComponent.find('.blog')
    const likesDiv = blogComponent.find('.likes')
    
    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    
    expect(likesDiv.text()).toContain(blog.likes)
  })
})