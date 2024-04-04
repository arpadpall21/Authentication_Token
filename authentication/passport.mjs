import passport from 'passport';
import Strategy from 'passport-local';
// const validPassword = require('../lib/passwordUtils').validPassword;

// left of here (2024-04-04) the plan is to implement a file storage and also a db storage solution 
passport.use(new Strategy.LocalStrategy((username, password, done) => {

    // User.findOne({ username: username })
    //     .then((user) => {

    //         if (!user) { return done(null, false) }
            
    //         const isValid = validPassword(password, user.hash, user.salt);
            
    //         if (isValid) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false);
    //         }
    //     })
    //     .catch((err) => {
    //         done(err);
    //     });

}));







passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
