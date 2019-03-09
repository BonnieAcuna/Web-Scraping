const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.set('views', __dirname + '/views');
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "handlebars");

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true});

app.get("/scrape", function(req, res) {
    axios.get("http://www.cnn.com/").then(function(response) {
        const $ = cheerio.load(response.data);
        $("article h3").each(function(i, element) {
            const result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
    dbArticle.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/delete/:id", function (req, res) {
    dbNote.remove({"_id":req.params.id})
    .then(function (error) {
      if (error) {
        console.log(error);
      }
      else {
        console.log("note deleted");
        res.redirect("/" );
      }
    });
  });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});