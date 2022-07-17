const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'hans',
        author: 'zimmers',
        url: 'inception.com',
        likes: '100',
    },
    {
        title: 'peanuts',
        author: 'snoopy',
        url: 'snoopyRocks.co',
        likes: "81",
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB,
    usersInDb,
}