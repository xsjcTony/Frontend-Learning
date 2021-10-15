const http = require("http");

http.createServer(function (req, res) {
    if(req.url.startsWith("/api/user") && req.method.toLowerCase() === "get"){
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("知播渔666");
    }else if(req.url.startsWith("/api/login") && req.method.toLowerCase() === "get"){
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("指趣学院666");
    }
}).listen(3000);