const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articlesRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost:27017/markdownBlog')

app.set('view engine', 'ejs');    //  to use EJS template engine
app.use(express.urlencoded({ extended: false })) // to access the input from article form 
app.use('/articles', articlesRouter) // "/articles" will be routed to the articlesRouter


app.get('/', async (req, res) => {
    // sort({ createdAt: 'desc' }) newer article at the top and oldest article at the bottom
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.listen(3000, console.log('server started'))