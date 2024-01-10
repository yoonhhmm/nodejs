console.log(Math.round(1.6));  //2
console.log(Math.round(1.4));  //1

// 인자값을 받아서만 출력 가능
function sum(a,b){  // parameter : 전달해주는 매개변수
    console.log(a+b);
}
sum(2,4);  //argument : 입력값 하나하나 = 인자

// return 뒤의 값을 출력해준다
function sum(a,b){ 
    return a+b;
}
console.log(sum(2,4));

