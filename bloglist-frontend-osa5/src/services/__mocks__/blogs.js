let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: 'Helppo Heikki',
    url: 'url',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }