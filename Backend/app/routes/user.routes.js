module.exports = function(app) {
    const user = require('../controllers/user.controller')
    const authorization = require('../middlewear/authorization')
    const recaptcha = require('../middlewear/recaptcha')

    //for all user routes add recaptcha at middlewear
    //register route
    app.post('/api/user/register', recaptcha, user.register)
    //logIn route
    app.post('/api/user/logIn', recaptcha, user.logIn)

    //for all others routes add authorization at middlewear
    app.get('/api/user/test', authorization, user.test);
}
