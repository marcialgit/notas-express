const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'mail'
}, async (mail, password, done) => {
    const user = await User.findOne({email: mail})
    if (!user) {
        // done (error, usuario, mensaje(opcional))
        return done(null, false, {message: 'usuario no encontrado'});
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'usuario y contraseña no corresponden'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})