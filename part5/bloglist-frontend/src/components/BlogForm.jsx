import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const blogObject = {
                title: newTitle,
                author: newAuthor,
                url: newUrl
            }

            // Gọi hàm xử lý của App.jsx và quăng cục data lên
            await createBlog(blogObject)

            // Reset trắng các ô nhập liệu sau khi gửi thành công
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
        } catch (exception) {
            console.error('Error creating blog:', exception)
        }
    }

    return (
        <form onSubmit={handleCreateBlog}>
            <h2>Create Blog</h2>
            <div>
                Title:
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={newTitle} 
                    onChange={({ target }) => setNewTitle(target.value)} 
                />
            </div>
            <div>
                Author:
                <input 
                    type="text" 
                    placeholder="Author" 
                    value={newAuthor} 
                    onChange={({ target }) => setNewAuthor(target.value)} 
                />
            </div>
            <div>
                URL:
                <input 
                    type="text" 
                    placeholder="URL" 
                    value={newUrl} 
                    onChange={({ target }) => setNewUrl(target.value)} 
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm