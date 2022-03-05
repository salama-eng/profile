const { Router } = require("express");
const { render } = require("express/lib/response");

const mogoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const education = require("../models/education");
const pagecontent = require("../models/pagecontent");
const work = require("../models/work");
const skills = require("../models/skills");
const router = Router();

/*******************Connection process ***************** */

const options = {
  //  useNewUrlParser: true,
  //useUnifiedTopology: true,
  //serverSelectionTimeoutMS: 5000,
  //autoIndex: false, // Don't build indexes
  //maxPoolSize: 10, // Maintain up to 10 socket connections
  //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
mogoose
  .connect("mongodb://localhost:27017/profile", options)
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    // console.log(error);
  });

/********** the storage ********* */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    )
      cb(null, "public/images/");
    else if (file.mimetype == "application/pdf") cb(null, "public/pdf/");
  },
  filename: (req, file, cb) => {
    var extension = file.originalname.split(".");
    var ext = extension[extension.length - 1];

    //var uploaded_file_name =Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;
    var uploaded_file_name =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      ext;

    cb(null, uploaded_file_name);
  },
});
/***/ //////////storage end ////////////// */

/****************  uploading process ***************** */

const upload = multer({
  storage: storage,

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else callback(null, false);
  },
  limits: 1024 * 1024 * 5,
});

/****************  uploading process ***************** */


/***********************page content ********************* */

router.get("/pagecontent", (req, res) => {
  pagecontent.find().then((reslut) => {
    res.render("pagecontent", {
      pagecontent: reslut
    });
  });
});





router.post("/edite_pagecontent", upload.single("img"), (req, res) => {
  var hello={
    name:req.file.name,
     img:req.file.img,
    value:req.body.value
  }  
  var id =req.body.id;
  pagecontent.updateOne({"_id":id},{$set:hello},function(err,reslut)
  {
    console.log("updated");
  })





  res.redirect('/pagecontent');
  });
  






/**********Listing education********* */
router.get("/education", (req, res) => {
  education.find().then((reslut) => {
    res.render("education", {
      education: reslut
    });
  });
});


router.get('/delete_education/:id', function(req, res, next) {	
	education.deleteOne({"_id": req.params.id}, function(err, result) {
		res.redirect('/education')
	})
})

/*******************/

router.post("/edite_education", async (req, res) => {
var add_educaton={
  s_name: req.body.s_name,
  degree: req.body.degree,
  date: req.body.date,
  description: req.body.description,
}  
var id =req.body.id;
education.updateOne({"_id":id},{$set:add_educaton},function(err,reslut)
{

  console.log("updated");

})
res.redirect('/education');
});

/*************** ADD education ******************* */



router.post("/add_education", (req, res) => {
  // console.log(req.file.filename);


  const edu = new education({
    s_name: req.body.s_name,
    degree: req.body.degree,
    date: req.body.date,
    description: req.body.description,
  });
  edu.save((error, result) => {
     if (error)
    console.log(error.message);
   else {
  console.log(result);
    }
  });

  console.log("data inserted successful");
  res.redirect("/education");
  res.end();
});

/* GET index page. */
router.get("/", (req, res) => {
  pagecontent.find().then((reslut) => {
    res.render("index", {
      pagecontent: reslut
    });
    work.find().then((reslut) => {
      res.render("index", {
        work: reslut
      });
      skills.find().then((reslut) => {
        res.render("index", {
          skills: reslut
        });



  });
  
  
});
/***********Skills************* */




router.get("/skills", (req, res) => {
  skills.find().then((reslut) => {
    res.render("skills", {
      skills: reslut
    });
  });
});



router.post("/add_skill", upload.single("img"), (req, res) => {


  const skill_add = new skills({
    skill_title: req.body.skill_title,
    img: req.file.filename,
  });
  skill_add.save((error, result) => {
    // if (error)
    //   console.log(error.message);
    // else
    //   console.log(result);
  });

  console.log("data inserted successful");
  res.redirect('/skills');
  res.end();
});



router.get('/delete_skill/:id', function(req, res, next) {	
	skills.deleteOne({"_id": req.params.id}, function(err, result) {
		res.redirect('/skills')
	})
})


/*************Editing work *********** */

router.post("/edite_skill", upload.single("img"), (req, res) => {
  
  var item={
    skill_title: req.body.skill_title,
   
    img:req.file.img,
   
  }  
  
  var id =req.body.id;
 
  skills.updateOne({"_id":id},{$set:item},function(err,reslut)
  {
  
    console.log("updated");
  
  })
  res.redirect('/skills');
  });
  













/************* Adding experiance ****************** */


/********  ADD work ********  */


router.post("/add_work", upload.single("img"), (req, res) => {


  const work_add = new work({
    project_title: req.body.project_title,
    project_name: req.body.project_name,
    img: req.file.filename,
  });
  work_add.save((error, result) => {
    // if (error)
    //   console.log(error.message);
    // else
    //   console.log(result);
  });

  console.log("data inserted successful");
  res.redirect('/work');
  res.end();
});



router.get('/delete_work/:id', function(req, res, next) {	
	work.deleteOne({"_id": req.params.id}, function(err, result) {
		res.redirect('/work')
	})
})




/*************Editing work *********** */

router.post("/edite_work", upload.single("img"), (req, res) => {
  console.log("updated");
  var item={
    project_title: req.body.project_title,
    project_name: req.body.project_name,
    img:req.file.img,
   
  }  
  
  var id =req.body.id;
 
  work.updateOne({"_id":id},{$set:item},function(err,reslut)
  {
  
    console.log("updated");
  
  })
  res.redirect('/work');
  });
  



/*******listing work************ */
router.get("/work", (req, res) => {
  work.find().then((reslut) => {
    res.render("work", {
      work: reslut
    });
  });
});





/*************************** */

/* GET index page. */
router.get("/", (req, res) => {
  res.render("index");
});

/********************************* */

router.get("/cv", (req, res) => {
  res.render("cv");
  res.end();
});

router.get("/experiance", (req, res) => {
  res.render("experiance");
  res.end();
});




router.get("/education", (req, res) => {
  res.render("education");
  res.end();
});

router.get("/dash", (req, res) => {
  res.render("dash");
  res.end();
});

function auth(req, res, next) {
  next();
}

module.exports = router;
