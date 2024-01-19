// var M = {
//     v: 'v',
//     f: function(){
//         console.log(this.v);
//     }
// }

// 모듈 가져오기
var part = require('./mpart.js')
console.log(part);
// M.f();
part.f();