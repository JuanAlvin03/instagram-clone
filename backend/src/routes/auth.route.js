const express = require("express")
const controller = require("../controllers/auth.controller")

const router = express.Router()
// register worked
router.post("/register", controller.register)
// login worked
router.post("/login", controller.login)
router.post("/refresh", controller.refresh)
// logout worked
router.post("/logout", controller.logout)

module.exports = router
