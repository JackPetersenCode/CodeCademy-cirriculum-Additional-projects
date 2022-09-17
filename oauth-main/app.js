const express = require('express');
const authRoutes = require('./routes/auth-routes');
//const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const db = require('./queries')
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

//app.use(express.static("views"));

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
//app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.post('/users', db.createUser);

app.listen(3000, () => {
    console.log('listening on 3000');
})