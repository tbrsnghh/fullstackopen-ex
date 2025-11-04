const _ = require('lodash')

const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : 
  blogs.reduce((sum, item) => {
    return sum += item.likes;
  },0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const mostLiked = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  })
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // group theo author rồi đếm
  const authors = _.countBy(blogs, 'author') // tác giả + số bài viết
  const topAuthor = _.maxBy(Object.keys(authors), (author) => authors[author])

  return {
    author: topAuthor,
    blogs: authors[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // groupBy + sumBy
  const grouped = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.map(grouped, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes'),
  }))
  const topAuthor = _.maxBy(authorsWithLikes, 'likes')
  return topAuthor
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}