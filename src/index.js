import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { route } from "./routes/index.js";
import { connect } from "./config/db/index.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./app/models/User.js";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./app/services/passport.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template engine
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
		},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongoUrl: process.env.MONGO_URL }),
	})
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

// used to serialize the user for the session
// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// used to deserialize the user
// passport.deserializeUser((id, done) => {
// 	User.findById(id, (err, user) => done(err, user));
// });

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: "http://localhost:3000/",
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			console.log("profile", profile);
// 			//get the user data from google
// 			const newUser = {
// 				googleId: profile.id,
// 			};

// 			console.log("1111", newUser);

// 			try {
// 				//find the user in our database
// 				let user = await User.findOne({ googleId: profile.id });

// 				if (user) {
// 					//If user present in our database.
// 					done(null, user);
// 				} else {
// 					// if user is not preset in our database save user data to database.
// 					user = (await User.create(newUser)).save();
// 					done(null, user);
// 				}
// 			} catch (err) {
// 				console.error(err);
// 			}
// 		}
// 	)
// );

// Routes init
route(app);

// Connect to DB
connect();

app.listen(port, () => {
	console.log(`App listening on port http://localhost:${port}`);
});
