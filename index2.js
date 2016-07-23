var express= require('express');
var app= express();
var body_parser=require('body-parser');
var fs  =  require('fs');

app.set('port' ,process.env.PORT || 8080);
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.use('/', express.static('public_html'));

var todos=[];

app.post('/initial',function(req,res)
{

    fs.readFile('./sample.html',function(err,data)
    {
        if(err)
            console.log(err);
        var str = data.toString();

        if(str!='')
        {
            todos = JSON.parse(str);
            res.send(todos);
        }

        else
            res.send(null);
    });

});


app.post('/addtodo',function(req,res)
{
    fs.readFile('./sample.html',function(err,data)
    {

        if(err)
            console.log(err);
        var str = data.toString();
        if(str!='')
            todos = JSON.parse(str);

    });


    var obj ={};
    obj.data = req.body.value;
    obj.done = 0;
    todos.push(obj);
    var str = JSON.stringify(todos);

    fs.writeFile('./sample.html',str,function(err)
    {
        if(err)
            console.log(err);
    });

    res.send(todos);
})


app.post('/click',function(req,res)
{
    fs.readFile('./sample.html',function(err,data)
    {
        if(err)
            console.log(err);
        var str = data.toString();
        if(str!='')
            todos = JSON.parse(str);

    });

    for(var i=0;i<todos.length;i++)
    {
        if(todos[i].data == req.body.text && todos[i].done == false)
        {
            todos[i].done = 1;
            break;
        }
    }


    var str = JSON.stringify(todos);

    fs.writeFile('./sample.html',str,function(err)
    {
        if(err)
            console.log(err);
    });


    res.send(todos);

})


app.post('/clear',function(req,res)
{

    fs.readFile('./sample.html',function(err,data)
    {
        if(err)
            console.log(err);
        var str = data.toString();
        if(str!='')
            todos = JSON.parse(str);

    });

    var arr =[];
    for(var i=0;i<todos.length;i++)
    {
        if(todos[i].done == false)
        {
            arr.push(todos[i]);
        }
    }

    todos = arr;
    var str = JSON.stringify(todos);
    fs.writeFile('./sample.html',str,function(err)
    {
        if(err)
            console.log(err);
    });
    res.send(todos);

});


app.listen(3000,function () {
    console.log("server started and listening at port 3000");
});


