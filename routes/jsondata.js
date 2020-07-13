var express = require('express');
var fs = require('./songs.json');
var router = express.Router();

router.post('/songs', (req,res,err) => {
    res.send(JSON.stringify(fs));
 });
 
 module.exports = router;