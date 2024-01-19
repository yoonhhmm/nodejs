// function a(){
//     console.log('A');
// }
// 익명함수 : 함수에 이름이 없어 변수에 담아주면 위의 함수와 같아진다
var a = function(){  // 3.a를 호출했기 때문에 출력은 A가 나온다
    console.log('A');
}
// a();
// => javascript에서는 함수가 값이다!!

function slowfunc(callback){  // 1.oncallback parameter를 받는다
    callback();
}

slowfunc(a);  // 2.slowfunc함수를 통해 a를 호출한다