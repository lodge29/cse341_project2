// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

// get port number from .env file
const port = process.env.PORT || 3000;

// week 4 sets up passport object
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  // basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS, PATCH'
  );
  next();
  })
  .use(cors({ methods: ['GET','POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use("/", require("./routes/index.js"));


  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubid: profile.id }, function (err, user) {
  return done(null, profile)
//})
}
));

// week 4 passport serilize
passport.serializeUser((user, done) => {
  done(null, user);
});
// week 4 passport deserialize
passport.deserializeUser((user, done) => {
  done(null, user);
});

// week 4
app.get('/', (req, res) => {res.send(req.session.user !== undefined ? 'Logged in as ${req.session.user.displayName}' : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
failureRedirect: '/api-docs', session: false}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

/*
// api header
app.use(bodyParser.json());
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
);
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
next();
});
*/

// routing
app.use('/', require('./routes'));

// catch any errors
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, 'Caught exception: ${err}\n' + 'Exception onrigin: ${origin}');
})

// err if Mongodb doesn't listen
mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log('DATABASE MONGO is listening and NODE running on PORT ' + port)});
  }
});