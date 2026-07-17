import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loginUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loginUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotification({ message: 'Wrong credentials', type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loginUser')
        setUser(null)
    }

    // ✨ SỬA Ở ĐÂY: Hàm nhận trực tiếp blogObject từ BlogForm gửi lên
    const handleCreateBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject)

            // Cập nhật state danh sách bài viết
            setBlogs(blogs.concat(returnedBlog))

            // Bắn thông báo thành công
            setNotification({
                message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
                type: 'success'
            })
            setTimeout(() => setNotification(null), 5000)
        } catch (exception) {
            setNotification({ message: 'Failed to create a new blog', type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>login</h2>
                <Notification notification={notification} />
                <form onSubmit={handleLogin}>
                    <div>
                        username:
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password:
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h1>Hi {user.name}!</h1>
            <button onClick={handleLogout}>logout</button>
            <Notification notification={notification} />
            
            {/* Truyền hàm handleCreateBlog xuống component con */}
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App