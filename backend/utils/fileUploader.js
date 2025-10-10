const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function handleMulterUpload(req, res, field) { // Field is the name of the field in which we will have the image
    return new Promise((resolve, reject) => {
        const singleUpload = upload.single(field)
        singleUpload(req, res, function (err) { // singleUpload has a callback function as well
            if (err) return reject(err);
            resolve(req.file); // Multer gives req.file and req.body
        })
    })
}

module.exports = handleMulterUpload