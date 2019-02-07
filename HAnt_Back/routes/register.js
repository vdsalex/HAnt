var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendfile('public/register.html');
});

router.post('/', function(req, res, next) {

});

module.exports = router;
