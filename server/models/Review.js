const { Schema, model } = require('mongoose');

const reviewSchema= new Schema ({
    reviewContent:{
        type: String,
        required:true,
        minlength:1,
        maxlength:280,}
    ,
    reviewerName:{
        type: String,
        required:true

    }
})


const Review = model('Review', reviewSchema);

module.exports= Review