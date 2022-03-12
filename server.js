require('dotenv').config();
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const path = require('path')

/**
 * Imports
 */
const UserRouter = require('./routes/user.router');

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());
app.use('/', UserRouter)
app.use(express.static(path.join(__dirname, 'public')))


// var opts = {}
// opts.jwtFromRequest = function (req) { // tell passport to read JWT from cookies
//     var token = null;
//     if (req && req.cookies) {
//         token = req.cookies['jwt']
//     }
//     return token
// };
// opts.secretOrKey = 'secret';


// // main authentication, our app will rely on it
// use(new JwtStrategy(opts, function (jwt_payload, done) {
//     console.log("JWT BASED AUTH GETTING CALLED") // called everytime a protected URL is being served
//     if (CheckUser(jwt_payload.data)) {
//         return done(null, jwt_payload.data)
//     } else {
//         // user account doesnt exists in the DATA
//         return done(null, false)
//     }
// }))

// use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/google/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//         //console.log(accessToken, refreshToken, profile)
//         console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
//         return done(null, profile)
//     }
// ));

// // These functions are required for getting data To/from JSON returned from Providers
// serializeUser(function (user, done) {
//     console.log('I should have jack ')
//     done(null, user)
// });
// deserializeUser(function (obj, done) {
//     console.log('I wont have jack shit')
//     done(null, obj)
// });




// app.get('/', (req, res) => {
//     res.sendFile('home.html', {
//         root: __dirname + '/public'
//     })
// })
// app.get('/login', (req, res) => {
//     res.sendFile('login.html', {
//         root: __dirname + '/public'
//     })
// })

// // OAuth Authentication, Just going to this URL will open OAuth screens
// // app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
// app.get('/auth/google', passport.authenticate('google', {
//     scope: [
//         'https://www.googleapis.com/auth/userinfo.profile',
//         'https://www.googleapis.com/auth/userinfo.email',
//         'https://www.googleapis.com/auth/user.phonenumbers.read',
//         'https://www.googleapis.com/auth/user.addresses.read',
//         'https://www.googleapis.com/auth/profile.agerange.read'
//     ]
// }))


// // Authenticating with email-password
// app.get('/auth/email', (req, res) => {
//     res.sendFile('login_form.html', {
//         root: __dirname + '/public'
//     })
// })

// app.post('/auth/email', (req, res) => {
//     if (CheckUser(req.body)) {
//         let token = jwt.sign({
//             data: req.body
//         }, 'secret', {
//             expiresIn: '1h'
//         }); // expiry in seconds or duration strings
//         res.cookie('jwt', token)
//         res.send(`Log in success ${req.body.email}`)
//     } else {
//         res.send('Invalid login credentials')
//     }
// })

// // This url will only open, if the user is signed in
// app.get('/profile', passport.authenticate('jwt', {
//     session: false
// }), (req, res) => {
//     res.send(`Wellcome user ${req.user.email}`)
// })

// // Oauth user data comes to these redirectURLs
// app.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     console.log('redirected', req.user)
//     let user = {
//         displayName: req.user.displayName,
//         name: req.user.name.givenName,
//         email: req.user._json.email,
//         provider: req.user.provider,
//         phone: req.user.phone
//     }
//     console.log(user)

//     FindOrCreate(user)
//     let token = jwt.sign({
//         data: user
//     }, 'secret', {
//         expiresIn: '1h'
//     }); // expiry in seconds
//     res.cookie('jwt', token)
//     res.redirect('/')
// })



// // Utility functions for checking if a user exists in the DATA array - Note: DATA array is flushed after every restart of server
// function FindOrCreate(user) {
//     if (CheckUser(user)) { // if user exists then return user
//         return user
//     } else {
//         DATA.push(user) // else create a new user
//     }
// }

// function CheckUser(input) {
//     console.log(DATA)
//     console.log(input)
//     for (var i in DATA) {
//         if (input.email == DATA[i].email && (input.password == DATA[i].password || DATA[i].provider == input.provider)) {
//             console.log('User found in DATA')
//             return true // found
//         } else
//             null
//         //console.log('no match')
//     }
//     return false // not found
// }


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Sever listening on port ${port}`)
})