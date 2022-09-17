const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../queries')
const keys = require('./keys');


/*const postUser = async(user) => {
    console.log('wwwwwwwwwwwww');
    const url = '/users';
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(user),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    } 
}
*/

passport.serializeUser((user, done) => {
    console.log(user);
    console.log(user.googleid);
    console.log(user);
    done(null, user.googleid);
})

passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, id);
})

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
      
            let user = {
                username: profile.displayName,
                googleid: profile.id
            }
            if (db.checkForUser(user)) {
                console.log(user);
                done(null, user);
            } else {
                db.createUser(user);
                console.log('new user created: ' + user.username);
                done(null, user);
            }
        }
    )
)