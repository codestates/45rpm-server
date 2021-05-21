const customsController = require("../../controllers");

import { router } from "../index";

router.get("/my-customs", customsController.customs.getmycustoms);
router.delete("/delete", customsController.customs.deletecustoms);
router.get("/shared", customsController.customs.getallsharedcustoms);
router.post("/add-custom", customsController.customs.createnewcustoms);
router.patch("/share-custom", customsController.customs.changesharestate);

module.exports = router;
