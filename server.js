const express = require('express')
const articlesRouter = require('./routes/articles')
const app = express()


app.set('view engine', 'ejs');
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