const fs=require('fs');
const http=require('http');

const { threadId } = require('worker_threads');
const PORT=9999;

const server=http.createServer((req,res)=>{
    if (req.url=="/") {
        res.writeHead(200,{'Content-Type':'text/html'})
        let data=fs.readFileSync('./html/index.html');
        res.write(`${data}`)
        res.end();
    } else if(req.url=="/createfile") {
       if(fs.existsSync("neosoft.txt")){
        res.writeHead(200,{'Content-Type':'text/html'})
        let data1=fs.readFileSync('./html/create.html');
        res.write(`${data1}`)
        res.end();
     //   res.write(`<html><body><br><button><a href="index.html">Home</a><button></body></html>`)
        res.end();
        
       }
       else{
        fs.writeFile('neosoft.txt','Wellcome to Neosoft',(err)=>{
            if(err) throw err
            else res.end('File Created');
        })
        res.write(`<html><body><br><button><a href="index.html">Home</a><button></body></html>`)
       }
    }
    else if(req.url=="/readdata") {
       if(fs.existsSync("neosoft.txt")){
      let data =fs.readFileSync("neosoft.txt");
      res.end(data.toString());
       }
       else{
        res.end("file not created");
       }
    }
    else if(req.url=="/removefiledata") {
        if(fs.existsSync("neosoft.txt")){
          fs.unlinkSync("neosoft.txt");
            res.end("file removed");
        }
        else{
         res.end("file not exit");
        }
     }
     else if(req.url=="/index.html") {
        res.writeHead(200,{'Content-Type':'text/html'})
        let data1=fs.readFileSync('./html/index.html');
        res.write(`${data1}`)
        res.end();
     }
     else if(req.url=="/appenddata") {
        if(fs.existsSync("neosoft.txt")){
            fs.appendFileSync("neosoft.txt", "Append file hello world","utf8")
            res.end("append success");
      
     }
     else{
          res.end("file not exit !!...");
     }
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html'})
        let data1=fs.readFileSync('./html/404.html');
        res.write(`${data1}`)
        res.end();
    }
})
server.listen(PORT,(err)=>{
    if(err) throw err
    else console.log(`server is created ${PORT}`)
})