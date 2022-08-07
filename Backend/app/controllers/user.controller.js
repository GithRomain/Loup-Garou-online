// import User model
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

exports.test = (req, res) => {
    res.send({
        hello: "hello world"
    });
}

// User Register function
exports.register = (req, res) => {
    let newUser = new User(req.body);
    User.findOne({mail: newUser.mail}, function (err, user) {
        if (user == null){
            //Crypter le mdp
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
        }
        else {
            res.status(500).send()
        }
    })
};

// User Sign function
exports.logIn = (req, res) => {
    User.findOne({mail: req.body.mail}, function (err, user) {
        if (user == null){
            res.status(401).json({ message: 'Authentication failed. email does not exist' });
        }
        //verif authorization
        else if (!user.authorization()){
            res.status(402).json({ message: 'Authorization failed. No access'});
        }
        //verif password
        else if (!user.comparePassword(req.body.password)) {
            res.status(403).json({ message: 'Authentication failed. Wrong password.' });
        }
        else
        {
            res.send(user)
        }

    });
};
