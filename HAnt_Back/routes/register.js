var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.sendfile('public/register.html');
});

router.post('/', function(req, res, next) {
    var x = req.body.password;
    var y = req.body.email;
    var z = req.body.role;

    res.send(x);
});

module.exports = router;
