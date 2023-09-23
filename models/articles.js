const mongoose = require('mongoose')
const marked = require('marked'); // convert text to HTML..used v3.0.7
const slugify = require('slugify') // URL friendly ( to change ugly id to title name)
const createDomPurify = require('dompurify')  // used to sanitize and clean HTML content, removing potentially unsafe or malicious code
const { JSDOM } = require('jsdom')  // for dompurify
const dompurify = createDomPurify(new JSDOM().window) // to clean and make HTML content safe

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
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
    if (this.markdown) {
        // marked(this.markdown) - create html
        // dompurify.sanitize - santize the html
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})



module.exports = mongoose.model('article', articleSchema)