const express = require("express");
const http = require("http");
const socketSetup = require("./socketSetup");
const postRoutes = require("./routes/postRouter");
const GlobalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successfull"));

app.use("/post", postRoutes);

// Error handling middleware...
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});
app.use(GlobalErrorHandler);

const server = http.createServer(app);
socketSetup(server); // Pass the server instance to Socket.IO setup module

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
