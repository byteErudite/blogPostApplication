const { response } = require('express');
const mongoose = require('mongoose')
const express = require('express');
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();
app.set('view engine', 'ejs')
const articles = [{
    title: 'My first article',
    createdAt: new Date(),
    description: 'testing articles'
},
{
    title: 'My second article',
    createdAt: new Date(),
    description: 'testing articles'
}]


app.use(express.urlencoded({extended: false}))

app.get('/', (requset, response)=> {
    response.render('article_views/index', {articles: articles})
})
app.use('/article_views', articleRouter)
app.listen(5000);
