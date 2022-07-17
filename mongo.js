const mongoose = require('mongoose')

const password = process.argv[2]

const mongoUrl = 
    `mongodb+srv://fullstack:${password}@cluster0.3fxqm.mongodb.net/blogListApp?retryWrites=true&w=majority`
    

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
    
Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connect(mongoUrl)
})
