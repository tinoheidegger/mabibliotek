if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json());
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//connect to mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
