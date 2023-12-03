
const router = require("express").Router()
const session = require('express-session');
const passport = require('passport');
const {OAuth2Client} = require('google-auth-library');
const {facebookAppId, facebookAppSecret,GoogleClientId,GoogleClientSecret} = require("../utils/utils");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;



const verifyGoogleCredentials =async (credential)=>{
    const fetch = await import("node-fetch")
    console.log(credential)
    // const data = await fetch.default(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credential.access_token}`)
    // console.log(await data.json())
    const response = await fetch.default(`https://www.googleapis.com/oauth2/v2/userinfo`,{
        headers:{
            Authorization: `OAuth  ya29.a0AfB_byDay4yD0CrNvBoSEjbz3_4XqAbNm-SN1YjoRy7zGVup21Z425j17uYFhXoWjP-WMRd2qsXKDUZL1pRUZHlFMtJxCpH2RyTRluu9u8q4Ye6F9TAkIMexHZwQlwqCR6d-0mus8AevqRNJpC-wlc8Zh_x84dlaJckaCgYKASsSARISFQHGX2MiUvdpVuv_Xzu5SNsHlvdNQA0170`,
        }
    })
    console.log(await response.json())
    // console.log(credential)
    // const client = new OAuth2Client();
    // const ticket = await client.verifyIdToken({
    //     idToken: credential.access_token,
    //     audience: GoogleClientId
    //
    // });
    // const payload = ticket.getPayload();
    // console.log(payload)
    // userId = payload['sub'];
    // email = payload['email']
    // return {email,userId}
}

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
router.post('/validate-google-user', async (req, res) => {
    const credentials = req.body
    await verifyGoogleCredentials(credentials)
    res.end()
});











module.exports = router