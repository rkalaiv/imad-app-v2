var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
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
       
    },
    'article-two' :{
         title : 'Article Two | Kalai',
        heading: 'Article Two',
        date: 'Feb 25, 2017',
        content: `
            <p>
                Content of article two here.
            </p>`
       
    },
    'article-three' :{
         title : 'Article Three | Kalai',
        heading: 'Article Three',
        date: 'Feb 26, 2017',
        content: `
            <p>
                Content of article three.
            </p>`
       
    }
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


var counter=0;
app.get('/counter',function(req,res) {

counter=counter+1;
res.send(counter.toString());
});


app.get('/:articlename', function (req, res) {
    var articlename=req.params.articlename;
  res.send(CreateTemplate (articles[articlename]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
