var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'abhiraj',
  database : 'nodelogin'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Account page connected to the server!');
});


router.get('/account/:id' , (request,response,next) =>{ 
 connection.query('SELECT * FROM accounts WHERE id=?', [request.params.id], function(error, results, fields) {
        if (results.length > 0) {
         response.render('user',{ 
         name :request.session.username,
         songname : "Fake friends"
     });
    }
});
});


module.exports = router;