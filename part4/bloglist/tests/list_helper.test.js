const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
const listWithManyBlogs = [
  {
    _id: '1',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '2',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 5,
    __v: 0,
  },
  {
    _id: '3',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 12,
    __v: 0,
  },
]
// dummy returns one
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// total likes
describe('total likes', () => {
  test('of empty list ois zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 24)
  })
})
// 4.5 favorite blog
describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has only one blog, returns that blog', () => {
    const oneBlog = [listWithManyBlogs[0]]
    const result = listHelper.favoriteBlog(oneBlog)
    assert.deepStrictEqual(result, {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('of a bigger list is the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})
// 4.6 & 4.7 mostLikedBlog
const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://example.com',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://example.com',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://example.com',
    likes: 2,
  },
]

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('when list has blogs, returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    assert.deepStrictEqual(result, expected)
  })
})
describe('most likes', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('when list has blogs, returns author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17, // 5 + 12
    }
    assert.deepStrictEqual(result, expected)
  })
})
