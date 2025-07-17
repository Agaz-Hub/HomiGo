const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/users.js");
const { route } = require("./listing.js");

router.route("/")
    .get((req, res, next) => {
        res.redirect("/listings");
    })

router.route("/signup")
    .get( reviewController.renderSignupForm)
    .post( wrapAsync(reviewController.signup));

router.route("/login")
    .get(reviewController.renderLoginForm)
    .post(
        saveRedirectUrl, 
        passport.authenticate("local",{
            failureRedirect: "/login",
            failureFlash: true
        }),
        reviewController.login
    );

router.get("/logout", reviewController.logout);

module.exports = router;