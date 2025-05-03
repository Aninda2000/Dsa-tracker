const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=0");
  next();
});

app.use(
  cors({
    origin: "http://16.170.224.192:5000",
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");
  console.log("Serving React frontend from:", buildPath);
  app.use(express.static(buildPath));

  app.use((req, res, next) => {
    if (
      req.method === "GET" &&
      !req.path.startsWith("/api") &&
      !req.path.includes(".")
    ) {
      res.sendFile(path.join(buildPath, "index.html"));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
