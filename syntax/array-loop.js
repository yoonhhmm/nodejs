var num = [1, 400, 12, 4, 9, 500];

// 반복횟수를 지정
var i = 0;
var total = 0;
while(i < num.length){
    // console.log(num[i]);
    total = total + num[i];
    i = i + 1;
}
console.log(`total : ${total}`);