const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const app = express();
const ideaRoutes = require("./routes/idea.routes");
const path = require('path');

app.use(
  cors({
    origin: ["https://projectshemanages.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const URI = process.env.MongoDBURI;

// Serve files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// connect to mongoDB
try {
  mongoose.connect(URI);
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
}

app.use("/api/ideas", ideaRoutes);
app.use("/user", userRoute);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// http://localhost:8080/api/ideas/
