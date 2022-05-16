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

app.post("/upload", async (req, res, next) => {
  const file = req.files.photo;
  var arr = [];
  for (let index = 0; index < file.length; index++) {
    await cloudinary.uploader.upload(file[index].tempFilePath,function(err,result){
      if (result) { arr.push(result.url);}
    });
  }

  res.send({
    success:true,
    url: arr
  });

  
});
/* app.post("/upload", function (req, res, next) {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
    res.send({
      success: true,
      result
    })
  });
}); */

  app.listen(3000, () => {
    console.log("started on port : 3000");
  });