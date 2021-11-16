// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const parser = require("xml2json");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

 dotenv.config();
 fs.readFile('/var/log/mrefd.xml', function(err, data) {
     var json = parser.toJson(data);
     console.log("to json ->", json);
 });
 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");
 app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    res.render("index", { title: "Home", sysopEmail: process.env.SYSOP_EMAIL });
});

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "KC1AWV" } });
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
})