const express=require('express')
const fs=require('fs')
const PORT=9911;
const app=express();
app.set('view engine','pug');
app.set('views','./views');
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/services",(req,res)=>{
    res.render("services")
})

app.post("/contactdata",(req,res)=>{
    // res.send("file is created");
    let fname=req.body.fname;
    let lname=req.body.lname;
    let email=req.body.email;
    let phone=req.body.phone;
    let message=req.body.message;
    let data=`
<tr>
    <td>${fname}</td>
    <td>${lname}</td>
    <td>${email}</td>
    <td>${phone}</td>
<tr>
    `
    if(fs.existsSync(`./user`)){
        fs.appendFileSync(`./user/detail.pug`,data)
        res.redirect("/contact")
    }
    else{
        fs.mkdirSync(`./user/`);
        fs.writeFileSync(`./user/detail.pug`,`${data.toString()}`);
        res.send("CREATE FILE OF CONTACT")
    }
 })

app.get("/aboutus",(req,res)=>{
    res.render("aboutus")
})

app.get("/gallary",(req,res)=>{
    res.render("gallary")
})

app.get("/h",(req,res)=>{
    res.render("header")
})

app.get("/f",(req,res)=>{
    res.render("footer")
})

app.get("/contact_details",(req,res)=>{
    res.render("contact_details")
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`server working on ${PORT}`)
})