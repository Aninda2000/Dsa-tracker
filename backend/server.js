const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Assuming auth routes
const progressRoutes = require("./routes/progress"); // Assuming progress routes
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // or '*' for testing only
  credentials: true // if you're sending cookies
}));
app.use(express.json());
app.use(helmet());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");
  console.log("Serving React frontend from:", buildPath);
  app.use(express.static(buildPath));

  // const frontendRoutes = ["/", "/login", "/register"];

  // frontendRoutes.forEach((route) => {
  //   app.get(route, (req, res) => {
  //     res.sendFile(path.join(buildPath, "index.html"));
  //   });
  // });
  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api') &&
      !req.path.includes('.')
    ) {
      res.sendFile(path.join(buildPath, 'index.html'));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
