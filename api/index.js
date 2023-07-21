const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const entryRoute = require("./routes/entryRoute");
const { errorHandlerMiddleware } = require("./middleware/errorHandler");
const connectToDB = require("./database/database");
const { createInitialRoles } = require("./controllers/roleController");

var corsOptions = {
  origin: "*",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", authRoute);
app.use("/entries", entryRoute);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDB(process.env.MONGO_CONNECTION_URL);
  await createInitialRoles();
});
