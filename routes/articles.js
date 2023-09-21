const express = require('express')
const Article = require('../models/articles')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() }) //used to create a new article when the page is loaded.
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/show', { article: article })
    if (article == null) redirect('/')
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e)
        res.render('articles/new', { article: article })
    }

})

module.exports = router