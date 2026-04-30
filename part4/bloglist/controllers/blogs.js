const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = express.Router()
const jwt = require('jsonwebtoken')
const { request } = require('../app')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  blogs.forEach(blog => {
    blog.id = blog._id.toString()
    delete blog._id
    delete blog.__v
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  // 4.17 + 4.18
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = req.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog(req.body)
  
  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'title and url are required' })
  }

  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  if (user) {
    blog.user = user._id
  }
  const savedBlog = await blog.save()
  // 4.17 + 4.18
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})
// [4.13]
blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete the blog' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
// [4.14]
blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter
