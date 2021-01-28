const proxy = require('express-http-proxy');
const express = require("express");
const usersRouter = require("./users/users.router");
const tableauRouter = require("./tableau/tableau.router");
var xFrameOptions = require('x-frame-options')

const app = express();
app.use("/users", usersRouter);
// app.use(xFrameOptions())

/* use tableauRouter */
app.use("/tableau", tableauRouter);

/* use proxy */
// app.use("/tableau", proxy("https://dub01.online.tableau.com/t/herolopoc/views/poc/Sheet1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link"));

module.exports = app;
