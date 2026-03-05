const express = require("express")
const controller = require("../controllers/user.controller")

const router = express.Router()

// public lookup by username
router.get("/:username", controller.getByUsername)

module.exports = router