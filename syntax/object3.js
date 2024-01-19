// var v1 = 'v1';
// // 수많은 코드
// v1 = 'dodo';
// var v2 = 'v2';

// 그릇을 만들어줘
var p = {
    v1 : 'v1',
    v2 : 'v2',
    f1(){
        console.log(this.v1);  // 자신이 속해 있는 곳을 참조하는 특수한 함수
    },
    f2(){
        console.log(this.v2);
    }
}
p.f1();
p.f2();