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

module.exports = { unknownEndpoint, errorHandler }
