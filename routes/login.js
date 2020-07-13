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
  console.log('Log-in page connected to the server!');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', { message: null });
   req.session.errors = null;
   res.end();
});

router.post('/login/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password ) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0 && username===request.body.username && password===request.body.password) {
				request.session.loggedin = true;
                request.session.username = username;
                request.session.id = results[0].id;
				response.redirect('/account/'+results[0].id);
			} else {
				response.render('login', { message: "Incorrect Username/Password" });
			}			
			response.end();
		});
	} else {
		response.render('login', { message: "Please enter Username/Password" });
		response.end();
	}
});

module.exports = router;