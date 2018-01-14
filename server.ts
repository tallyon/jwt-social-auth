import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

let app = express();

const port = 8080;

// Routes
import * as AuthCallbackFacebook from "./routes/authCallbackFacebook";

app.all("*", (req, res, next) => {
    console.log(new Date().toUTCString() + ": " + req.ip + " " + req.method + " " + req.url);
    next();
});

app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true, type: "application/x-www-form-urlencoded"}));

// Serve static page for app index
app.use("/app", express.static(path.join(__dirname, "app")));

app.use("/authCallback/facebook", AuthCallbackFacebook.router);

app.use("/", (req, res, next) => {
    res.status(200).write("It's alive!");
    res.end();
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500);
    res.json({error: err.message});
});

let server = app.listen(port, () => {
    console.log("listening on " + port);
});
