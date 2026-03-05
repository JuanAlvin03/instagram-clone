const userModel = require("../models/user.model")

// get user by username (public)
exports.getByUsername = async (req, res) => {
  const { username } = req.params
  const user = await userModel.findByUsername(username)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }
  // return minimal public profile information
  res.json({ id: user.id, username: user.username, name: user.full_name || null })
}

