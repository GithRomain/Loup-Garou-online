//check recaptcha to provide bot
const request = require("request");

module.exports = (req, res, next) => {
    try {
        //take the token on req
        var response = req.body.recaptchaToken;
        //set verification url with secret key and token
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.RECAPTACHASERVEUR + "&response=" + response;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if(body.success !== undefined && !body.success) {
                res.status(402).json({ error: "captcha not passed" });
            }else{
                //if succeed pass the middelwear
                next();
            }
        });
    }
    catch(error) {
        res.status(402).json({ msg: "captcha not passed" });
    }
};