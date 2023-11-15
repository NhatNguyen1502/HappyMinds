import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { route } from './routes/index.js';
import { connect } from './config/db/index.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import User from './app/models/User.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY],
    }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/',
        },
        (profile, done) => {
            // Check if google profile exist.
            if (profile.id) {
                User.findOne({ googleId: profile.id }).then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        User.create({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                        })
                            .save()
                            .then((user) => done(null, user))
                            .catch((err) => console.log(err));
                    }
                });
            }
        },
    ),
);

// Routes init
route(app);

// Connect to DB
connect();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
