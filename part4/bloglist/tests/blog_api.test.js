const { initialBlogs } = require('./data.test.js')

const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { log } = require('node:console')

// before 
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// start test
describe('Test blogs', () => {
  // --- 4.8 GET /api/blogs ---
  test('[4.8] blogs are returned as json and correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  // --- 4.9 id field ---
  test('[4.9] unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.notStrictEqual(blog.id, undefined)
    assert.strictEqual(blog._id, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})