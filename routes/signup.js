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
  console.log('Sign-up page connected to the server!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { success:req.session.success ,errors:req.session.errors, Error: null });
 req.session.errors = null;
});

router.post('/signup', (request,response) =>{
  //Check validity
  request.check('email','Invalid email address').isEmail();
  request.check('password', 'Password is invalid').isLength({min: 6}).equals(request.body.password);
  var errors = request.validationErrors();
  if(errors) {
    request.session.errors = errors;
    request.session.success = false;
    response.render('signup', {message: "Invalid credentials"});
  }else {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    connection.query(`INSERT INTO accounts(username,password,email) VALUES (?,?,?)`,[username,password,email],
     function(error, results) {
            if(error){
                throw error;
            }
            request.session.loggedin = true; 

            response.render('signup', {message :"Account created"});
            console.log('User created- username: '+ username +' ,password: '+password+' ,email: '+email);

        response.end();
    }); 
  }
  });



module.exports = router;
