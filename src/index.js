import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { route } from './routes/index.js';
import { connect } from './config/db/index.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './app/services/passport.js';
import handlebars from 'handlebars';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;
console.log(port);

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
handlebars.registerHelper('isEqual', function (value1, value2, options) {
    return value1 === value2 ? options.fn(this) : options.inverse(this);
});
handlebars.registerHelper(
    'isSelected',
    function (currentValue, targetValue, options) {
        return currentValue === targetValue ? 'selected' : '';
    },
);

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            subtract: (a,b) => a - b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat',
        cookie: { maxAge: 1 * 60 * 60 * 1000 },
    }),
);

app.use(passport.authenticate('session'));
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, name: user.name, email: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// Routes init
route(app);

// Connect to DB
connect();

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
