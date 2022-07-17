const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    const reducer = (prevSum, item) => {
        return prevSum + item
    }

    return blogLikes.reduce(reducer, 0)

    // return blogs.length === 0
    //     ? 0
    //     : blogLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    const mostLikes = Math.max(...blogLikes)
    const index = blogLikes.indexOf(mostLikes)
    const favBlog = blogs[index]
    const {title, author, likes} = favBlog
    return {
        title,
        author,
        likes,
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}