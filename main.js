var http = require('http');                              
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    
    // 경로로 접근했는지 출력을 통해 알아보자
    // console.log(url.parse(_url, true).pathname);
    
    // 지정된 경로로 이동했으면 200, 아니면 not found는 404
    // pathname==='/'는 홈과 각 페이지를 구별할 순 없어 -> 반복문 중첩 사용으로 구분
    // querystring이 존재하지 않으면 undefined
    // 조건문을 이용하여 홈페이지 구현
    if(pathname === '/'){
      if(queryData.id === undefined){
        
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){  
          var title = 'Welcome!';
          var description = 'Hello nodejs';
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        
        `;
        response.writeHead(200);
        response.end(template);
      });
      }else{
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){  
          var title = queryData.id;
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        
        `;
        response.writeHead(200);
        response.end(template);
        
        })
      }
      
    }else{
      response.writeHead(404);
      response.end('Not Found');
      
    }

    
 
});
app.listen(3000);
