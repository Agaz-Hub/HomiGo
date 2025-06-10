const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingsController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn,upload.single("listing[imageFile]"), validateListing, listingsController.createListing);
    // .post(upload.single("listing[imageFile]"), (req, res) => {
    //     console.log(req.body);
    //     res.send(req.file);
    // });


router.get("/new", isLoggedIn, listingsController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingsController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[imageFile]"), validateListing, wrapAsync(listingsController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingsController.destroyListing));

router.get("/:id/edit", isLoggedIn, wrapAsync(listingsController.renderEditForm));

module.exports = router;