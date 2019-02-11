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
    var grades = query['grades'];
    var count = 0;
    var text="";
    var word = query['word']
    var word1 = query['word1'];
    var word2 = query['word2'];

    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var parse = parseInt(grades);
      for (var i in query['grades'])
      {
        sum = sum + parseInt(query['grades'][i]);
        var count = 1+count;

      }
      var avg=sum/count;
      const max = Math.max(...grades);
      const min = Math.min(...grades);
    
      res.write('<pre>'+"Ave: "+avg+" Max: "+max+" Min: "+min+'</pre>');

      res.end('');
    }
        if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      for (i = 0,  text = ""; i < word.length; i++) 
      { 
  text += word + "<br>";
}
    
      res.write('<pre>'+text+'</pre>');

      res.end('');
    }
      if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var dotsize= 30-(word1.length + word2.length);
      var dots = '';
      for (var i = 0 ; i < dotsize; i++)
      dots = dots+'.';
      res.write('<pre>' +word1+ dots +word2+ '</pre>');
        res.end('');
    }
    else
    {
      res.end('');
    }
}