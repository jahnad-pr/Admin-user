// Bismillah
const express = require('express')
const router = express.Router()
const session = require('express-session')
const user = require('../models/user')

// Basic settlements and middlewers
router.use(express.static('public'))

// middleware to check session
router.use((req, res, next) => {
    if (req.session.admin?.isLoged) return next()
    res.redirect('/auth/admin')
})




// adminHome
router.get('/home', (req, res) => {

    // Cache Manage
    res.set('Cache-Control', 'no-store')
    res.render('adminHome')
})
router.get('/', (req, res) => res.redirect('/auth/admin'))



//Get all UserDat from Database
router.get('/allUserData', async (req, res) => {
    try {
        const allUserData = await user.find({})
        res.json({error:false, data: allUserData })
    } catch (error) { res.json({ error: true,errorMessage:'failed to find users, Try again' }) }
})


// Update Userdata
router.patch('/updateUser', async (req, res) => {
    const { name, phone, email, password, filterData } = req.body
    try {
        await user.findOneAndUpdate({ email: filterData }, { email: email, fullName: name, phone: phone, password: password })
        const allUserData = await user.find({})
        res.json({ error: false, data: allUserData })
    } catch (error) { res.json({ error: true, errorMessage: 'Unable to update, Try again' })}
})


// Delete Userdata
router.delete('/deleteUser', async (req, res) => {
    const { UID } = req.body
    try {
        await user.findOneAndDelete({ _id: UID })
        const data = await user.find({})
        res.json({ error: false, data: data })
    } catch (error) {res.json({ error: true, errorMessage: 'failed to delete user, Try again' })}
})


// Create Userdata
router.post('/createUser', async (req, res) => {
    const { name, email, phone, password } = req.body
    try {
        const newUser = new user({ fullName: name, email, phone, password })
        await newUser.save()
        const userNewData = await user.find({})
        res.json({ errory: false, data: userNewData })
    } catch (error) {res.json({ error: true,errorMessage:'Unable to create user, please try again' })}
})


// Serach userdata
router.post('/searchUserData', async (req, res) => {
    const inputValue = req.body.inputValue
    const reqex = new RegExp(inputValue, 'i')
    try {
        const searchData = await user.find({ fullName: reqex })
        res.json({error:false, searchData })
    } catch (error) {res.json({error:true,errorMessage:'Failed search data, please try aain'})}
})


// Admin logout
router.get('/logout', (req, res) => {
    if(req.session.admin){
        try {
            delete req.session.admin
            res.clearCookie('connect.cid')
            res.redirect('/auth/admin')
        } catch (error) {
            res.redirect('/auth/admin?error=somthing+went+wrong')
        }
    }
})


// Export Router
module.exports = router;

