var text = 'js'
// 줄바꿈 : 역슬래쉬 or \n
var letter = 'Dear '+text+' \n\
\n\
Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
 '+text+' Aliquam ligula sapien, rutrum sed vestibulum eget,\
rhoncus ac erat. Aliquam erat volutpat.\
Sed convallis scelerisque enim at fermentum.\
Aliquam consectetur, est ac auctor iaculis, \
odio mi bibendum leo, in congue neque velit vel enim.\
Nullam vitae justo at mauris sodales feugiat.\
Praesent pellentesque ipsum eget tellus imperdiet ultrices.\
Sed ultricies nisi nec diam sodales fringilla.\
Quisque adipiscing cursus porta. Lorem ipsum dolor sit amet,\
consectetur adipiscing elit. \
Aliquam bibendum scelerisque elit, eu pharetra dui pulvinar eget. \
Nam mollis mauris id tellus ultricies at porttitor neque vulputate.\
Class aptent taciti sociosqu ad litora torquent per conubia nostra,\
per inceptos himenaeos. '+text+''
console.log(letter);


// literals : 정보를 표현하는 기호는 ` ` 시작과 끝을 나타낸다
// literals를 사용하면 복잡하게 개행이나 변수를 취급하지 않아 간편해진다
// '+text+' -> ${text}

var letter = `Dear ${text}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
${text} Aliquam ligula sapien, rutrum sed vestibulum eget,\
rhoncus ac erat. Aliquam erat volutpat.\
Sed convallis scelerisque enim at fermentum.\
Aliquam consectetur, est ac auctor iaculis, \
odio mi bibendum leo, in congue neque velit vel enim.\
Nullam vitae justo at mauris sodales feugiat.\
Praesent pellentesque ipsum eget tellus imperdiet ultrices.\
Sed ultricies nisi nec diam sodales fringilla.\
Quisque adipiscing cursus porta. Lorem ipsum dolor sit amet,\
consectetur adipiscing elit. \
Aliquam bibendum scelerisque elit, eu pharetra dui pulvinar eget. \
Nam mollis mauris id tellus ultricies at porttitor neque vulputate.\
Class aptent taciti sociosqu ad litora torquent per conubia nostra,\
per inceptos himenaeos. ${text}`