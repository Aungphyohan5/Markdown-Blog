const express = require('express')
const mongoose = require('mongoose')
const articlesRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost:27017/markdownBlog')

app.set('view engine', 'ejs');
// to access the input from article form - urlencoded
app.use(express.urlencoded({ extended: false }))
app.use('/articles', articlesRouter)


app.get('/', (req, res) => {
    const articles = [{
        title: "Testing title 1",
        createdAt: new Date(),
        description: "test description 1"
    },
    {
        title: "Testing title 2",
        createdAt: new Date(),
        description: "test description 2"
    }
    ]
    res.render('articles/index', { articles: articles })
})

app.listen(3000, console.log('server started'))