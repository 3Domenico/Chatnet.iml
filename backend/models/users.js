const mongoose= require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true,
        maxlength: 14
    },
    friends: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]
}

);
userSchema.plugin(passportLocalMongoose,{
    usernameField: "email"
});

module.exports=mongoose.model('User',userSchema)