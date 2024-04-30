const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController.js')
const verifyJWT=require('../middlewares/auth.middleware.js')



router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route("/logout").post(verifyJWT, userController.logoutUser)
router.route("/refresh-token").post(userController.refreshAccessToken)
router.route("/current-user").get(verifyJWT, userController.getCurrentUser)

module.exports=router;