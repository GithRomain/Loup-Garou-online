const mongoose = require("mongoose");

//clef secrete
const key = process.env.TOKEN;

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');
// import jsonwebtoken
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    pseudo: {
        type: String,
        trim: true,
        required: true,
    },

    mail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },

    password: {  //est hashé
        type: String,
        required: true
    },
})

//Create a Schema method to compare password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

//Fonction qui génere un token qu'on vérifiera par la suite
UserSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id,
            pseudo: user.pseudo,
            mail: user.mail,
            password: user.password,
        }, key
    );
    return token;
}

//Fonction qui vérifie le token
UserSchema.methods.authorization = function () {
    const token = this.generateAuthToken();
    try {
        jwt.verify(token, key);
        return true
    } catch (err) {
        return false;
    }
}

module.exports = mongoose.model("User", UserSchema);