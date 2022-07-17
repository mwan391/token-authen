const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// clear database, and add intial notes before testing
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

// HTTP GET 
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/) // using RegEx 'application/json'
})

test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length);
})

// HTTP POST

test('a blog can be added', async () => {

    const newBlog = {
        title: 'newBlogCheck',
        author: 'anon',
        url: 'anon.web.com',
        likes: '9',
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map(b => b.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain(
        'newBlogCheck'
    )
})

describe('deleting a blog', () => {
    test('suceeds with status 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const title = blogsAtEnd.map(b => b.title)
        expect(title).not.toContain(blogToDelete.title)

    })

})

describe('updating a blog', () => {
    test('suceeds with valid data', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            ...blogToUpdate,
            likes: 0,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect('Content-Type', /application\/json/)
    

        const response = await api.get('/api/blogs')
        const likes = response.body.map(b => b.likes)
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        expect(likes).toContain(
            0
        )
        
    })
})

afterAll(() => {
    mongoose.connection.close()
})

