const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articlesRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost:27017/markdownBlog')

app.set('view engine', 'ejs');
// to access the input from article form - urlencoded
app.use(express.urlencoded({ extended: false }))
app.use('/articles', articlesRouter)


app.get('/', async (req, res) => {
    const articles = await Article.find()
    res.render('articles/index', { articles: articles })
})

app.listen(3000, console.log('server started'))