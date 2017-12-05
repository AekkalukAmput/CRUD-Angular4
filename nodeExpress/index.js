var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlencodeParser = bodyParser.urlencoded({extended:false});

var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",

	database: "nodejs"

});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Hello Word');
});

app.post('/account_insert',urlencodeParser,function(req,res){
	//res.send('Hello Post : ' +req.body.account_number+"/"+req.body.branch_name+"/"+req.body.balance);
var sql = "INSERT INTO `account`(`account_number`, `branch_name`, `balance`) value('"+req.body.account_number+"','"+req.body.branch_name+"','"+req.body.balance+"')";
	res.send(sql);
	//ส่งข้อมูลไปยังdatabase
	con.query(sql,function(err,res){
		if(err){
			console.log("Error");
		}
		else{
		console.log("OK");
		}
	});

});
//แสดงข้อมูลในdatabase JSON
app.get('/getaccount',function(req,res){
	var sql = "SELECT * FROM account";
		con.query(sql,function(err,result){
			var tem = JSON.stringify(result);
			res.send(tem);
			console.log('GET Account Success');
		});
 });

app.get('/account_number/:id',function(req,res){
	var id = req.params.id;
	var sql = "SELECT * FROM account WHERE account_number = '"+id+"' ";
	console.log(sql);
	con.query(sql,function(err,result){
		var tem = JSON.stringify(result);
		res.send(tem);
		console.log('GET Account Success');
	});
});
app.get('/account_number/delete/:id',urlencodeParser,function(req,res){
	console.log(req.params.id);
	var id = req.params.id;
	console.log(id);
	var sql = "DELETE FROM account WHERE account_number = '"+id+"' ";
	console.log(sql);
	con.query(sql,function(err,result){
		if(err){
			console.log("Error");
		}
		res.redirect('http://localhost:4200/app-account');
		console.log('DELETE Account Success');
	});
});
app.post('/account_number/update',urlencodeParser,function(req,res){
	var acc = req.body.account_number;
	var bn = req.body.branch_name;
	var bal = req.body.balance;
	console.log(acc);
	var sql = "UPDATE account SET branch_name = '"+bn+"', balance = '"+bal+"' WHERE account_number = '"+acc+"' ";
	con.query(sql,function(err,result){
		if(err){
			console.log("Error");
		}
		res.send('Account Update');
		console.log('UPDATE Account Success');
	});
});

app.get('/user',function(req,res){
	res.send('Hello user');
});


app.listen(3000,function(){
	console.log("localhost:3000");
});
