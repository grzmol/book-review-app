const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE, {useNewUrlParser: true});


const { User } = require('./models/user')
const { Book } = require('./models/book');


app.use(bodyParser.json());
app.use(cookieParser());

// GET //
app.get('/api/getBook', (req,res) =>{
    let id = req.query.id;
    Book.findById(id, (err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    }) 
})

app.get('/api/books', (req,res)=>{
    // localhost:3001/api/books?skip=0&limit=2&order=asc
 
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;


    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,books)=>{
        if(err) return res.status(400).send(err);
        res.send(books);
    })
})


app.get('/api/user/getById', (req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,user) =>{
        if(err) return res.status(404).send(err);

        res.status(200).json({
            name: user.name,
            lastName: user.lastname
        })
    })
})

app.get('/api/users', (req,res)=>{
    User.find({},(err,users) =>{
        if(err) return res.status(404).send(err);

        res.send(users);
    })
})

// POST //
app.post('/api/book', (req,res) =>{
    const book = new Book(req.body)

    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
    
        res.status(200).json({
            post:true,
            bookId: doc._id
        })
    })
})


app.post('/api/user/register', (req,res)=>{
    const user = new User(req.body);

    user.save((err, doc)=>{
        if(err) return  res.json({
            success:false
        });

        res.status(200).json({
            success:true,
            user:doc
        })
    })
})



app.post('/api/user/login', (req, res) => {
 
    User.findOne({'email': req.body.email}, (err,user) =>{
        if(!user) return res.status(404).json({
            isAuth:false,
            message: "Auth failed, email not found."
        });

        user.comparePassword(req.body.password, (err, same) =>{
            
            if(!same) return res.status(400).json({
                    isAuth:false,
                    message: "Wrong password."
            });


            user.generateToken((err, user) =>{
                if(err) return res.status(400).send(err);

                res.cookie('auth', user.token).json({
                    isAuth:true,
                    id: user._id,
                    email:user.email
                });
            })
        })
    })
});

// UPDATE //

app.post('/api/book_update', (req,res) =>{
    Book.findByIdAndUpdate(req.body._id,req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);

        res.json({
            success:true,
            doc
        })
    })
})


// DELETE //
app.delete('/api/delete_book', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true);
    })
});


// ---
const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log('Server running...')
});

