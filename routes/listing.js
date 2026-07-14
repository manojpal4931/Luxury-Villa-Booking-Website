const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../classroom/models/listing");
const {isLoggedIn,isOwner,validateListing}  = require("../middleware");
const listing = require("../classroom/models/listing");

const listingController = require("../controllers/listings.js");
const multer =require("multer");
const{storage} = require("../cloudConfig.js")
const upload = multer({storage});




router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
   
    upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.createListing)
);


// NEW ROUTE
// =======================
router.get(
    "/search",
    wrapAsync(listingController.searchListings)
);
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);



router.route("/:id")
.get(listingController.showListing)
.put(
     isLoggedIn,
     isOwner,
       upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
      )
.delete(
    
     isLoggedIn,
     isOwner,
    wrapAsync(listingController.destroyListing)
);


// EDIT ROUTE
// =======================
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);



module.exports = router;