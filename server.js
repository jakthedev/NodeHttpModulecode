const http = require('http'); 

const hostname = 'localhost'; 
const port = 3000; 

const server  = http.createServer((req, res) => {
    // This request handler is called everytime the server recieves a request.  
    // The request objects are special types of objects called string  
    // With strings data is not transmitted all at once but in chucks  
    // so the responds object is already created when the object is recieved, This is why we dont  
    // Need to create it. The request can come from any client side application.  
    console.log(req.headers); 
    res.setHeader = 200; 
    res.setHeader('Content-Type', 'text/html'); 
    res.end('<html><body><h1>Hello World!</h1></body></html>');
}); 

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});