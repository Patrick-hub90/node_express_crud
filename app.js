var express = require('express');
var morgan = require('morgan');
const { nextTick } = require('process');

var app = express();
app.listen(8080);

app.set('view engine','ejs');
app.set('views','./');

//app.use(morgan('dev'));
app.use(morgan('tiny'));
// pour lire les requete poste avect app.post()
app.use(express.static('nomdir_assets'));//pour ajouter des fichiers statics(css,image)
app.get('/',function(req,res){
    res.render('index',{nom:"Paick"});
})
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/con',function(req,res){
    res.render('contact');
})
app.use(function(req,res){
    res.send("<h1>404 page not found");
})