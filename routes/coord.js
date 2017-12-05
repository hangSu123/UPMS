var express = require('express');
var router = express.Router();
var connect = require('./conn');


router.get('/', function(req, res, next) {
	  res.render('coord/index');  
});


router.get('/getAnnouncement/:userId', function(req, res, next) {
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
  
});

router.get('/getCalandar/:userId', function(req, res, next) {
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
  
});

router.get('/getCalandar/:userId/:Id', function(req, res, next) {
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
  
});



router.get('/createAnnouncement/:userId/:title/:content/:time', function(req, res, next) {
	connect().connect(function(err) {
	  if (err) res.send("0");
	  var sql = "INSERT INTO announcements (userId,title,content,date) VALUES ('"+req.params.userId+"','"+req.params.title+"','"+req.params.content+"','"+req.params.time+"'	)";
	  connect().query(sql,function(err,result){
	  	if (err) res.send("1");
	  	 res.send("2");
	  })
	});
  
});


router.get('/groups', function(req, res, next) {
  res.render('coord/groups');
});
router.get('/groups_detail', function(req, res, next) {
  res.render('coord/groups_detail');
});
router.get('/project', function(req, res, next) {
  res.render('coord/project');
});
router.get('/meeting', function(req, res, next) {
  res.render('coord/meeting');
});
router.get('/profile', function(req, res, next) {
  res.render('coord/profile');
});
router.get('/project_detail', function(req, res, next) {
  res.render('coord/project_detail');
});
router.get('/upload_project', function(req, res, next) {
  res.render('coord/upload_project');
});
router.get('/assessments', function(req, res, next) {
  res.render('coord/assessments');
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


    function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
      var sqlDateArr1 = sqlDate.split("-");
      //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
      var sYear = sqlDateArr1[0].substr(1,4);
      var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
      var sqlDateArr2 = sqlDateArr1[2].split("T");
      //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
      var sDay = (Number(sqlDateArr2[0]) + 1).toString();
      return sYear+"-"+sMonth+"-"+sDay;
    }






module.exports = router;