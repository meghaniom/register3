const express = require("express");

const router = express.Router();
const useController = require("../controllers/userContoller")



 router.post('/signup', useController.register)
router.post('/login', useController.login)


 module.exports = router;