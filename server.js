var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles ={ 
'article-one':{
    title:'Article One | md didar',
    heading:'Article One',
    date:'Feb10,2017',
    content:`
                    <p>
                        This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.
                    </p>
                    <p>
                        This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.
                    </p>
                    <p>
                        This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.This is my first webapp.
                    </p>`
},
'article-two':{
   title:'Article two | md didar',
    heading:'Article two',
    date:'Feb11,2017',
    content:`
                    <p>
                        This is the content of my second article.
                    </p>` 
},
'article-three':{
 title:'Article three | md didar',
    heading:'Article three',
    date:'Feb12,2017',
    content:`
                    <p>
                        This is the content of my third article.
                    </p>`    
}
};

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
var htmlTemplate= `
<html>
    <head>
        <title>
            ${title}
        </title>
            <meta name="viewpoint" content="width=device-width,initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <o href="/">Home</o>
            </div>
            <hr/>
            <h3>
                ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
                    </div>
        </body>
</html>`
;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter,toString());
})

app.get('/:articleName', function (req, res) {
    //articleNname=article-one
    //articles[articleName]={}content object for article one
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
//to read the javascript main.js is written instead of style.css
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
