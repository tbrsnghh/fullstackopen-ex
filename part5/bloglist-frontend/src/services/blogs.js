import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create }