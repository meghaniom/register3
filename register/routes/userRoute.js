const express = require("express");
const router = express.Router();
const useController = require("../controllers/userContoller")



 router.post('/signup', useController.register)





 module.exports = router;