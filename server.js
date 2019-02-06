var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var max = Math.max(query);
      var min = Math.min(query);
      
    for(var i = 0; i < query.length; i++) {
    sum += query[i];
    }
      var avg = sum / query.length;
      res.write('<pre>'+avg+'</pre>');
      res.end('');
    }
    else
    {
      res.end('');
    }
}