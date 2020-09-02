var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i=0;
  while(i<filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i=i+1;
  }
  list = list + '<ul>';
  return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url;
    var pathname =url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    if(pathname === '/'){//홈으로 갔느냐
      if(queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
        var title = 'Welcome';
        var descripion = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${descripion}`,`<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(template);
      })
    } else{//id값이 있는 경우
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, descripion){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${descripion}`, `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === "/create_process"){
      var body = '';
      request.on('data', function(data){//웹 브라우저가 post방식으로 데이터를 전송할때 데이터가 많으면 문제가 생기는데 그걸 방지하기위해 사용
        body = body + data;
      });//조각의 양을 서버쪽에서 수신할때마다 서버는 이 콜백함수를 호출하도록 약속되어있고 데이터라는 인자를 통해 수신한 정보를 주기로 약속
      request.on('end', function(){//정보가 들어오다가 들어올 정보가 없으면 end다음 콜백함수를 호출하도록 약속
        var post = qs.parse(body);//지금까지 저장한 바디를 입력값으로 주면 post변수에 post데이터가 들어있을거라는 뜻
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });//end뒤 콜백함수가 실행됬을  정보수신이 끝났다를 의미
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<form action = "/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name = "title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description" value=${description}></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`, `<a href="/create">create</a><a href="/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          fs.unlink(`data/${id}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('not found');
    }



});
app.listen(3000);
