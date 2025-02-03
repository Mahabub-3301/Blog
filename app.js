const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const postRoute = require('./routes/post');



const port = process.env.PORT || 3999 ;
const Mongo_url = process.env.Mongo_url ;


mongoose.connect(Mongo_url,{usenewURLParser : true}).then(()=>{
    console.log("Mongo DB is Connected");
}).catch(err=> console.error(err));

app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/posts',postRoute);

app.get('/',(req, res)=>{
    res.redirect('/posts');
});

app.listen(port,()=>{console.log(`server listening on http://localhost:${port}`)});

const methodoverride = require('method-override');
app.use(methodoverride('_method'));
