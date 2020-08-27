var testFolder = './data';
// ./= 현재 디렉토리
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})
//배열로 전달함
