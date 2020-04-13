const router = require("express").Router()
const { validateToken } = require("../../auth/token_validation")
const { createUser, getAllUsers, getSingleUser,updateSingleUser,deleteSingleUser,login } = require("./user.controller")

router.post("/",validateToken,createUser)
router.get("/",validateToken,getAllUsers)
router.get("/:id",validateToken,getSingleUser)
router.patch("/:id",validateToken,updateSingleUser)
router.delete("/:id",validateToken,deleteSingleUser)
router.post("/login",login)

module.exports = router

