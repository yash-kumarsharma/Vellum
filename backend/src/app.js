const express = require("express")
const cors = require("cors")
const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middlewares/error.middleware");
const formRoutes = require("./modules/forms/forms.routes");
const questionRoutes = require("./modules/questions/questions.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use(errorHandler);
app.use("/api/forms", formRoutes);
app.use("/api/questions", questionRoutes);

app.get("/health", (req, res)=>{
    res.status(200).json({status: "OK", service: "FormForge API"});
});

module.exports = app;