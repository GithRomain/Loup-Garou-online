// import User model
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.test = (req, res) => {
    res.send("tamere")
}

// User Register function
// AUTOMATIC CHANGE WITH THE MODEL
exports.register = (req, res, next) => {
    //hash password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //create new user with the actual model and value (no need to change)
            const user = new User(req.body);
            user.password = hash;
            user.save()
                .then(() => res.status(201).json({ message: 'User created' }))
                //if user not created for some reason
                .catch(error => res.status(400).json({ error: 'This pseudo or email is already taken' }));
        })
        //if can't hash password for some reason
        .catch(error => res.status(500).json({ error: "Please fill the form" }));
};

// User LogIn function
// AUTOMATIC CHANGE WITH THE MODEL
exports.logIn = (req, res, next) => {
    //Search by pseudo
    User.findOneAndUpdate({ $or: [{pseudo: req.body.emailOrPseudo}, {email: req.body.emailOrPseudo}] }, {$set : {status: true}}, {new: true})
        .then(user => {
            //if user not find in mongo
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            //verify password
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //if passsword wrong
                    if (!valid) {
                        return res.status(401).json({ error: 'Incorrect password' });
                    }
                    //response in Json format with token crypted
                    res.status(200).json({
                        user: user,
                        token: jwt.sign(
                            user.toObject(),
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                //if can't compare password for any reason
                .catch(error => res.status(500).json({ error }));
        })
        //if can't search in mongo in the table
        .catch(error => res.status(500).json({ error }));
};

//change light mode
exports.updateLightMode = (req, res, next) => {
    //Search by pseudo
    User.findOneAndUpdate({ _id: req.body._id}, {$set : {lightMode: req.body.lightMode}}, {new: true})
        .then(user => {
            //if user not find in mongo
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            else {
                res.send("goodChange")
            }
        })
        //if can't search in mongo in the table
        .catch(error => res.status(500).json({ error }));
};

exports.updateStatus = (req, res, next) => {
    //Find product and update it
    User.findOneAndUpdate({ _id: req.body._id},
        {$set : {status: req.body.status}},{new: true})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    error: "User not found with id " +
                        req.body._id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                    error: "User not found with id " +
                        req.body._id
                });
            }
            return res.status(500).json({
                error: "Error updating user with id " +
                    req.body._id
            });
        });
}

