import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { route } from './routes/index.js';
import { connect } from './config/db/index.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import './app/services/passport.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongoUrl: process.env.MONGO_URL }),
    }),
);

app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Routes init
route(app);

// Connect to DB
connect();

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
