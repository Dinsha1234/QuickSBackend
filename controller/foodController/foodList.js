const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { Router } = require("express");
const multer = require("multer");

const router = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload/food-details",
  upload.single("image"),
  (req, res, next) => {
    const { name, price } = req.body;
    const image = req.file;

    const uploadParams = {
      Bucket: "quickservebucket",
      Key: `images/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    try{
        new Upload({
            client: new S3Client({region: 'us-east-1'})
        },
        uploadParams)
    }catch(err){

    }
    console.log("name", name);
    console.log("price", price);
    console.log("image", image);
  }
);

module.exports = router;
