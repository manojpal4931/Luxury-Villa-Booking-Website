 const Listing = require("../classroom/models/listing.js");
 
 //index
// =======================
 module.exports.index  =  async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    }


// =======================

    module.exports.renderNewForm =(req,res)=>{
        res.render("listings/new.ejs");
    }


// =======================


    module.exports.showListing =  async (req, res) => {
            const { id } = req.params;
    
            const listing = await Listing.findById(id)
                .populate({
                path:"reviews",
                populate:{
                    path:"author",
                },
            })
                .populate("owner");
    
            if (!listing) {
               req.flash("error","Listing you requested for does not esist!");
               return res.redirect("/listings");
            }
            console.log(listing);
    
            res.render("listings/show", { listing });
        }

// create
// =======================

        module.exports.createListing =  async (req, res) => {
         let url = req.file.path;
         let filename = req.file.filename;
      
        const listingData = { ...req.body.listing };
        if (listingData.image && listingData.image.trim() !== "") {
        listingData.image = {
            url: listingData.image,
            };
        } else {
            delete listingData.image;
        }
               const newListing = new Listing(listingData);
                newListing.owner = req.user._id;
                newListing.image = {url,filename};
                await newListing.save();
                req.flash("success","new Listing Created!");
        
                res.redirect("/listings");
            }


// edit
// =======================


module.exports.renderEditForm  = async (req, res) => {
        const { id } = req.params;

        const listing = await Listing.findById(id);

          if (!listing) {
           req.flash("error","Listing you requested for does not esist!");
           return res.redirect("/listings");
        }

     let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
        res.render("listings/edit", { listing,originalImageUrl });
    }

// update 
// =======================

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };

        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// delete 
// =======================

module.exports.destroyListing  = async (req, res) => {
        const { id } = req.params;

       await Listing.findByIdAndDelete(id);
     
         req.flash("success"," Listing deleted!");

        res.redirect("/listings");
    }

