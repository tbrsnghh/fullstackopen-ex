const { initialBlogs } = require('./data.test.js')

const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token = null
// before 
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ 
    username: 'root', 
    name: 'Admin',
    passwordHash 
  })
  const savedUser = await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secret' })

  token = loginResponse.body.token

  const blogObjects = initialBlogs.map(blog => new Blog({ ...blog, user: savedUser._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
  // --- 4.10 POST /api/blogs ---
  test('[4.10] a valid blog can be added', async () => {
    const newBlog = {
      title: 'Async/await simplifies making unit tests',
      author: 'Full Stack Open',
      url: 'https://fullstackopen.com/',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert.ok(titles.includes(newBlog.title))
  })
  // --- 4.11 likes default to 0 ---
  test('[4.11] if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Test Blog without likes',
      author: 'Anonymous',
      url: 'https://test.com/'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })
  // --- 4.12 missing title or url returns 400 ---
  test('[4.12] blog without title or url returns 400 Bad Request', async () => {
    const blogWithoutTitle = {
      author: 'Anonymous',
      url: 'https://test.com/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)
  })
})

describe("When sending a delete request, i want to test", () => {
  test("that if id is valid, status is 204", async () => {
    const results = await api.get("/api/blogs");
    const firstBlog = await results.body[0];
    // console.log(firstBlog.id);

    await api.delete(`/api/blogs/${firstBlog.id}`).set('Authorization', `Bearer ${token}`).expect(204);

    const result = await api.get("/api/blogs");
    const blogsRecieved = await result.body;

    assert.strictEqual(blogsRecieved.length, initialBlogs.length - 1);

    const contents = blogsRecieved.map((r) => r.title);

    assert.ok(!contents.includes(firstBlog.title));
  });
});

describe("When updating a blog", () => {
  test("that the updated likes property is equal 21", async () => {
    const results = await api.get("/api/blogs");
    const content = await results.body;
    const idToUpdate = content[0].id;

    const updateLikes = { likes: 21 };

    const updatedNote = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updateLikes)
      .expect(200);

    assert.strictEqual(updatedNote.body.likes, 21);
  });
});

after(async () => {
  await mongoose.connection.close()
})