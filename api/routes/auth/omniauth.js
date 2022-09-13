const User = require("../../schemas/user");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const FortyTwoStrategy = require('passport-42').Strategy;
const bcrypt = require("bcrypt");









passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


//------------------------------------------------------------
//************************************************************
//                          GITHUB
//************************************************************
//------------------------------------------------------------

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {

  User.findOne( { omniauthId: profile.id }, async(err, user) => {

    if (err) return done(err);

    const userData = {
      omniauthId: profile.id,
      lastname: profile._json.name ? profile._json.name.toLowerCase() : '',
      firstname: profile._json.name ? profile._json.name.toLowerCase() : '',
      username: profile._json.username ? profile._json.username.toLowerCase() : '',
      email: profile._json.email ? profile._json.email.toLowerCase() : '',
      image: profile._json.avatar_url ? profile._json.avatar_url : `https://avatars.dicebear.com/api/initials/${profile._json.username ? profile._json.username : 'GH'}.svg`
    }

    if (!user) {

      const emailExistence = await User.findOne({ email: profile._json.email ? profile._json.email.toLowerCase() : '' });
      if (!emailExistence) {

        user = new User(userData);

        await user.save(function(err) {
          if (err) {
            console.log(err);
            return done(null, false, { error: err.message });
          }
          return done(err, user);
        })

      }
      else {
        User.findOneAndUpdate({ email: profile._json.email.toLowerCase() }, userData, err => { if (err) console.log(err); });
        return done(err, user);
      }

    }
    else {
      User.findOneAndUpdate({ omniauthId: user.omniauthId }, userData, err => { if (err) console.log(err); });
      return done(err, user);
    }

  } );

}));


router.get("/github", passport.authenticate("github", { scope: ["user"] }));

router.get( "/github/callback",
passport.authenticate("github", { failureRedirect: "http://localhost:3000/login?error=true" }),
async (req, res) => {

    const omniauthId = res.req.user.omniauthId;
    const getAccessKey = await bcrypt.hash(process.env.ACCESS_KEY, 10);
    res.redirect(`http://localhost:3000/oauth?id=${omniauthId}&key=${getAccessKey}`);

});





//------------------------------------------------------------
//************************************************************
//                          42
//************************************************************
//------------------------------------------------------------

passport.use(new FortyTwoStrategy({
  clientID: process.env.FORTYTWO_APP_ID,
  clientSecret: process.env.FORTYTWO_APP_SECRET,
  callbackURL: process.env.FORTYTWO_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {

  User.findOne( { omniauthId: profile.id }, async(err, user) => {

    if (err) return done(err);
    
    const userData = {
      omniauthId: profile.id,
      lastname: profile.name.familyName ? profile.name.familyName.toLowerCase() : '',
      firstname: profile.name.givenName ? profile.name.givenName.toLowerCase() : '',
      username: profile.username ? profile.username.toLowerCase() : '',
      email: profile.emails[0].value ? profile.emails[0].value.toLowerCase() : '',
      image: profile.photos[0].value ? profile.photos[0].value : `https://avatars.dicebear.com/api/initials/${profile.username ? profile.username : 'FT'}.svg`
    }

    if (!user) {

      const emailExistence = await User.findOne({ email: profile.emails[0].value ? profile.emails[0].value.toLowerCase() : '' });
      if (!emailExistence) {

        user = new User(userData);
        await user.save(function(err) {
          if (err) {
            console.log(err);
            return done(null, false, { error: err.message });
          }
          return done(err, user);
        })

      }
      else {
        User.findOneAndUpdate({ email: profile.emails[0].value.toLowerCase() }, userData, err => { if (err) console.log(err); });
        return done(err, user);
      }

    }
    else {
      User.findOneAndUpdate({ omniauthId: user.omniauthId }, userData, err => { if (err) console.log(err); });
      return done(err, user);
    }

  } );

}));


router.get('/42', passport.authenticate('42'));

router.get('/42/callback',
passport.authenticate('42', { failureRedirect: 'http://localhost:3000/login?error=true' }),
async (req, res) => {

  const omniauthId = res.req.user.omniauthId;
  const getAccessKey = await bcrypt.hash(process.env.ACCESS_KEY, 10);
  res.redirect(`http://localhost:3000/oauth?id=${omniauthId}&key=${getAccessKey}`);

});



module.exports = router;