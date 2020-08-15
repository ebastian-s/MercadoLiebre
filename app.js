// ************ Require's ************
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE


const app = express();

//   middlewares
app.use(express.static(path.join(__dirname, "public"))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//   ruteo  
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");

app.use("/", mainRouter);
app.use("/products", productsRouter);
//  404 errors
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Pagina de errores
    res.status(err.status || 500);
    res.render("error");
});


module.exports = app;