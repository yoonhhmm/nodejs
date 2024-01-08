// input : parameter(입력되는 정보의 형식), 
//         argument(형식에 맞게 입력되는 값)등이 있어
// url을 통해서 입력값을 주고 결과값을 html로 출력해줬던 거랑 같아
// console에서 입력값을 주는 방법을 살펴볼거야, 조건문도 넣어볼거야
// nodejs console input parameters 검색
var args = process.argv;

console.log(args[2]); //index

console.log('a');
console.log('b');
if(args[2] === '1'){
    console.log('c1');
}else{
    console.log('c2');
}
console.log('d');
