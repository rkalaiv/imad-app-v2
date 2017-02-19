var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleone = {
    title : 'Article One | Kalai',
    heading: 'Article One',
    date: 'Feb 19, 2017',
    content: `
        <p>
            Content of article one. Content of article one
            Content of article one.Content of article one.Content of article one. Content of article one
        </p>
        <p>
            Content of article one. Content of article one
            Content of article one.Content of article one.Content of article one. Content of article one
        </p>
        <p>
            Content of article one. Content of article one
            Content of article one.Content of article one.Content of article one. Content of article one
        </p>`
       
        
            
};

function CreateTemplate(data) {

var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmltemplate = `
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=width-device , inital-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
        <style>
            
        </style> 
    </head>
    <body>
        <div class="container">
        <div>
            <a href ="/">Home</a>
        </div>
        <hr>
        <h2> ${heading}</h2>
        <div> ${date} </div>
        <div>
            ${content}
        </div>    
        </div>
    </body>
</html>

`;
return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req, res) {
  res.send(CreateTemplate(articleone));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
