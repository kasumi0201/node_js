var http = require("http"),
fs = require('fs'),
ejs = require('ejs'),
qs = require('querystring'); //フォームからの投稿を処理するには、querystringというモジュールが必要なので読み込んでおく

var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/todolist.ejs','utf-8');
var posts = []; //投稿を保持しておく為に、ここで宣言
function renderForm(posts,response){
  var data = ejs.render(template,{
    posts: posts
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  //元はhtmlやった
  response.write(data); //読み込まれたのは実際データに渡ってくるので
  response.end();
}
server.on('request',function(request, response) {
  if(request.method === 'POST'){
    request.data = "";
    request.on("data",function(chunk){
      request.data += chunk;  // コールバック関数の引数を結合していく
    });
    request.on("end",function(){
      var query = qs.parse(request.data);
      posts.push(query.name);
      renderForm(posts,response);
    });
  } else{
    renderForm(posts,response);
  }

});

server.listen(8080);
console.log("Server is listening");
