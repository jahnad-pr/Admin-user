// Bismillah
const express = require('express')
const router = express.Router()
const session = require('express-session')
const user = require('../models/user')
const cacheControl = require('express-cache-controller')

// Basic and session setting
router.use(cacheControl())
router.use(express.static('public'))

// middleware to check session
router.use((req, res, next) => {
    if (req.session.user?.isLoged) return next()
    res.redirect('/auth/user')
})




// User Home
router.get('/home', async (req, res) => {

    // Cache controll
    res.set('Cache-Control', 'no-store')
    
    const userData = await user.findOne({ _id: req.session.user.Uid })
    res.render('userHome', {
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone
    })
})


// User logout
router.get('/logout', (req, res) => {

    if(req.session.user){

        try {
            delete req.session.user
            res.clearCookie('connect.cid')
            res.redirect('/auth/user')
        } catch (error) {
            res.redirect('/auth/admin?error=somthing+went+wrong')
        }
    }
})


// Export module
module.exports = router;
