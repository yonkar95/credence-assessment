let express = require("express");
let apiController = require("../controller/ApiController");

var router=express.Router();

// router.route("/").get((req,res)=>res.status(200).send("Test API"));
router.route("/").get(apiController.getAll).post(apiController.create);
router.route("/:id").get(apiController.getOne).put(apiController.update).delete(apiController.delete);

module.exports=router;