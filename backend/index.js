// APP
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./src/routes')

const app = express()

// accept req from 5173 (vite default port) (react frontend)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use("/api/v1", routes)

/*
app.use(errorHandler) // import from middlewares
export default app // if separate server file is used
 */

//=======================================================================

// SERVER
// import app from './app'; // if separate app file is used
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/*

const contohRouter = require('./src/routes/contoh');
const bukuRouter = require('./src/routes/buku');
const bukuRawRouter = require('./src/routes/bukuRaw');
const bukuORMRouter = require('./src/routes/bukuORM');
const contohRelasiRouter = require('./src/routes/contohRelasi');
const contohValidasiRouter = require('./src/routes/contohValidasi');
const contohAxiosRouter = require('./src/routes/contohAxios');
const authRouter = require('./src/routes/auth');
const contohMiddlewareRouter = require('./src/routes/contohMiddleware');
const uploadFileRouter = require('./src/routes/uploadFile');

app.get("/api/v1", (req, res) => res.send('Hello World!'))
app.use("/api/v1/contoh", contohRouter);
app.use("/api/v1/buku", bukuRouter);
app.use("/api/v1/bukuRaw", bukuRawRouter);
app.use("/api/v1/bukuORM", bukuORMRouter);
app.use("/api/v1/contohRelasi", contohRelasiRouter);
app.use("/api/v1/contohValidasi", contohValidasiRouter);
app.use("/api/v1/contohAxios", contohAxiosRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contohMiddleware", contohMiddlewareRouter);
app.use("/api/v1/uploadFile", uploadFileRouter);

const initApp = async () => {
  console.log("Membuka Koneksi...");
  try {
      await databaseBuku.authenticate()
      console.log("Koneksi Berhasil");

      app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  } catch (error) {
      console.error("Gagal konek database", error.original);
  }
}

initApp();
*/
