const express = require('express')
const { FindOrCreate, CheckUser } = require('../util/varifyAndCreateUser')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy


const UserRouter =  express.Router();

UserRouter.get('/', (req, res) => {
    res.render('home')
})
UserRouter.get('/login', (req, res) => {
    res.render('login')
})

// OAuth Authentication, Just going to this URL will open OAuth screens
// UserRouter.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
UserRouter.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/profile.agerange.read'
    ]
}))


// // Authenticating with email-password
// UserRouter.get('/auth/email', (req, res) => {
//     res.render('login_form')
// })

UserRouter.post('/auth/email', (req, res) => {
    if (CheckUser(req.body)) {
        let token = jwt.sign({
            data: req.body
        }, 'secret', {
            expiresIn: '1h'
        }); // expiry in seconds or duration strings
        res.cookie('jwt', token)
        res.send(`Log in success ${req.body.email}`)
    } else {
        res.send('Invalid login credentials')
    }
})

// This url will only open, if the user is signed in
UserRouter.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.send(`Wellcome user ${req.user.email}`)
})

// Oauth user data comes to these redirectURLs
UserRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('redirected', req.user)
    let user = {
        displayName: req.user.displayName,
        name: req.user.name.givenName,
        email: req.user._json.email,
        provider: req.user.provider,
        phone: req.user.phone
    }
    console.log(user)

    FindOrCreate(user)
    let token = jwt.sign({
        data: user
    }, 'secret', {
        expiresIn: '1h'
    }); // expiry in seconds
    res.cookie('jwt', token)
    res.redirect('/')
})



module.exports = UserRouter;