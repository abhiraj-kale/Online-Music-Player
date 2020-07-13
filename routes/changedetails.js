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
    console.log('Change details page connected to the server!');
  });
  
router.post('/changedetails-username' , (request,response,next) =>{
    console.log('inside change details');
    var oldname = request.body.formData.oldname;
    var newname = request.body.formData.newname;
    var password =  request.body.formData.password;

    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [oldname, password], function(error, results, fields) {
        if (results.length > 0 && results[0].username===oldname && results[0].password===password) {
           var id = results[0].id;
           connection.query(`Update accounts set username=? where id=?`,[newname,id],function(error,results,fields){
            if (error){
                throw error;
            }else{
                console.log('Username Updated for ID : '+id);
                response.send('1');
            }
           });
        } else {
            console.log("Incorrect Credentials" );
            response.send('2');
        }			
        
    });
    });


    router.post('/changedetails-password' , (request,response,next) =>{
        console.log('inside change details');
        var username = request.body.formData.username;
        var oldpass = request.body.formData.oldpass;
        var newpass = request.body.formData.newpass;
    
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, oldpass], function(error, results, fields) {
            if (results.length > 0 && results[0].username===username && results[0].password===oldpass) {
               var id = results[0].id;
               connection.query(`Update accounts set password=? where id=?`,[newpass,id],function(error,results,fields){
                if (error){
                    throw error;
                }else{
                    console.log('Password Updated for ID : '+id);
                    response.send('1');
                }
               });
            } else {
                console.log("Incorrect Credentials" );
                response.send('2');
            }			
           
        });
        });

        router.post('/changedetails-email' , (request,response,next) =>{
            console.log('inside change details');
            var username = request.body.formData.username;
            var oldemail = request.body.formData.oldemail;
            var newemail = request.body.formData.newemail;
            var password =  request.body.formData.password;
        
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0 && results[0].username===username && results[0].password===password && results[0].email===oldemail) {
                  
                   var id = results[0].id;
                   connection.query(`Update accounts set email=? where id=?`,[newemail,id],function(error,results,fields){
                    if (error){
                        throw error;
                    }else{
                        console.log('E-Mail Updated for ID : '+id);
                        response.send('1');
                    }
                   });
                }
                 else {
                    console.log("Incorrect Username/Password" );
                    response.send('2');
                }			
                
            });
            
            });
module.exports = router;