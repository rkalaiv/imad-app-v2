var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto = require('crypto');
var bodyParser=require('body-parser');


var config={
user:'rkalaiv',
database:'rkalaiv',
host:'db.imad.hasura-app.io',
port:'5432',
password:'db-rkalaiv-92670'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
        <div> ${date.toDateString()} </div>
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

function hash(input,salt){

	var hashed= crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
	return ['pbkdf2','100000',salt,hashed.toString('hex')].join('$');


}



app.get('/hash/:input',function(req,res){

	var hashedString=hash(req.params.input,'this-is-the-random-string');
	res.send(hashedString);

});

app.post('/login',function(req,res){

    var username=req.body.username;
    var password=req.body.password;

    pool.query("SELECT * FROM 'user' where username=$1",[username],function(err,result){

    if(err){
        res.status(500).send(err.toString());
    }else{

    	if (result.rows.length===0){
		    res.send(403).send("username/password is invalid");
	    }else{

	        var dbstring=result.rows(0).password;
	        var salt=dbstring.split('$')[2];
	        var hashedpassword=hash(password,salt);
	        if (hashedpassword==dbstring){
		        res.send("credentials are correct");
        	}else{

		        res.send(403).send("username/password is invalid");
	        }
	
	    }

    }
});

});


app.post('/create-user',function(req,res){


    var username=req.body.username;
    var password=req.body.password;

    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(password,salt);
    pool.query("INSERT INTO 'user' (username,password) VALUES ($1,$2)",[username,dbstring],function(err,result){

    if(err){
        res.status(500).send(err.toString());
    }else
    {
        res.send("User successfully created " +username);
    }


});

});



var pool=new Pool(config);
app.get('/test-db',function(req,res) {

pool.query('SELECT * FROM test',function(err,result){
if(err){
res.status(500).send(err.toString());
}else
{
res.send(JSON.stringify(result.rows));
}



});

});


var counter=0;
app.get('/counter',function(req,res) {

counter=counter+1;
res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) {

var name=req.query.name;
names.push(name);
res.send(JSON.stringify(names));


});



app.get('/articles/:articlename', function (req, res) {
    var articlename=req.params.articlename;

pool.query("SELECT * FROM article where tittle=$1",[req.params.articlename],function(err,result){
	if(err){
			res.status(500).send(err.toString());
		}else{
			if (result.rows.length==0){
				res.status(404).send("Article Not Found");
			}else{
				var articlesData=result.rows[0];
				  res.send(CreateTemplate (articlesData));
			     }

		      }

});

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

app.get('/ui/doll.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Small_Peach_2.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
