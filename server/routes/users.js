const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user_controler");

router.get("/",usercontroller.view);
router.get("/adduser",usercontroller.adduser);
router.post("/adduser",usercontroller.save);


router.get("/edituser/:id",usercontroller.edituser);
router.post("/edituser/:id",usercontroller.save_changes);

router.get("/deleteuser/:id",usercontroller.deleteuser);
module.exports = router;