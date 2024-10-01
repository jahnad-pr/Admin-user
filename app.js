// Bismillah

const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const session = require('express-session')
const mongoose = require('mongoose')
const mongoStore = require('connect-mongo')

// setlement of view Engine
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

//convert data into jso to resposeObject
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// session controll
app.use(session({
    secret: 'in your env file',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/myApp',
        collectionName: 'Session'
    }),
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000
    }
}))


// Connect Mongo
mongoose.connect('mongodb://localhost:27017/myApp')
    .catch(error => console.log(error))


// Middlewires
app.use('/', require('./routes/auth'))
app.use('/admin', require('./routes/admin'))
app.use('/user', require('./routes/user'))


// Posrt to run server
const PORT = process.env.PORT || 3333
app.listen(PORT, info => console.log('server satrted in PORT ',PORT))