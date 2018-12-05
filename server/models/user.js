const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config').get(process.env.NODE_ENV);

const SALT_I = 10;



var userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:100
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type: String
    }
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }

})



userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, same){
        if(err) return cb(err);
        cb(null, same);
    })


}


userSchema.methods.generateToken = function generateToken(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null, user);
    })
}
const User = mongoose.model('User', userSchema);
module.exports = { User };
