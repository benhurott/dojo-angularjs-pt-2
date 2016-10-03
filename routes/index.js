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

router.get('/movies', function (req, res, next) {
    setTimeout(function () {
        res.json([
            {
                id: 1,
                title: 'The Walking Dead',
                ranking: 4,
                imageUrl: 'images/the-walking-dead.png'
            },
            {
                id: 2,
                title: 'Stranger Things',
                ranking: 5,
                imageUrl: 'images/stranger-things.jpg'
            },
            {
                id: 3,
                title: 'American Horror Story',
                ranking: 3,
                imageUrl: 'images/american-horror-story.jpg'
            }
        ]);
    }, 2000);
})

module.exports = router;
