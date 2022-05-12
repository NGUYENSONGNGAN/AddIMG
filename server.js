var express = require("express");
const app = express();
var fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
  })
);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dperokha9",
  api_key: "972859777227235",
  api_secret: "W09oiGrzGFq1H0i7vPSmJA_W5EY",
});

app.get("/", function (req, res, next) {
  console.log(111)
  res.status(200).send("Hello World");
});

app.post("/upload", function (req, res, next) {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath,function(err,result){
    res.send({
      success:true,
      result
    })
  });
  //console.log(file);
 /*  file.mv("./uploads" + file.name, function (err, result) {
    if (err) {
      throw err;
      res.send({
        success: true,
        message: "File uploaded !",
      });
    }
  }); */
});
app.listen(3000, () => {
  console.log("started on port : 3000");
});