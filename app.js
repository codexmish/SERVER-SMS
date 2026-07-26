const express = require("express")
const cors = require("cors")
const router = require("./router")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)


app.get("/", (req, res) => {
  res.send("Hello World!");
});


module.exports = app