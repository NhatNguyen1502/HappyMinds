import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
	new GoogleStrategy(
		{
			clientID: "890832700702-j95a4ia6o56d4ad1e6op8hf19ssm5e2v.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:3000/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log("profile", profile);
			console.log("accessToken", accessToken);
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			}

			const userInfor = {
				googleId: profile.id,
				email: profile.emails[0].value,
				name: profile.displayName,
			};
			console.log("Before add to DB: ", userInfor);

			const user = await User.insertMany(userInfor);
			console.log("created user ", user);

			done(null, user);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});
