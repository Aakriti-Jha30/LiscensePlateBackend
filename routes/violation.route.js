import { Router } from "express";
import { storeViolation } from "../contollers/violation.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getViolations } from "../contollers/getViolation.controller.js";

const router=Router();


router.route("/postViolation").post(
    upload.fields([
        {
            name: "violationImage", // This should match the name in your form-data
            maxCount: 1,
        },
    ]),
    storeViolation
);

router.route("/getViolations").get(getViolations);


export default router;

