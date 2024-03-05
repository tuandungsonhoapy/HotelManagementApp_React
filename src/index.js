require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

const port = process.env.PORT || 8080;
//config template engine
configViewEngine(app);

app.use(morgan("combined"));

// Khai báo routes
app.use("/", webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
