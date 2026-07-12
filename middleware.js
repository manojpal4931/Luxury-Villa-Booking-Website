const Listing = require("./classroom/models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema,reviewSchema } = require("./schema");
// const {validateReview}  =require("./middleware.js");
const Review = require("./classroom/models/review");
module.exports.isLoggedIn = (req,res,next)=>{

console.log(req.path,"..", req.originalUrl);
 if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    //redirectUrl save
        req.flash("error","you must be logged in to create listing!");
       return res.redirect("/login");
    }
next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner =async(req,res,next) =>{
       const { id } = req.params;
         let listing  = await Listing.findById(id);
             if (!listing.owner._id.equals(res.locals.currUser._id)) {
    //   if(!listing.owner && listing.owner._id.equals(res.locals.currUser._id)){
       req.flash("error","you are not owner of this listing");
      return res.redirect(`/listings/${id}`);
      }
      next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body, { convert: true });

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};



module.exports.isReviewAuthor =async(req,res,next) =>{
       const {id, reviewId } = req.params;
         let review  = await Review.findById(reviewId);
             if (!review.author.equals(res.locals.currUser._id)) {
    //   if(!listing.owner && listing.owner._id.equals(res.locals.currUser._id)){
       req.flash("error","you are not author of this review");
      return res.redirect(`/listings/${id}`);
      }
      next();
};


