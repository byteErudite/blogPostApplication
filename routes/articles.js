const { response } = require('express')
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (request, response) => {
    response.render('article_views/new', {article: new Article()})
})

router.get('/:id',async (request, response) => {
    const article = await Article.findById(request.params.id)
    if( article==null) response.redirect('/')
    response.render('article_views/show', {article: article})
})

router.post('/',async (request, response) => {
    let article = new Article({
        title: request.body.title,
        description: request.body.description,
        markdown: request.body.markdown
    })
    console.log(article)
    try {
        article = await article.save()
        response.redirect(`/article_views/${article.id}`)
    } catch (error) {
        console.log(article)
        console.log(error)
        response.render('article_views/new', {article: article})
        
    }
   
})
module.exports = router