import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
	// if (req.user) {
	// 	res.redirect("/profile");
	// }
	res.render("loginpage");
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
	console.log("User authenticated:", req.user);
	res.redirect("/");
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

export default router;
