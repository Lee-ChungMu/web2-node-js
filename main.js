var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, descripion){
      var template = `
      <!doctype html>
      <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-175329272-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-175329272-1');
      </script>

        </head>

        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li><br>
          </ol>

          <h2>${title}</h2>
          <p>${descripion}</p>
        </body>
      </html>

      `;
      response.end(template);
    })


});
app.listen(3000);
