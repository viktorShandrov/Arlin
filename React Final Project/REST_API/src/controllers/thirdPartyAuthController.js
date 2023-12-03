
const router = require("express").Router()
const session = require('express-session');

const passport = require('passport');
const {facebookAppId, facebookAppSecret,GoogleClientId,GoogleClientSecret} = require("../utils/utils");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


passport.use(new GoogleStrategy({
    clientID: GoogleClientId,
    clientSecret: GoogleClientSecret,
    callbackURL: 'http://localhost:3000/thirdPartyAuth/validate-google-user',
}, (token, tokenSecret, profile, done) => {
    // Custom logic to handle the user profile returned by Google
    return done(null, profile);
}));
// Passport initialization

// Facebook authentication strategy
router.use(session({
    secret: 'dfgdllksdjflskdjflksdjflsJHKJHKJHKJHKJHKJJ', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session()); // Use if you need persistent sessions
// Twitter authentication strategy


// Serialize and deserialize user functions for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes for authentication
router.post('/validate-facebook-user', passport.authenticate('facebook-token'), (req, res) => {
    // If the token is valid, req.user will contain the user information
    res.json({ user: req.user });
});
router.post('/validate-google-user', passport.authenticate('google'), (req, res) => {
    // If the token is valid, req.user will contain the user information
    console.log("dddddd")
    res.json({ user: req.user });
});











module.exports = router