const multer = require("multer");
const path = require("path");

//multer를 이용하여 파일을 업로드 할때 작동하는 미들웨어
const upload = multer({
  storage: multer.diskStorage({
    //저장 경로 지정
    destination(req, file, cb) {
      cb(null, path.join(__dirname + "/uploads"));
    },
    //저장시 파일 이름 지정
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  //업로드시 파일 사이즈 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
