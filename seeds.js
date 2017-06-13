var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var data = [
        {
            name: "Cloud's Rest", 
            image: "https://pixabay.com/static/uploads/photo/2016/02/18/22/16/tent-1208201_1280.jpg",
            description: "Art investment is a non-liquid, alternative form of investment. It is usually a small part of an investment portfolio. An art investor aims to purchase a piece of art, keep it for years or decades while it appreciates, and sell it years later at a profit. Art has some qualities that other investments do not; for instance, it can be hung on the wall and enjoyed for years. It also does not have to be declared to the government in terms of capital gains when sold by an individual, unlike the sale of stocks and bonds. However, art investment does not necessarily lead to profits, since it depends on constantly changing demands and fashions of the art world. Read more to find out how to become an art investor."
        }, 
        {
            name: "TOdo todos 's Lego", 
            image: "https://pixabay.com/static/uploads/photo/2015/11/07/11/39/camping-1031360_1280.jpg",
            description: "Art investment is a non-liquid, alternative form of investment. It is usually a small part of an investment portfolio. An art investor aims to purchase a piece of art, keep it for years or decades while it appreciates, and sell it years later at a profit. Art has some qualities that other investments do not; for instance, it can be hung on the wall and enjoyed for years. It also does not have to be declared to the government in terms of capital gains when sold by an individual, unlike the sale of stocks and bonds. However, art investment does not necessarily lead to profits, since it depends on constantly changing demands and fashions of the art world. Read more to find out how to become an art investor.",
        }, 
        {
            name: "Another great's Rest", 
            image: "https://pixabay.com/static/uploads/photo/2016/03/09/09/15/peak-1245693_1280.jpg",
            description: "Art investment is a non-liquid, alternative form of investment. It is usually a small part of an investment portfolio. An art investor aims to purchase a piece of art, keep it for years or decades while it appreciates, and sell it years later at a profit. Art has some qualities that other investments do not; for instance, it can be hung on the wall and enjoyed for years. It also does not have to be declared to the government in terms of capital gains when sold by an individual, unlike the sale of stocks and bonds. However, art investment does not necessarily lead to profits, since it depends on constantly changing demands and fashions of the art world. Read more to find out how to become an art investor.",
        } 
    ]

function seedDB() {
        Campground.remove({}, function(err){
                if (err) {
               console.log(err);
           } 
           console.log("removed campgrounds"); 
        /*data.forEach(function(seed){
            Campground.create(seed, function(err, campgroundData){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "this place is great, but i wish",
                            author: "homer"
                        },  function(err, comment){
                                if (err) {
                                    console.log(err);
                                } else {
                                    campgroundData.comments.push(comment);
                                    campgroundData.save();
                                    console.log("created new comment");
                                }
                        }); 
                }
            });
        });  */
    });
}

module.exports = seedDB;



