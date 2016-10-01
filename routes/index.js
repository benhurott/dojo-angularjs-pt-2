var express = require('express');
var router = express.Router();
var fs = require('fs');

fs.readFile('../public/index.html', function (err, html) {
    
});

/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile('../public/index.html', function (err, html) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    });
});

module.exports = router;
