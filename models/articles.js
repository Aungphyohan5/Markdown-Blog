const mongoose = require('mongoose')
const marked = require('marked')  // convert text to HTML
const slugify = require('slugify') // URL friendly ( to change ugly id to title name)
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        require: true,
        unique: true
    }
})
// Run this function before CRUD - it will set title name for slug
// pre-validation middleware 
//  checks if an article's title exists, and if it does
// generates a URL-friendly "slug" from the title and assigns it 
articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model('article', articleSchema)