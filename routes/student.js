var express = require('express');
var router = express.Router();
var connect = require('./conn');

router.get('/', function(req, res, next) {
  res.render('student/index');
});


router.get('/group', function(req, res, next) {
  res.render('student/group');
});
router.get('/project', function(req, res, next) {
  res.render('student/project');
});
router.get('/manage_meeting_time', function(req, res, next) {
  res.render('student/manage_meeting_time');
});
router.get('/manage_presentation_time', function(req, res, next) {
  res.render('student/manage_presentation_time');
});
router.get('/profile', function(req, res, next) {
  res.render('student/profile');
});
router.get('/self_reflection', function(req, res, next) {
  res.render('student/self_reflection');
});
router.get('/project_detail', function(req, res, next) {
  res.render('student/project_detail');
});
router.get('/assessment', function(req, res, next) {
  res.render('student/assessment');
});



router.get('/getAnnouncement/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
      if (err) res.send('0');
      var sql = "SELECT * FROM announcements ORDER BY Id ASC";
      connect().query(sql,function(err,result){
        if (err) res.send('1');
        var temp="";
        for (var i = result.length - 1; i >= 0; i--) {
          temp += announcementTemp(result[i].title,result[i].content,JSON.stringify(result[i].date));

        }
         res.send(temp);
       })
    });
  } else {
   res.send("Page not avalible");
  }


});


router.get('/project/getProjects/:userId', function(req, res, next) {
   if (req.xhr){
      connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project";
        connect().query(sql,function(err,results){
          if (err) res.send('1');
          var temp ="";
          for (var i = results.length - 1; i >= 0; i--) {
            temp += projectTemp(results[i].project_id,results[i].project_name,results[i].difficulty_level,results[i].super_name,results[i].simple_description);
          }
          res.send(temp);
        })
      });
   }
   else {
   res.send("Page not avalible");
  }
});


router.get('/project_detail/:projectId', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project WHERE project_id = '"+req.params.projectId+"'";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
          res.render('coord/project_detail',{filePath:result[0].out_line_link, projectName:result[0].project_name});
        })
      });


});

router.get('/project_detail/projectUploads/:name', function(req, res){

    fs.readFile(__dirname + "/../projectUploads/"+req.params.name+"", function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

router.get('/group/getGroup/:user', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err){
      if (err) res.Status(500).console.log(error);
      var sql = "SELECT * FROM `group` ORDER BY group_id ASC";
      connect().query(sql,function(err, result){
        if (err) console.log(err)
        var temp = "";
        for (var i = result.length - 1; i >= 0; i--) {
          console.log(result[i].group_id);
          temp += groupTemp(result[i].group_id, result[i].available_place, result[i].tutor_email);

        }
        res.send(temp);


      })
    })
  } else {
    res.send('\
<!DOCTYPE html>\
  <html>\
  <body>\
  <p style="color:red"><b>Page is not available</b></p>\
  </body>\
</html>');
  }

})


/*router.get('/group/group_detail/:id', function(req,res,next){
  connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `student` WHERE group_id= '"+req.params.id+"'";
    //  var sql2 = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";

      connect().query(sql,function(err,results){
        if (err) console.log(err);
        //res.render('student/group_detail',{id:req.params.id});

        var temp = "";
        for (var i = results.length - 1; i >= 0; i--) {
          console.log(results[i].group_id);
          temp += memberTemp(results[i].email_address, results[i].first_name, results[i].last_name,results[i].major, results[i].gpa);

        }
        res.send(temp);
        })


    });
})*/

router.get('/group/group_detail/:id',function(req,res,next){
  res.render('student/group_detail',{id:req.params.id});
})


router.get('/group/getDetail/:id/:userId',function(req,res,next){
  connect().connect(function(err) {
    if (err) res.send('0');
      var sql = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";
      connect().query(sql,function(err,results){
        if (err) res.send('1');
        var temp ="";
        for (var i = results.length - 1; i >= 0; i--) {
          temp += memberTemp(results[i].email_address,results[i].first_name,results[i].last_name,results[i].major,results[i].GPA)}
        res.send(temp);
      })
    });
})


router.get('/group/getDetail/addStudentTogroup/:groupId/:userId',function(req,res,next){
  connect().connect(function(err) {
    var places = req.params.places - 1;
      var sql = "UPDATE student SET group_id = '"+req.params.groupId+"' WHERE username = '"+req.params.userId+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
          res.send('succ');
      })
    });
})



function groupTemp(id,available_place,tutor){

  var groupTemp = "";
  groupTemp = '<tr>\
  <td><a href="/student/group/group_detail/'+id+'">'+id+'</a></td>\
  <td>'+available_place+'</td>\
  <td>'+tutor+'</td><br />\
  </tr>';
  return groupTemp;
}




function memberTemp(email,fname,lname,major,gpa){

  var memberTemp = "";
  memberTemp = '<tr>\
                  <th>'+email+'</th>\
                  <th>'+fname+'</th>\
                  <th>'+lname+'</th>\
                  <th>'+major+'</th>\
                  <th>'+gpa+'</th>\
              </tr>';
  return memberTemp;
}


module.exports = router;
