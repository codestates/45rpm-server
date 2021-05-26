const customsController = require("../../controllers");
const upload = require("../../middleware/upload");
const jwtMiddleware = require("../../middleware/jwt");

import { router } from "../index";

router.get(
  "/my-customs",
  jwtMiddleware,
  customsController.customs.getmycustoms,
);
router.get(
  "/getalbumphoto",
  jwtMiddleware,
  customsController.customs.getmycustoms,
);
router.get(
  "/getrecordphoto",
  jwtMiddleware,
  customsController.customs.getmycustoms,
);
router.delete(
  "/delete",
  jwtMiddleware,
  customsController.customs.deletecustoms,
);
router.get("/shared", customsController.customs.getallsharedcustoms);
router.post(
  "/add-custom",
  upload.fields([{ name: "albumPic" }, { name: "recordPic" }]),
  jwtMiddleware,
  customsController.customs.createnewcustoms,
);
router.patch(
  "/share-custom",
  jwtMiddleware,
  customsController.customs.changesharestate,
);

module.exports = router;
