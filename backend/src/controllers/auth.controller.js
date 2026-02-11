const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../utils/password")
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body

  const existing = await userModel.findByUsername(username)
  if (existing) return res.status(400).json({ message: "User already exists" })

  const hashed = await hashPassword(password)
  const user = await userModel.createUser(username, hashed)

  res.status(201).json(user)
}

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body

  const user = await userModel.findByUsername(username)
  if (!user) return res.status(400).json({ message: "Invalid credentials" })

  const valid = await comparePassword(password, user.password)
  if (!valid) return res.status(400).json({ message: "Invalid credentials" })

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  await userModel.saveRefreshToken(user.id, refreshToken)

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json({ accessToken })
}

// REFRESH TOKEN
exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

    const user = await userModel.findById(decoded.id)
    if (!user || user.refresh_token !== token)
      return res.status(403).json({ message: "Forbidden" })

    const accessToken = generateAccessToken(user)
    res.json({ accessToken })

  } catch {
    res.status(403).json({ message: "Invalid refresh token" })
  }
}

// LOGOUT
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      await userModel.saveRefreshToken(decoded.id, null)
    } catch {}
  }

  res.clearCookie("refreshToken")
  res.json({ message: "Logged out" })
}
