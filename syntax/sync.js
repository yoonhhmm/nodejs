// fs 모듈 불러오기
var fs = require('fs');

//readFileSync
// 실행되는 순서가 중요해 => 동기
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
// 실행결과 : 순차적으로 ABC가 나옴

// sync x => 비동기
console.log('A');
// readfilesync는 return값을 주는데 sync는 return값을 안주기 때문에 변수취급x
// CALLBACK : a와 b를 출력 후 함수의 parameter에 대한 값도 출력해줘
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);    
});
console.log('C');
// 실행결과 : ACB