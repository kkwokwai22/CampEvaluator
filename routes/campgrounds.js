var express = require("express");
var router = express.Router(); 
var Campground = require("../models/campground");
var Comment = require("../models/comments");
// var middleware = require("../middleware/index.js")

// INDEX - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err) {
           console.log(err);
       } else {
         res.render("campgrounds/index" , {campgrounds: allCampgrounds});
       }
    });
});

// Create - add new campground to DB 
router.post("/",  isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username,
    }
    var newCampground = {name:name, image:image, description:desc, author: author};
    
    // Creat a new campground and save to DB 
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "New Campground Added!");
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Show form to create new campground
router.get("/news", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more infor about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log("err"); 
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT Campground ROUTE
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});




// UPdate Campground ROUTE 
router.put("/:id", checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err) {
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// DESTROY CAMPGROUND ROUTE 
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err) {
           req.flash("success", "Campground Deleted!");
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

// middleware 

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be login to do that!");
    res.redirect("/login");
}


function checkCampgroundOwnership (req, res, next) {
        if(req.isAuthenticated()){
                Campground.findById(req.params.id, function(err, foundCampground){
                   if(err){
                       req.flash("error", "Campground not found!");
                       res.redirect("back");
                   }  else {
                       // does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                    }
                   }
                });
            } else {
                req.flash("error", "You need to be login to do that!");
                res.redirect("back");
            }
        }

module.exports = router;

