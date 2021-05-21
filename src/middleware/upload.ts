import multer = require("multer");
import path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) {
      cb(null, path.join(__dirname + "/uploads"));
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
