var express = require('express');
var router = express.Router();
var connect = require('./con');


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
	  		temp += announcementTemp(result[i].title,result[i].content,result[i].date);
	  	}
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
                                      <span>Time: '+time+'<span>\
                                </div>\
                            </div>';

        return announcementTemp;
    }



module.exports = router;