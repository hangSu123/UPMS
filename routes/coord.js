var express = require('express');
var router = express.Router();
var connect = require('./conn');

const upload = require('multer')({ dest: 'projectUploads/' });
const CRA = require('multer')({ dest: 'CRAUploads/' });
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// start home page 
router.get('/', function(req, res, next) {
	  res.render('coord/index');  
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

router.get('/getCalandar/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send('0');
    var sql = "SELECT * FROM announcements ORDER BY Id ASC";
    connect().query(sql,function(err,result){
      if (err) res.send('1');
        var temp={};
        var key = "events";
        temp[key]=[];
        for (var i = result.length - 1; i >= 0; i--) {
          var data = {
          Date:result[i].date,
          Title:result[i].title,
          Link:result[i].Id
        };
        temp[key].push(data);
      }

      res.json(temp);
      })
   });
  } else {
   res.send("Page not avalible");
  }
});

router.get('/getCalandar/:userId/:Id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send('0');
      var sql = "SELECT * FROM announcements WHERE Id = '"+req.params.Id+"'";
      connect().query(sql,function(err,result){
        if (err) res.send('1');
        var temp ="";
        temp = calandarTemp(JSON.stringify(result[0].date),result[0].content,result[0].userId)
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
  
  
});



router.get('/createAnnouncement/:userId/:title/:content/:time', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO announcements (userId,title,content,date) VALUES ('"+req.params.userId+"','"+req.params.title+"','"+req.params.content+"','"+req.params.time+"'  )";
      connect().query(sql,function(err,result){
        if (err) res.send("1");
         res.send("2");
      })
    });
  } else {
   res.send("Page not avalible");
  }
	
  
});



/// Ends home page


router.get('/groups', function(req, res, next) {
  res.render('coord/groups');
});

router.get('/groups/createGroups/:num_groups/:amount/:tutor', function(req, res, next) {
  if (req.xhr){
    var values = []
    for (var i =0; i<req.params.num_groups; i++){
      var value = [];
      value.push(req.params.amount);
      value.push(req.params.tutor);
      values.push(value);
    }
    var sql = "INSERT INTO `group` (available_place,tutor_email) VALUES ?";
    connect().connect(function(err) {
      if (err) res.send('0');
        console.log(sql)
        connect().query(sql,[values],function(err,results){
          if (err) res.send('1');
          res.send('inserted');
        })
      });
    
  }
  else {
  res.send("Page not avalible");
 }
});

router.get('/groups/getGroups/:user', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM `group` ORDER BY group_id DESC"
        connect().query(sql,function(err,results){
          if (err) res.send('1');
          var temp ="";
          for (var i = results.length - 1; i >= 0; i--) {
            temp += groupTemp(results[i].group_id,results[i].available_place,results[i].tutor_email);
          }
          res.send(temp);
        })
      });
    
  }
  else {
  res.send("Page not avalible");
 }
});

router.get('/groups/groups_detail/:id', function(req, res, next) {
  connect().connect(function(err) {
    if (err) onsole.log(err);
      var sql = "SELECT * FROM `group` WHERE group_id= '"+req.params.id+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var places = "";
        for (var i = results.length - 1; i >= 0; i--) {
          places = results[i].available_place
        }
        res.render('coord/groups_detail',{id:req.params.id,places:places});
        })
    });
  
});

router.get('/groups/groups_detail/groupMember/:id',function(req,res,next){
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

router.get('/groups/groups_detail/avaStudents/:user',function(req,res,next){
  connect().connect(function(err) {

    if (err) res.send('0');
      var sql = "SELECT * FROM student WHERE group_id is null";
      connect().query(sql,function(err,results){
        if (err) res.send('1');
        var temp ="";
        for (var i = results.length - 1; i >= 0; i--) {
          temp += avaTemp(results[i].email_address,results[i].first_name,results[i].last_name,results[i].major,results[i].GPA)}
        res.send(temp);
      })
    });
})


router.get('/groups/groups_detail/addToGroup/:email/:groupId/:places',function(req,res,next){
  connect().connect(function(err) {
    var places = req.params.places - 1;
      var sql = "UPDATE student SET group_id = '"+req.params.groupId+"' WHERE email_address = '"+req.params.email+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var sql = "UPDATE `group` SET available_place = '"+places+"' WHERE group_id = '"+req.params.groupId+"'";
        connect().query(sql,function(err,results){
          if (err) console.log(err);
          res.send('succ');
        })
      })
    });
})

router.get('/groups/groups_detail/deleteFromGroup/:email/:groupId/:places',function(req,res,next){
  connect().connect(function(err) {
    var places = parseInt(req.params.places)+1;
    console.log(places)
      var sql = "UPDATE student SET group_id = null WHERE email_address = '"+req.params.email+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var sql = "UPDATE `group` SET available_place = '"+places+"' WHERE group_id = '"+req.params.groupId+"'";
        connect().query(sql,function(err,results){
          if (err) console.log(err);
          res.send('succ');
       })
      })
    });
})



router.get('/groups/groups_detail/showAppliedProject/:groupId',function(req,res,next){
  connect().connect(function(err) {
    if (err) console.log(err);
    var sql = "SELECT * FROM `application`,`project` WHERE group_id = '"+req.params.groupId+"' and application.project_id = project.project_id";
    connect().query(sql,function(err,results){
      if (err) console.log(err);
      var temp ="";
      for (var i = results.length - 1; i >= 0; i--) {
        temp += showAppTemp(results[i].project_id,results[i].project_name,results[i].application_id,results[i].space_available,results[i].difficulty_level,results[i].application_link,results[i].group_preference,results[i].supervisor_preference,results[i].assigned)
      }
      res.send(temp);
    })
  })
})


router.get('/groups/groups_detail/assignToApplication/:projectId/:groupId/:applicationId',function(req,res,next){
  connect().connect(function(err) {
        if (err) console.log(err);
        var sql = "SELECT * FROM `group` WHERE group_id = '"+req.params.groupId+"'";
          connect().query(sql,function(err,results){
            if (err) console.log(err);
            console.log(results[0].group_id);
            if (results[0].project_id === null){
              var sql = "UPDATE `group` SET project_id = '"+req.params.projectId+"' WHERE group_id = '"+req.params.groupId+"'";
              connect().query(sql,function(err,results){
                if (err) console.log(err);
                var sql = "UPDATE `application` SET assigned = 'yes' WHERE application_id = '"+req.params.applicationId+"'";
                connect().query(sql,function(err,results){
                  if (err) console.log(err);
                  res.send("succ");
                })
              })
            }else{
              res.send("duplicate");
              console.log("duplicate")
            }
          })
      })
    })


router.get('/groups/groups_detail/cancelFromApplication/:projectId/:groupId/:applicationId',function(req,res,next){
  connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "UPDATE `group` SET project_id = null WHERE group_id = '"+req.params.groupId+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var sql = "UPDATE `application` SET assigned = 'no' WHERE application_id = '"+req.params.applicationId+"'";
        connect().query(sql,function(err,results){
          if (err) console.log(err);
          res.send("succ");
        })
      })
  
  })
})

/////start project page
router.get('/project', function(req, res, next) {
  res.render('coord/project');
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




////Ends project page


/// Starts project detailPage 
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




///Ends project Detail

/// Starts team meeting functions
router.get('/meeting', function(req, res, next) {
  res.render('coord/meeting');
});


router.get('/meeting/getTimeSlots/:userId',function(req, res, next){
  if (req.xhr){
    var userId = req.params.userId;
    connect().connect(function(err){
      if (err) console.log(err);
        var sql = "SELECT * FROM `meeting` WHERE type = 'tutor' order by time DESC";
        connect().query(sql,function(err,result){
          if (err) console.log(err);
            var temp = "";
            var temps = "<tr>"
            var tempM="<th>";
            var tempT="</th><th>";
            var tempW="</th><th>";
            var tempTh="</th><th>";
            var tempF="</th><th>";
            var tempe= "</th></tr>";
            for (var i = result.length - 1; i >= 0; i--) {
              if (result[i].day == "Monday"){
                 tempM += timeSlotTemp(result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Tuesday"){
                tempT += timeSlotTemp(result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Wednesday"){
                tempW += timeSlotTemp(result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Thursday"){
                tempTh += timeSlotTemp(result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Friday"){
                tempF += timeSlotTemp(result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }
            }
            temp = temps+tempM+tempT+tempW+tempTh+tempF+tempe;
            res.send(temp);
          })
          
      })
  }else{
    res.send('page not avalible')
  }
})

router.get('/meeting/createMeeting/:day/:time/:duration/:tutor', function(req, res, next) {
  if (req.xhr){
    var day = req.params.day;
    var time = req.params.time;
    var duration = req.params.duration;
    var tutor = req.params.tutor;
    
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO `meeting` (type,tutor_id,day,time,duration)\
                VALUES ('tutor','"+tutor+"','"+day+"','"+time+"','"+duration+"')";
      connect().query(sql,function(err,result){
        if (err) console.log(err);
        res.send("succ");
      })
    });

  }else{
    res.send("Page not avalible");
  }
});


///Ends team meeting functions
///starts presentation time function
router.get('/presentation', function(req, res, next) {
  res.render('coord/presentation');
});



router.get('/presentation/createMeeting/:day/:time', function(req, res, next) {
  if (req.xhr){
    var day = req.params.day;
    var time = req.params.time;
    
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO `meeting` (type,date,time)\
                VALUES ('demo','"+day+"','"+time+"')";
      connect().query(sql,function(err,result){
        if (err) console.log(err);
        res.send("succ");
      })
    });

  }else{
    res.send("Page not avalible");
  }
});



router.get('/presentation/getTimeSlots/:userId',function(req, res, next){
  if (req.xhr){
    var userId = req.params.userId;
    connect().connect(function(err){
      if (err) console.log(err);
        var sql = "SELECT * FROM `meeting` WHERE type = 'demo' order by Date ASC";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
            var temp={};
            var key = "events";
            temp[key]=[];
            for (var i = result.length - 1; i >= 0; i--) {
              var newDate = sqlToJsDate(JSON.stringify(result[i].date));
              var data = {
              Date:result[i].date,
              Title:newDate,
              Link:newDate
            };
            temp[key].push(data);
          }
    
          res.json(temp);
          })
      })
  }else{
    res.send('page not avalible')
  }
})



router.get('/presentation/getCalandar/:userId/:Id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `meeting` WHERE date = '"+req.params.Id+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var temp ="";
        for (var i = results.length - 1; i >= 0; i--) {
          temp += presentationTimeTemp(JSON.stringify(results[i].meeting_id),results[i].time, parseInt(i+1));
        }
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
});



router.get('/presentation/getCalandar/showGroups/eachGroup/:Id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `group` WHERE demo_meeting_id = '"+req.params.Id+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var temp ="";
        if (results == "" || results == undefined || results == null){
          temp += presentationGroupTemp("No group yet");
        }else{
          for (var i = results.length - 1; i >= 0; i--) {
            temp += presentationGroupTemp(results[i].group_id);
          }
        }
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
});



//Ends presentation time function


router.get('/profile', function(req, res, next) {
  res.render('coord/profile');
});



////start upload project page
router.get('/upload_project', function(req, res, next) {
  res.render('coord/upload_project');
});

router.post('/upload_project/uploadFile',upload.single('file'), function(req, res, next) {
    if (!req.file.originalname.match(/\.(pdf)$/)) {
        res.send("not pdf");
    }else{
      let oldPath = path.join(__dirname,'../', req.file.path);
      let newPath = path.join(__dirname, '../','projectUploads/' + req.file.originalname);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.send('name error');
        } else {
          res.send(req.file.originalname);
        }
      });
    }
    
});



router.post('/upload_project/uploadProject', function(req, res, next) {
    var projectName = req.body.projectName;
    var level = req.body.level;
    var space = req.body.space;
    var superName = req.body.superName;
    var superEmail = req.body.superEmail;
    var description = req.body.description;
    var fileName = req.body.fileName;
    
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO project (project_name,simple_description,space_available,out_line_link,difficulty_level,super_name,supervisor_email)\
                 VALUES ('"+projectName+"','"+description+"','"+space+"','"+fileName+"','"+level+"','"+superName+"','"+superEmail+"')";
      connect().query(sql,function(err,result){
        if (err) res.send("1");
         res.send("2");
      })
    });

});



////end  upload project page


///start assessment page
router.get('/assessments', function(req, res, next) {
  res.render('coord/assessments');
});



router.post('/setUpassignment/uploadFile',CRA.single('file'), function(req, res, next) {
  if (!req.file.originalname.match(/\.(pdf)$/)) {
      res.send("not pdf");
  }else{
    let oldPath = path.join(__dirname,'../', req.file.path);
    let newPath = path.join(__dirname, '../','CRAUploads/' + req.file.originalname);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.send('name error');
      } else {
        res.send(req.file.originalname);
      }
    });
  }
  
});



router.post('/setUpassignment/setUpDetaill', function(req, res, next) {
  var name = req.body.name;
  var weight = req.body.weight;
  var dateDue = req.body.dateDue;
  var file = req.body.fileName;
  
  connect().connect(function(err) {
  if (err) res.send("0");
    var sql = "INSERT INTO `assignment` (assignment_name,assignment_weight,submission_date,CRA_link)\
               VALUES ('"+name+"','"+weight+"','"+dateDue+"','"+file+"')";
    connect().query(sql,function(err,result){
      if (err) console.log(err);
       res.send("2");
    })
  });

});


router.get('/getAssignment/:user', function(req, res, next) {  
  connect().connect(function(err) {
  if (err) res.send("0");
    var sql = "SELECT * FROM `assignment` ORDER BY assignment_id ASC ";
    connect().query(sql,function(err,results){
      if (err) console.log(err);
      var temp ="";
      for (var i = results.length - 1; i >= 0; i--) {
        temp += assignmentTemp(results[i].assignment_id,results[i].assignment_name,results[i].assignment_weight,JSON.stringify(results[i].submission_date),results[i].CRA_link);
      }
      res.send(temp);
    })
  });

});


router.get('/CRA/:name', function(req, res){
  fs.readFile(__dirname + "/../CRAUploads/"+req.params.name+"", function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
});


router.get('/assessments/assessment_detail/:id', function(req, res, next) {
  connect().connect(function(err) {
    if (err) onsole.log(err);
      var sql = "SELECT * FROM `assignment` WHERE assignment_id= '"+req.params.id+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        res.render('coord/assessment_detail',{id:req.params.id,name:results[0].assignment_name});
        })
    });
  
});


router.get('/assessments/assessment_detail/studentMark/:id',function(req,res,next){
  connect().connect(function(err) {
    if (err) res.send('0');
      var sql = "SELECT * FROM `result`,`student` WHERE assignment_id = "+req.params.id+" and student.username = result.username ";
      console.log(sql)
      connect().query(sql,function(err,results){
        if (err) res.send('1');
        var temp ="";
        for (var i = results.length - 1; i >= 0; i--) {
          temp += resultsTemp(results[i].username,results[i].group_id,results[i].feedback_link,results[i].mark,req.params.id);
        }
        res.send(temp);           
      })
    });
})



router.get('/assessments/assessment_detail/saveMark/:username/:assignmentId/:mark',function(req,res,next){
  connect().connect(function(err) {
    if (err) res.send('0');
      var sql = "update `result` SET mark = '"+req.params.mark+"'  WHERE username = '"+req.params.username+"' and assignment_id = '"+req.params.assignmentId+"'";
      console.log(sql)
      connect().query(sql,function(err,result){
        if (err) res.send('1');
        res.send("succ");           
      })
    });
})


router.get('/student/:name', function(req, res){
  fs.readFile(__dirname + "/../workUploads/"+req.params.name+"", function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
});








function announcementTemp(title,content,date){
        var announcementTemp = "";
        var time = date;
        announcementTemp = '<div class="panel-body">\
                                <div class="panel-body-t">\
                                      '+title+'\
                                </div>\
                                <div class="panel-body-b">\
                                      '+content+'\
                                </div>\
                                <div class="panel-body-f">\
                                      <span>Time: '+sqlToJsDate(time)+'<span>\
                                </div>\
                            </div>';
        return announcementTemp;
    }
function calandarTemp(date,content,userId){
        var calandarTemp = "";
        calandarTemp = '<div class="panel-body-t">\
                              '+sqlToJsDate(date)+'\
                            </div>\
                            <div class="panel-body-b" style="font-size: 15px; font-weight: lighter;">\
                              '+content+'\
                            </div>\
                            <div class="panel-body-f" style="font-size: 15px; font-weight: lighter;">\
                             <span class="link">@ '+userId+'</span>\
                          </div>';
        return calandarTemp;
    }


function presentationTimeTemp(meetingId,time,section){
      var presentationTimeTemp = '<div style="display:block; clear:both"><div class="panel-body-t">\
                                    section: '+section+'\
                                  </div>\
                                  <div class="panel-body-b" style="font-size: 15px; font-weight: lighter;">\
                                    <span class = "link" onClick="showGroups(this)" id ="'+meetingId+'" >Show groups</span>\
                                    <div id = "allGroups'+meetingId+'"></div>\
                                  </div>\
                                  <div class="panel-body-f" style="font-size: 15px; font-weight: lighter;">\
                                  <span class="link">@ '+time+'</span>\
                                  </div>\
                                  </div>';
      

      return presentationTimeTemp;
    }


function presentationGroupTemp(groupId){
  var presentationGroupTemp = '<li style="margin-top:10px">Group: '+groupId+'</li>';
  return presentationGroupTemp;
}


function projectTemp(projectId,projectName,level,superName,description){
        
        var projectTemp = "";
        projectTemp = '<div class="panel-body">\
                          <div class="panel-body-t link">\
                           <a href="project_detail/'+projectId+'">'+projectName+'</a>\
                          </div>\
                          <div class="panel-body-t-score"><br>\
                            <p>Difficulty level: '+level+'</p>\
                            Supervisor: '+superName+'\
                          </div>\
                          <div class="panel-body-b">\
                            '+description+'\
                          </div>\
                        </div>';
        return projectTemp;  
    }



    function groupTemp(id,available_place,tutor){

      var groupTemp = "";
      groupTemp = '<tr>\
                   <th><a href="/coord/groups/groups_detail/'+id+'">'+id+'</a></th>\
                    <th>'+available_place+'</th>\
                    <th>'+tutor+'</th>\
                    <th>delete</th>\
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
                      <th><button class = "btn btn-red" recordId ="'+email+'" onClick="remove(this)">Remove</button></th>\
                  </tr>';
      return memberTemp;
    }

    function avaTemp(email,fname,lname,major,gpa){

      var avaTemp = "";
      avaTemp = '<tr>\
                    <th>'+email+'</th>\
                    <th>'+fname+'</th>\
                    <th>'+lname+'</th>\
                    <th>'+major+'</th>\
                    <th>'+gpa+'</th>\
                    <th><button class = "btn" recordId ="'+email+'" onClick = "add(this)">Add To Group</button></th>\
                </tr>'
      return avaTemp;
    }


    function showAppTemp(id,name,app_id,space,level,link,group_preference,supervisor_preference,assigned){
      var avaTemp = "";
      var btnType = "onClick = 'assign(this)'>Assign";
      var btnClass = "btn";
      if (assigned == "yes"){
        btnType = "onClick = 'cancel(this)'>Remove";
        btnClass = "btn btn-red"
      }
      avaTemp = '<tr>\
                    <th> <a class = "link" href="/coord/project_detail/'+id+'" target="_blank">'+name+'</a></th>\
                    <th>'+space+'</th>\
                    <th>'+level+'</th>\
                    <th>'+link+'</th>\
                    <th>'+group_preference+'</th>\
                    <th>'+supervisor_preference+'</th>\
                    <th><button class = "'+btnClass+'" applicationId = "'+app_id+'" projectId ="'+id+'" '+btnType+'</button></th>\
                </tr>'
      return avaTemp;
    }


    function assignmentTemp(id,name,weight,date,cra){
      var assignmentTemp = "";
      assignmentTemp = '<div class="panel-body">\
                          <div class="panel-body-t link" ">\
                          <a href="/coord/assessments/assessment_detail/'+id+'">'+name+'</a>\
                          </div>\
                          <div class="panel-body-t-score"><br>\
                          <p>Due Date: <span style ="color:#114a81;" >'+sqlToJsDate(date)+'</span></p>\
                          <p>Weight: <span style ="color:#114a81;" >'+weight+'</span></p>\
                            CRA & Description:\
                          </div>\
                          <div class="panel-body-b">\
                          <div class = "link"><li><a href="/coord/CRA/'+cra+'">'+cra+'</a></li></div>\
                          </div>\
                        </div>';
      return assignmentTemp;  
    }



    function timeSlotTemp(tutor,time,duration,status){
      var classes = "registed";
      if (status > 0){
        status = status + ' groups left';
        classes = "free";
      }else if(status == 0){
        status = "Registed"
      }
      var timeSlotTemp= "";
      timeSlotTemp = '<div class ="link ' + classes +'">\
                        <span>Tutor: '+tutor+'</span>\
                        <span>Time:'+time+'</span>\
                        <span>'+status+'</span>\
                      </div>'
      return timeSlotTemp;
    
    }



    function resultsTemp(username,groupId,link,mark,assignmentId){
      var resultsTemp = ""
      resultsTemp = '<tr>\
                        <th>'+username+'</th>\
                        <th>'+groupId+'</th>\
                        <th class = "link"><a href="/coord/student/'+link+'">'+link+'</th>\
                        <th><input id = "'+username+'",type="number" value = "'+mark+'" /></th>\
                        <th><button class = "btn btn-blue" assignmentId = "'+assignmentId+'" username ="'+username+'" onclick = "save(this)">Save</button></th>\
                    </tr>'
      return resultsTemp;
    }



    function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
      var sqlDateArr1 = sqlDate.split("-");
      //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
      var sYear = sqlDateArr1[0].substr(1,4);
      var sMonth = (Number(sqlDateArr1[1])).toString();
      var sqlDateArr2 = sqlDateArr1[2].split("T");
      //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
      var sDay = (Number(sqlDateArr2[0]) + 1).toString();
      return sYear+"-"+sMonth+"-"+sDay;
    }


    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
    
    //console.log(makeid());

    const secret = 'LoiMqxk';
    const hash = crypto.createHmac('sha256', secret)
                   .update('Password1')
                   .digest('hex');
    //console.log(hash);




module.exports = router;