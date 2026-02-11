const pool = require("../config/db")

const findByUsername = async (username) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  )
  return rows[0]
}

const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  )
  return rows[0]
}

const createUser = async (username, password) => {
  const { rows } = await pool.query(
    `INSERT INTO users (username, password)
     VALUES ($1, $2)
     RETURNING id, username`,
    [username, password]
  )
  return rows[0]
}

const saveRefreshToken = async (userId, token) => {
  await pool.query(
    "UPDATE users SET refresh_token = $1 WHERE id = $2",
    [token, userId]
  )
}

module.exports = {
  findByUsername,
  findById,
  createUser,
  saveRefreshToken
}
