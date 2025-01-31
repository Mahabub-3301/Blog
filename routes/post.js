const express = require('express');
const routes = express.Router();
const postschema = require('../models/posts');

routes.get('/',async (req,res)=>{
    try{
        const posts = await postschema.find();
        res.render('index',{posts});
    }
    catch(err){
        console.log(err);
        res.status(500).send("server Error!");
    }
});

routes.get('/new',(req,res)=>{
    res.render('new');
});

routes.post('/',async (req,res)=>{
    try{
        const {title,content} = req.body;
        await postschema.create({title , content});
        res.redirect('/posts');
    }
    catch(err){
        console.error(err);
        res.render('new',{error : 'Failed to create Post'});
    }
});

routes.get('/:id',async (req,res)=>{
    try{
        const post = await postschema.findById(req.params.id);
        res.render('show', {post});
    }catch(err){
        console.error(err);
        res.redirect('/posts');
    }
});

routes.get('/:id/edits',async (req,res)=>{
    try{
        const post = await postschema.findById(req.params.id);
        res.render('edit',{post});
    }catch(err){
        console.error(err);
        res.redirect('/posts');
    }
});

routes.put('/:id',async (req,res)=>{
    try{
        const {title , content} = req.body;
        await postschema.findByIdAndUpdate(req.params.id);
        res.redirect(`/posts/${req.params.id}`);
    }catch(err){
        console.error(err);
        res.redirect('/posts');
    }
});

routes.delete('/:id', async (req, res)=>{
    try{
        await postschema.findByIdAndDelete(req.params.id);
        res.redirect('/post');

    }catch(err){
        console.error(err);
        res.redirect('/posts');
    }
});


module.exports = routes;