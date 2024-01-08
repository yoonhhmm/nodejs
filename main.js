var http = require('http');                              
var fs = require('fs');
// 모듈 import : url모듈을 url변수에 담아 요구한다
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    // nodejs url parse query string을 검색
    // url parsing
    var queryData = url.parse(_url, true).query;
    // 새로운 변수 추가
    var title = queryData.id;
    console.log(queryData.id);
    // queryData안에 담겨있는 게 객체는 출력전에는 모른다 
    // 출력후 안에 id가 있으면 queryData.id을 이용하여 출력
    
     
    if(_url == '/'){ 
      title = 'Welcome!';   // _url = '/index.html'을 title로 바꿔줌
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }

    // 동적인 웹페이지 만들기
    // literal을 이용하여 바꾸고자 하는 변수들을 지정 
    // -> queryData.id도 좋지만 title이라는 새로운 변수로 가시성 높인다
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
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>
    
    `
    response.writeHead(200);
    // response.end(fs.readFileSync(__dirname + _url));
    // 사용자가 웹페이지에서 접근할 때마다 위의 js코드로 파일을 만들어 낸다
    // __dirname을 바꾸게 되면 그에 맞는 코드로 바꿔서 사용자에게 보여준다

    // url parsing시 이용되는 response(입력된 값에 따라...)
    // response.end(queryData.id);

    // 동적인 웹페이지 만들기
    response.end(template);
 
});
app.listen(3000);
// node main.js를 실행시키고 localhost:3000을 입력하면 nodejs는 웹서버로서 동작을 하게 된다