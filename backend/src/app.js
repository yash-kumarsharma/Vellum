const express = require("express");
const cors = require("cors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Import API routes
const authRoutes = require("./modules/auth/auth.routes");
const formRoutes = require("./modules/forms/forms.routes");
const questionRoutes = require("./modules/questions/questions.routes");
const responseRoutes = require("./modules/responses/responses.routes");
const collaboratorRoutes = require("./modules/collaborators/collaborators.routes");
const exportRoutes = require("./modules/exports/exports.routes");

// Error handler middleware
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== API ROUTES ======
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/exports", exportRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "FormForge API" });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "FormForge API" });
});

// ====== ERROR HANDLER ======
app.use(errorHandler);

module.exports = app;
