# Web-Scraping

## Programs Installed
  * Express
  * Express-Handlebars
  * Morgan
  * Mongoose
  * Axios
  * Cheerio
  
## Getting Started

## Scraping Articles

In the server.js file, the app will issue a get request through the website www.nytimes.com/section/us for articles.  It will scrape all the articles that share the same class name.  It will scrape the title, a url link, and a summary of the article.  It will than show all the articles on the dom through the index.handlebars page.

## Saving Articles

Once the articles are scraped, there is a save button with each article.  Once pressed, the article will save in the save articles.  When the user goes to the save articles page, it will show all the articles that were saved.  All of the saved articles show up on the dom through the saved.handlebars page.  

## Notes

With each saved article there is an option to write a note for the article.  The note can be saved and than, if the user would like, be deleted.  

## Heroku App

https://peaceful-tor-85079.herokuapp.com/

## Portfolio

[Portfolio](https://bonnieacuna.github.io/Updated-Portfolio/)-Updated Portfolio
