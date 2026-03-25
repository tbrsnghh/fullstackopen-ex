
// --- Bài 4.9: Kiểm tra thuộc tính 'id' (thay vì _id) ---


// --- Bài 4.10: Kiểm tra POST /api/blogs ---
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/await simplifies making unit tests',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert.ok(titles.includes('Async/await simplifies making unit tests'))
})

// --- Bài 4.11: Kiểm tra 'likes' mặc định là 0 ---
test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Test Blog without likes',
    author: 'Anonymous',
    url: 'https://test.com/'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

// --- Bài 4.12: Kiểm tra thiếu title hoặc url trả về 400 Bad Request ---
test('blog without title or url returns 400 Bad Request', async () => {
  const blogWithoutTitle = {
    author: 'No Title',
    url: 'https://notitle.com/'
  }

  const blogWithoutUrl = {
    title: 'No URL blog',
    author: 'No URL'
  }

  await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
})