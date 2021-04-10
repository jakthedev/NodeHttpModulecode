const http = require('http'); 

const hostname = 'localhost'; 
const port = 3000;  

const path = require('path'); 
const fe = require('fs'); 


const server  = http.createServer((req, res) => {
    // This request handler is called everytime the server recieves a request.  
    // The request objects are special types of objects called string  
    // With strings data is not transmitted all at once but in chucks  
    // so the responds object is already created when the object is recieved, This is why we dont  
    // Need to create it. The request can come from any client side application.  
    console.log(`Request for ${req.url} by method ${req.method}`); 

    if (req.method === 'GET') {
        let fileUrl = req.url 
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl); 
        const fileExt = path.extname(filePath); 
        if (fileExt === '.html') {
            // checking to see if file exist on server.  
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404; 
                    res.setHeader('Content-Type', 'text/html'); 
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found </h1></body></html>`); 
                    return;
                }
                res.statusCode = 200; 
                res.setHeader('Content-Type', 'text/html');

                fs.createServer(filePath).pipe(res);
            });
        } else {
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/html'); 
        res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);

        }
    } else {
        res.sttusCode = 404; 
        res.setHeader('Content-Type', 'text/html'); 
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);

    }
    

}); 

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});