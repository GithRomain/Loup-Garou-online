const user = require("../controllers/user.controller");
const auth = require("../middlewear/authorization");
const authorization = require("../middlewear/authorization");
module.exports = function(app) {
    const user = require('../controllers/user.controller')
    const authorization = require('../middlewear/authorization')

    //register route
    app.post('/api/user/register', user.register)
    //logIn route
    app.post('/api/user/logIn', user.logIn)

    //for all others routes add authorization at middlewear
    app.get('/api/user/test', authorization, user.test);
}
