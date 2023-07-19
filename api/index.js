require('dotenv').config();
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");


var corsOptions = {
    origin: "*",
};

mongoose.connect(process.env.MONGO_CONNECTION_URL)

const app = express()
app.use(express.json())
app.use(cors(corsOptions));

//require("./routes/authRoute")(app);


const routesFolderPath = "./routes";
const routeFiles = fs.readdirSync(routesFolderPath);

routeFiles.forEach((file) => {
    const routeFilePath = `${routesFolderPath}/${file}`;
    require(routeFilePath)(app);
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

