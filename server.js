const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.set('views', __dirname + '/views');
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

mongoose.connect(MONGODB_URI);

app.get("/", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            
            res.render("index", { articles: dbArticle });
        })
        .catch(function (err) {
            console.log(err);
        });
});


    


app.get("/scrape", function (req, res) {
    console.log('hit');
    axios.get("https://www.nytimes.com/section/us").then(function (response) {
        let $ = cheerio.load(response.data);
        
        $(".css-ye6x8s").each((i, element) => {
            i === 0 && console.log();
            const link = 'https://www.nytimes.com/' + $(element).find('a').attr('href');
            const title = $(element).find('h2').text();
            const summary = $(element).find('p').text();
            const articleImg = $(element).find('img').attr('src');
            console.log(articleImg);
            

            const newArticle = {
                link,
                title,
                summary,
            }
            //We want to now create a new entry in our database

            db.Article.create(newArticle).then(res => console.log(res)).catch(err => console.log(err));
            
        })
        


        res.send("Scrape Complete");
    }).catch(err => console.log(err));
});

app.post("/save/:id", function(req, res) {
    
  db.Article.find({_id:req.params.id})
    .then(function(data) {
        data[0].saved = true;
        db.Article.create(data[0])
    })
})

app.get("/save", function (req, res) {
    db.Article.find({
      saved: true
    }).then(function (dbArticle) {
      res.render("save", {
        articles: dbArticle
      })
      }).catch(function(err){
        res.json(err); 
    })
  })

  app.put("/save/:id", function (req, res) {
    db.Article.findByIdAndUpdate(
        req.params.id, {
          $set: req.body
        }, {
          new: true
        }
      )
      .then(function (dbArticle) {
        res.render("save", {
          articles: dbArticle
        });
      })
      .catch(function (err) {
        res.json(err);
      });
  });


app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
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

app.delete("/delete/:id", function (req, res) {
    dbNote.remove({"_id":req.params.id})
    .then(function (article) {
      if (article) {
        console.log(article);
      }
      else {
        console.log("Note Deleted");
        res.redirect("/" );
      }
    });
  });

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});