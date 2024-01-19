var members = ['dodo', 'nana', 'eoeo'];
console.log(members[1]);  // nana

var i = 0;
while(i < members.length){
    console.log('array loop', members[i]);
    i = i + 1;
}

var roles = {
    'programmers' : 'dodo',
    'designer' : 'nana',
    'manager' : 'eoeo'
}
console.log(roles.designer);  // nana

for(var job in roles){
    console.log('object => ', job, 'value => ', roles[job]);
}