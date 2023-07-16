const express = require("express")

const app = express()

app.get("/test", (req, res) => {
    res.json({
        "message":"success"
    })
});

app.listen(8080);