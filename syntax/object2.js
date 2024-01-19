// array, object
var f = function(){
    console.log(1+1);
    console.log(1+2);
}

// 배열 a가 f가 되고 f는 함수다 
var a = [f];
a[0]();     // 2, 3

// o.func는 f, f는 함수 실행
var o = {
    func:f
}           
o.func();   // 2, 3