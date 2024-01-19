var http = require('http');
var fs = require('fs');
var url = require('url');
// post방식으로 전송된 데이터 받기 위해 불러온 모듈
var qs = require('querystring')

function templateHTML(title, list, body){
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
    <a href = "/create">create</a>
    ${body}
  </body>
  </html>
  
  `;
}
// list에 대한 함수 정의
function templateList(filelist){  // templateList가 작동하기 위해서는 함수안에 filelist가 있어야해
  var list = '<ul>';
  var i = 0; 
  while (i < filelist.length) {
    list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';

  return list;
}
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  
  var title = queryData.id;


  if (pathname === '/') {
    if (queryData.id === undefined) {

      // 파일 목록을 가져오는 노드로 감싸줄거야
      fs.readdir('./data', function (err, filelist) {
        // console.log(filelist);
        var title = 'Welcome!';
        var description = 'Hello nodejs';

        // var list = '<ul>';  // list처음
        // // nodejs 반복문을 통해서 list 태그 완성시켜준다
        // var i = 0; // 몇 번 반복할지
        // while (i < filelist.length) {
        //   // querystring을 적을 때는 /?={}이어지게 써줘 안그러면 공백으로 생각해서 읽어오지 못해!!
        //   list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        //   i = i + 1;
        // }
        // list = list + '</ul>'; // list끝
        //=> 위의 긴 코드를 함수로 만들어준다
        var list  = templateList(filelist);
        // var list = `<ul>
        //   <li><a href="/?id=HTML">HTML</a></li>
        //   <li><a href="/?id=CSS">CSS</a></li>
        //   <li><a href="/?id=JavaScript">JavaScript</a></li>
        // </ul>`;
        var template = templateHTML(title, list,
           `<h2>${title}</h2>${description}`);  // 인자를 담아준다
        response.writeHead(200);
        response.end(template);
      })


    } else {
      // id값이 있을 때 코드이니깐 위에서 추가된 filelist 를 통해 링크를 클릭시 description을 보여줄거야
      fs.readdir('./data', function (err, filelist) {
        // console.log(filelist);
        var title = 'Welcome!';
        var description = 'Hello nodejs';
        var list = templateList(filelist);
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);

        });
      });
    }

    // 생성하기 링크 만들기
  } else if(pathname === "/create"){
    fs.readdir('./data', function (err, filelist){
      var title = 'Welcome!';
      var description = 'Hello nodejs';
      var list = templateList(filelist);
      var template = templateHTML(title, list,
       `
       <form action="http://localhost:3000/create_process"
       method = "post">
       <p><input type="text" name = "title" placeholder = "title"></p>
       <p>
           <textarea name = "description" placeholder = "description"></textarea>
       </p>
       <p>
           <input type="submit">
       </p>
   </form>
   `);  
      response.writeHead(200);
      response.end(template);
    });
  } else if(pathname === '/create_process'){
      var body = '';
      // post방식으로 데이터를 전송할 때 데이터가 너무 많으면 무리가 간다
      // -> 그걸 대비하여 아래와 같은 방법을 이용
      request.on('data', function(data){
        body = body + data;  // 서버쪽에서 수신할때마다 callback함수를 호출할때 마다 데이터라는 인자로 수신한 정보를 준다
      });
      // 수신이 끝났을 때 나올 수 있는 상태 만들어준다
      request.on('end', function(){
        var post = qs.parse(body);  
        var title = post.title;
        var description = post.description;
        // file생성
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location : `/?id=${title}`});  // 페이지를 다른 곳으로 redirectoin
          response.end('success');
        })
      });
      
  } else {
      response.writeHead(404);
      response.end('Not Found');

    }



  });
app.listen(3000);
