const jwt = require('jsonwebtoken');

//check AWP token for authorization
module.exports = (req, res, next) => {
    try {
        //take the token
        const token = req.headers.authorization.split(' ')[1];
        //uncrypt it
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        //user uncrypted
        const user = decodedToken;
        //set on the req header
        req.user = user
        //go next api REST
        next();
    //if unauthorize
    } catch(error) {
        res.status(401).json({ error });
    }
};