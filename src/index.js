require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
// const cookieParser = require("cookie-parser");
// const jwt = require("express-jwt");
const apiRouter = require("./api/index");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(logger("dev"));

// app.use(cookieParser());
// app.use(
//     jwt({
//         secret: process.env.SECRET_KEY,
//         getToken: (req) => req.cookies.token,
//         algorithms: ['HS256']
//     })
// );

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    return res.status(err.statusCode || 500).json({ message: err.message });
});

const server = app.listen(port, () => {
    console.log("listening on port", port);
});

module.exports = { server };
