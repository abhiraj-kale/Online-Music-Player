var express = require('express');
var fs = require ('fs'); 
var router = express.Router();

router.post('/:id/downloads', (req,res,err) => {
    var ts = require('./userdownloads/'+req.params.id+'.json');
    res.send(JSON.stringify(ts));
});

router.post('/:id/:song_id', (request,response,err) => {
    var song_id = request.params.song_id;
    var user_id = request.params.id;
    var file = require('./songs.json');
    file.forEach((item,index)=>{ 
          if(item.id == song_id){
            
              if(fs.existsSync(__dirname+'/userdownloads/'+user_id+'.json')){
                var replace = require("replace");
                replace({
                    regex: "]",
                    replacement: " ",
                    paths: [__dirname+'/userdownloads/'+user_id+'.json'],
                    recursive: true,
                    silent: true,
                });
                     fs.appendFileSync(__dirname+'/userdownloads/'+user_id+'.json',",");

               }else{
               
                fs.appendFileSync(__dirname+'/userdownloads/'+user_id+'.json',"[");
               }
               var itm = JSON.stringify(item);
               try{
                fs.appendFileSync(__dirname+'/userdownloads/'+user_id+'.json',itm);
                fs.appendFileSync(__dirname+'/userdownloads/'+user_id+'.json',"]");
            } 
            catch{
                console.log('error');
            }
          }
    });
    
});

router.get('/playlist/:userid', (req,res,err) => {
  console.log('Aya playlist me : ' + req.params.userid);
  var ts = require('./userplaylists/'+req.params.userid);
  res.send(JSON.stringify(ts));
});

router.post('/:id/playlists/:songid', (request,response,err) => {
  var songid = request.params.songid;
  var userid = request.params.id;
  var file = require('./songs.json');
  file.forEach((item,index)=>{ 
        if(item.id == songid){
           
            if(fs.existsSync(__dirname+'/userplaylists/'+userid+'.json')){
              var replace = require("replace");
              replace({
                  regex: "]",
                  replacement: " ",
                  paths: [__dirname+'/userplaylists/'+userid+'.json'],
                  recursive: true,
                  silent: true,
              });
                   fs.appendFileSync(__dirname+'/userplaylists/'+userid+'.json',",");

             }else{
             
              fs.appendFileSync(__dirname+'/userplaylists/'+userid+'.json',"[");
             }
             var itm = JSON.stringify(item);
             try{
              fs.appendFileSync(__dirname+'/userplaylists/'+userid+'.json',itm);
              fs.appendFileSync(__dirname+'/userplaylists/'+userid+'.json',"]");
              response.sendStatus(200);
          } 
          catch{
              console.log('error');
          }
        }
  });
  
});


module.exports = router;