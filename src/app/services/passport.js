import GoogleStrategy from 'passport-google-oidc';
import UserService from './UserService.js';
import passport from 'passport';

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '127442511146-55kmda41bhtr23er1gpbpr11h5rn9ape.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        },
        async function verify(issuer, profile, cb) {
            try {
                console.log(profile);
                const email = profile.emails[0].value;
                let existingUser = await UserService.getUser(email);
                if (existingUser) {
                    return cb(null, existingUser);
                } else {
                    const payload = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    };
                    let newUser = await UserService.createUser(payload);
                    console.log('create user success');
                    return cb(null, newUser);
                }
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    ),
);
