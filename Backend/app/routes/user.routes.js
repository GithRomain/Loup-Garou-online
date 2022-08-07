const user = require("../controllers/user.controller");
module.exports = function(app) {
    const user = require('../controllers/user.controller')

    app.get('/api/user/test', user.test);

    app.post('/api/user/register', user.register)

    app.post('/api/user/logIn', user.logIn)
}
