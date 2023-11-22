import express from "express";
import userController from "../app/controllers/UserController.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import UserService from "../app/services/UserService.js";

const router = express.Router();

passport.use(
	new GoogleStrategy(
		{
			clientID: "127442511146-55kmda41bhtr23er1gpbpr11h5rn9ape.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:3000/auth/google/callback",
			scope: ["email", "profile"],
		},
		async function verify(issuer, profile, cb) {
			try {
				console.log(profile);
				const email = profile.emails[0].value;
				let existingUser = await UserService.getUser(email);
				console.log("user", existingUser);
				if (existingUser) {
					return cb(null, existingUser);
				} else {
					const payload = {
						name: profile.displayName,
						email: profile.emails[0].value,
					};
					let newUser = await UserService.createUser(payload);
					console.log("create user success");
					return cb(null, newUser);
				}
			} catch (err) {
				console.log(err);
				return err;
			}
		}
	)
);

router.get("/", userController.index);

// router.post('/', userController.createVideo);

router.get("/login", function (req, res, next) {
	if (!req.user) {
		res.render("homepage");
	} else {
		res.redirect("/");
	}
});

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

// route logout and clear cookie

export default router;
