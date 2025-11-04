import _ from 'lodash';

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
const mostLikedBlog = _.maxBy(blogs, 'likes');
module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikedBlog
}