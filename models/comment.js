let mongoose = require('mongoose')

//post schema
let commentSchema = mongoose.Schema({
    commentpostID:{ //will be the post id
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }

})

let Comment = module.exports = mongoose.model('Comment', commentSchema)