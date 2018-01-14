import * as express from "express";
export let router = express.Router();

router.get("/", (req, res) => {
    let userID: string = req.query.userID;
    let authToken: string = req.query.authToken;

    return res.status(200).json({userID: userID, authToken: authToken}).end();
});
