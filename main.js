var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring')

// 객체를 만들어줘 = 코드를 조금 더 쉽게 만들어 줘 => 리팩토링!!
var template = {
  Html:function templateHTML(title, list, body, control) {
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
  },
  list:function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
  
    return list;
  }
}

// function templateHTML(title, list, body, control) {
//   return `
//   <!doctype html>
//   <html>
//   <head>
//     <title>WEB1 - ${title}</title>
//     <meta charset="utf-8">
//   </head>
//   <body>
//     <h1><a href="/">WEB</a></h1>
//     ${list}
//     ${control}
//     ${body}
//   </body>
//   </html>
  
//   `;
// }

// function templateList(filelist) {
//   var list = '<ul>';
//   var i = 0;
//   while (i < filelist.length) {
//     list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
//     i = i + 1;
//   }
//   list = list + '</ul>';

//   return list;
// }
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  var title = queryData.id;

  // 홈화면 - create
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (err, filelist) {
        var title = 'Welcome!';
        var description = 'Hello nodejs';
        // 객체를 이용하여 호출
        var list = template.list(filelist);
        var html = template.Html(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href = "/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      })

      // 이외 화면 - create, update, delete(form type으로)
    } else {
      fs.readdir('./data', function (err, filelist) {
        var title = 'Welcome!';
        var description = 'Hello nodejs';
        var list = template.list(filelist);
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var html = template.Html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href = "/create">create</a> 
             <a href = "/update?id=${title}">update</a>
             <form action = "delete_process" method = "post">
              <input type = "hidden" name = "id" value = "${title}">
              <input type = "submit" value = "delete">
             `
          );
          response.writeHead(200);
          response.end(html);

        });
      });
    }

    // 생성하기 링크 만들기
  } else if (pathname === "/create") {
    fs.readdir('./data', function (err, filelist) {
      var title = 'Welcome!';
      var description = 'Hello nodejs';
      var list = template.list(filelist);
      var html = template.Html(title, list,
        `
       <form action="/create_process" method = "post">
       <p><input type="text" name = "title" placeholder = "title"></p>
       <p>
           <textarea name = "description" placeholder = "description"></textarea>
       </p>
       <p>
           <input type="submit">
       </p>
   </form>
   `, "");  // 공백 추가
      response.writeHead(200);
      response.end(html);
    });
    // 생성하기
  } else if (pathname === '/create_process') {
    var body = '';
    // post방식으로 데이터를 전송할 때 데이터가 너무 많으면 무리가 간다
    // -> 그걸 대비하여 아래와 같은 방법을 이용
    request.on('data', function (data) {
      body = body + data;  // 서버쪽에서 수신할때마다 callback함수를 호출할때 마다 데이터라는 인자로 수신한 정보를 준다
    });
    // 수신이 끝났을 때 나올 수 있는 상태 만들어준다
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      // file생성
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });  // 페이지를 다른 곳으로 redirectoin
        response.end('success');
      })
    });

    // 수정하기
  } else if (pathname === '/update') {
    fs.readdir('./data', function (err, filelist) {
      var title = 'Welcome!';
      var description = 'Hello nodejs';
      var list = template.list(filelist);
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var html = template.Html(title, list,
          `
          <form action="/update_process" method = "post">
          <input type = "hidden" name = "id" value = "${title}">
            <p><input type="text" name = "title" placeholder = "title" value = ${title}></p>
            <p>
              <textarea name = "description" placeholder = "description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href = "/create">create</a> <a href = "/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);

      });
    });
  } else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function (data) {
      body = body + data;  
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(err){
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });  // 페이지를 다른 곳으로 redirectoin
          response.end('success');
        })
      })
      
    });

// 삭제하기
  } else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', function (data) {
      body = body + data;  
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(err){
        response.writeHead(302, { Location: `/` });  // 페이지를 다른 곳으로 redirectoin
        response.end('success');
      })
    });

  } else {
    response.writeHead(404);
    response.end('Not Found');

  }



});
app.listen(3000);
