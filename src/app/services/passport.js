import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '127442511146-55kmda41bhtr23er1gpbpr11h5rn9ape.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('profile', profile);
            console.log('accessToken', accessToken);
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const userInfor = {
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
            };
            console.log('Before add to DB: ', userInfor);

            const user = await User.insertMany(userInfor);
            console.log('created user ', user);

            done(null, user);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
