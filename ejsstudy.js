const express = require('express')
var app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname+'/public'))
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
  });
  
//HOME
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

//REGISTER
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.post('/register',(req,res)=>{
    const name = req.body.name;
    const department = req.body.department;
    const email= req.body.email;
    const phone = req.body.phone;
    const year = req.body.year;
    const graduation = req.body.graduation;

connection.query(`INSERT INTO studentdetails(name,department,email,phone,year,graduation)VALUES('${name}','${department}','${email}',${phone},${year},'${graduation}')`);

res.redirect('/employee')
})


//EMPLOYEE
app.get('/employee',(req,res)=>{
    
    //display data to ejs from db
    connection.query(('select * from studentdetails'),function(err,data){
        if(err){
            throw err;
        }
        else{
            res.render('employee.ejs',{myObj:data})
        }
    })  
    })
    
//EDIT

app.get('/edit/:name',(req,res)=>{
    // res.send(req.params.id)
       connection.query(`select * from studentdetails where name='${req.params.name}'`,function(err,data){
        if(err){
            throw err;
        }
        else{
            
            res.render('edit.ejs',{myObj:data})
         
        }
    })  
})

//UPDATE
app.post('/edit/:name',(req,res)=>{
    const name = req.body.name;
    const department = req.body.department;
    const email= req.body.email;
    const phone = req.body.phone;
    const year = req.body.year;
    const graduation = req.body.graduation;
// const userId = req.body.userId;
connection.query(`update studentdetails set name='${name}',department ='${department}',email='${email}',phone=${phone},year=${year},graduation='${graduation}'  where name='${req.body.name}'`)//
res.redirect('/employee')
})

//DELETE
    app.get("/delete/:name",(req,res)=>{
        console.log("inside delete")
        connection.query(`delete from studentdetails where name= '${req.params.name}'`,function(err,_data){ //${req.params.name}
            if(err){
                throw err;
            }
            else{
                res.redirect('/employee');
            }
        })
       
    })



console.log("http://localhost:4000/")
app.listen(4000)