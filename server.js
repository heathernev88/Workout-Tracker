const express = require("express");
const mongoose = require("mongoose");
const htmlRoutes = require("./routes/html/htmlRoutes")
const apiRoutes = require("./routes/api/apiRoutes")
const PORT = process.env.PORT || 4000;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(htmlRoutes);
app.use(apiRoutes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shrouded-escarpment", {useNewUrlParser: true, useUnifiedTopology: true });


  app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`)
  });