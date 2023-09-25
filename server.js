require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articlesRouter = require('./routes/articles')
const methodOverride = require('method-override')  //method-override middleware
const app = express()
const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/markdownBlog');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/markdownBlog', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.set('view engine', 'ejs');    //  to use EJS template engine
app.use(express.urlencoded({ extended: false })) // to access the input from article form 
app.use(methodOverride('_method')) // "_method" to override the standard GET and POST methods.
// to use PUT and DELETE HTTP methods for actions like updating and deleting resources within web applications, even when HTML forms primarily support GET and POST methods.

app.use('/articles', articlesRouter) // "/articles" will be routed to the articlesRouter


app.get('/', async (req, res) => {
    // sort({ createdAt: 'desc' }) newer article at the top and oldest article at the bottom
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})