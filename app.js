const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);


app.get("/",(req, res) => {
    res.json({message: "welcome to contact book application."});

});

//handle 404 respone
app.use((req, res, next) => {
    return next(new ApiError(404, "Resoure not found"));
});
app.use((err, req, res, next) => {
    // middleware xu ly loi tap trung
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;