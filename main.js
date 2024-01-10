var http = require('http');
var fs = require('fs');
var url = require('url');
// 중복이 된 코드를 함수화 하여 가시성을 높인다
// 내용의 구성이 바뀔 수 있으므로 ${body}로 바꿔주고 아래 변수 template = templateHTML(매개변수에 내용을 저장시켜주다)
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

  } else {
      response.writeHead(404);
      response.end('Not Found');

    }



  });
app.listen(3000);
