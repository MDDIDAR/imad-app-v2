var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'mddidar',
    database:'mddidar',
    host:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles ={ 
'Vision':{
    title:'Vision | md didar',
    heading:'Vision',
    date:'Feb10,2017',
    content:`
              <p>
              To make the Institute a centre of Excellence in the field of Engineering and Technical Education.
                </p> `

},
'Mission':{
   title:'Mission | md didar',
    heading:'Mission',
    date:'Feb11,2017',
    content:`
                    <p>
                        To impart quality and value based education to raise satisfaction level of all stake-holders.
                        To create competent, creative professionals, and great entrepreneurs who can work as individual or in group in multi-cultural global environments.
                        To prepare citizens who would grow to be competent enough to contribute significantly with personal integrity and civic responsibility for the betterment of mankind throughout their careers and profession.
                    </p>`
             
    
}, 

'Goal':{
 title:'Goal | md didar',
    heading:'Goal',
    date:'Feb12,2017',
    content:`
                    <p>
                       Impact education to students belonging to different strata of society irrespective of caste,gender,colour or creed.
                    </p>`    
},
'article-four':{
 title:'Article four | md didar',
    heading:'Article four',
    date:'Feb22,2017',
    content:`
                    <p>
                        This is the content of my fourth article.
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
            <a href="/">Home</a>
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

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            req.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    //submit-name?name-xxxxxx
    //get the name from the request
    var name=req.query.name;
    names.push(name);
    //JSON:Javascript object notation
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    //articleNname=article-one
    //articles[articleName]={}content object for article one
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
