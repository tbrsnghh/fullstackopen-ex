const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  blogs.forEach(blog => {
    blog.id = blog._id.toString()
    delete blog._id
    delete blog.__v
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  
  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'title and url are required' })
  }

  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})
// [4.13]
blogsRouter.delete('/:id', async (req, res) => {
  console.log('ID nhận được:', req.params.id)
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
// [4.14]
blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter
