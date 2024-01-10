// data directory에 파일이 수정되거나 추가되었을 때 어떻게 nodejs를 통해 기계적으로 수정할 수 있는지!!
// ex) 파일 목록
// nodejs file list in directory 검색 -> readdir사용
var testFolder = './data';  // 내가 실행하는 위치에 대해서 data경로를 적어줘
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){  // function안에는 변수
    console.log(filelist);
})