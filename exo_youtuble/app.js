var express = require('express');
var mongoose = require('mongoose');
var model = require("./model/model");
var url = "mongodb+srv://ghost:ghost@cluster0.ze3p1kn.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)
.then((res) => {
    console.log("mongodb connected !");
    app.listen(8080);
}).catch((err)=> {
    throw err;
})
var app = express();


app.set('view engine','ejs');
app.set('views','./');
app.use(express.static("./"));
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.render("Home");
});
app.get('/add',(req,res)=>{
    res.render("add")
});
app.get("/contact",(req,res)=>{
    res.render("Contact");
});
app.get('/blogs/:id',(req,res)=>{
    const blog = model.findById(req.params.id).then((result)=>{
        console.log(result);
        res.render('blog_detail',{blog:result});
    }).catch((err)=>{
        res.redirect("/404");
        console.log(err);
    });
});
app.get("/blogs",(req,res)=>{
    const blogs =  model.find().then((result)=>{
        console.log(result)
        res.render("Blogs",{blogs:result});
    }).catch((err)=>{
        console.log(err);
    });
});
app.delete('/blog/:id',(req,res)=>{
    const blog = model.findByIdAndDelete(req.params.id).then((result)=>{
        return res.json({redirect:'/blogs'});
    })
    .catch((err)=>{
        res.redirect("/404");
        console.log(err);
    })
})
app.post("/blogs",(req,res)=>{
   const blogs = new model(req.body);
   blogs.save().then((result)=>{
       res.redirect('/blogs');
   }).catch((err)=>{
       console.log(err);
   })
});
app.use((red,res)=>{
    res.render('404-page');
});
/* BlogRoute:
    const express = require('express');
    const routes = express.Router();
    importer le package utiliser dans blogroutes comme le model 
    routes.get()......
    module.export = routes

    Liason dans app:
    var blogroute = require('Blogroute');
    app.use(blogroute);


    Pour les controller oon creer un fichier controller dans laqulle on met les fonction qui vont gerer les requetes:
    const get_index = (res,req)=>{});
    et le fichier app on faire app.get('url',controller.get_index)
    tout en exportant controllers avec un module.export = {get_index,get_blog,get_contacts,...} et de pourvoi l'appeller depuis le fichiers app
*/ 