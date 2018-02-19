const express = require('express');
const router = express.Router();

/* GET api page. */
router.get('/', function (req, res, next) {
    res.send({ "id": 1, "categoryTitle": "Health Care" });
});

module.exports = router;