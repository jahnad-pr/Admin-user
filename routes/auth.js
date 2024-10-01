// Bismillah
const express = require('express')
const router = express.Router()
const admin = require('../models/admin')
const session = require('express-session')
const user = require('../models/user')

// static file ande session management
router.use(express.static('public'))
router.use('/auth',express.static('public'))

//Without route
router.get('/',(req,res)=>{ res.redirect('/user/home')})
function isAuthAdmin(req,res,next){
    if(req.session.admin) return res.redirect('/admin/home')
    next()
}
function isUserLoged(req,res,next){
    if(req.session.user)return res.redirect('/user/home')
    next()
}






// Slash auth to login signup admin-Login
router.get('/auth',(req,res)=>{res.redirect('/auth/user')})


// Default router to login signup admin-Login
router.get('/auth/admin',isAuthAdmin, (req, res) => {

    // Cache controll
    res.set('Cache-Control', 'no-store')

    if(req.query.error){ displayError = encodeURIComponent(req.query.error) }
    else{ displayError = null}
    res.render('signLog',{
        client:'admin',
        error:req.query.error,
        adm:true
    })
})

// Default router to login signup admin-Login
router.get('/auth/user',isUserLoged, (req, res) => {

    // Cache controll
    res.set('Cache-Control', 'no-store')

    let displayError = null
    if(req.query.error){ displayError = encodeURIComponent(req.query.error) }
    else{ displayError = null}

    res.render('signLog',{
        client:'user',
        error:req.query.error,
        adm:false
    })

})



// User signUp
router.post('/userSignup', async (req, res) => {
    
    const { name, email, phone, password } = req.body
    try {
        
        const newUser = new user({ fullName: name, email, phone, password })
        await newUser.save()
        res.json({ error: false })
    } catch (error) {res.json({ error: true,errorMessage:'User already exits please try again with New Email or Phone' })}
})


// User logIn
router.post('/userLogin', async (req, res) => { 
    const { dataMain, password, type } = req.body
    if (type === 'email') {
        try {
            const bData = await user.findOne({ email: dataMain, password: password })
            if (bData) {
                req.session.user = { isLoged: true, Uid: bData._id }
                req.session.save(error =>error?res.redirect('/auth/user?error=somthing+went+wrong+with+yout+session+management'):null)
                res.redirect('/user/home')
            } else {
                res.redirect('/auth/user?error=incurrect+password+or+id')
            }
        }catch (error) {
            res.redirect('/auth/user?error=incurrect+password+or+id')
        }
    }
    else {
        try {
            const bData = await user.findOne({ phone: dataMain, password: password })
            if (bData) {
                req.session.user = { isLoged: true, Uid: bData._id }
                req.session.save(error => error?res.redirect('/auth/user?error=somthing+went+wrong+with+yout+session+management'):null)
                res.redirect('/user/home')
            } else {
                res.redirect('/auth/user?error=incurrect+password+or+id')
            }
        } catch (error) {
            res.redirect('/auth/user?error=incurrect+password+or+id')
        }
    }
});


// Admin logIn
router.post('/adminLogin', async (req, res) => {
    res.set('Cache-Control', 'no-store')
    const { email, password } = req.body
    try {
        const aData = await admin.findOne({ email: email, password: password })
        if (aData) {
            req.session.admin = { isLoged: true, Uid: aData._id }
            req.session.save(error => error?res.redirect('/auth/admin?error=somthing+went+wrong+with+yout+session+management'):null)
            res.redirect('/admin/home')
        } else {
            res.redirect('/auth/admin?error=incorrect+adminCode+or+id')
        }
    } catch (error) {
        res.redirect('/auth/admin?error=incurrect+password+or+id')
    }
});


// Export module/rout
module.exports = router;
