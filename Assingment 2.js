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
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var charge = 0;
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (Math.sign(query['checks'])<0||isNaN(query['checks'])==true)
    {
      throw Error('Invalid value for checks')
    }
    if (Number.isInteger(+query['savingsBal'])==false)
    {
     throw Error("Invalid value for savingsBal");
    }
    if (Number.isInteger(+query['checkBal'])==false)
    {
     throw Error("Invalid value for checkBal");
    }
    if (query['savingsBal'] == undefined)
    {
      throw Error("A perameter is missing savingsBal must be specified");
    }
    if (query['checkBal'] == undefined)
    {
      throw Error("A perameter is missing checkBal must be specified");
    }
     if (query['checks'] == undefined)
    {
      throw Error("A perameter is missing checks must be specified");
    }
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
    var result = {};
    if (query['cmd'] == 'CalcCharge')
    {
      result = serviceCharge(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function serviceCharge(query)
{
  if (query['checkBal']>1000 || query['savingsBal']>1500)  
  {
    
  var result = {'charge' : 0}; 
  return result;
  }
  else
  { 
    var charge = (query['checks'])*0.15;
    var result = {'charge' : charge}; 
    return result;
    
  }


}