const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const response = require("../helper/response");

// // JIKA MENYIMPAN DATA DI DALAM PROJECT BACKEND

// Penyimpanan di cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jannah/Product",
  },
});

const fileFilter = (request, file, callback) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    callback(null, true);
  } else {
    return callback({
            message: 'Invalid file type. Only jpg, png image files are allowedd.'
        }, false);
  }
};

const file = multer({
  storage: storage,
  limits: {
    fileSize: 500000,
  },
  fileFilter: fileFilter,
});

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     //destinasi berisi error, dan lokasi penyimpanan data
//     cb(null, "public/upload/movie");
//   },
//   filename(req, file, cb) {
//     // untuk mengganti nama dan namanya di ganti sesuai dengan isi cb
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });

// UNTUK PENGECEKAN LIMIT DAN EKSTENSI BISA DITAMBAH DI MIDDLEWARE
// PROSES KONDISI LIMIT DAN CEK EKSTENSI FILE IN HERE

const upload = file.single("image");

const handlingUpload = async (request, res, next) => {
  await upload(request, res, (error) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return response(res,{
        status: 500,
        message: "Terjadi Error",
        error,
      });
      // limit = File to large
      // extensi = bisa di customize
    }
    if (error) {
      // An unknown error occurred when uploading.
      return response(res,{
        status: 400,
        message: "Error image",
        error: error.message,
      });
    }
    return next();
  });
};
module.exports = handlingUpload;