const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  // 4.16
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  console.error(error.message)
  next(error)
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}
const userExtractor = async (request, response, next) => {
  // 1. Tận dụng token đã được bóc tách từ middleware tokenExtractor
  const token = request.token

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (decodedToken.id) {
      // 2. Tìm user trong database và gắn vào request object
      request.user = await User.findById(decodedToken.id)
    }
  }

  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
