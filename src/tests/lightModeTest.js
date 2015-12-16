var LightMode = require('./../lightMode');

var mode = new LightMode();

for(var i=0; i<=7; i++)
{
    console.log(mode.get(i).value + '=> '+ mode.get(i).key)
}

var gy = mode.get('Green | Yellow');
console.log(gy.value + '=> '+ mode.get(gy.value).key)

console.log('All has Green: ' + mode.All.has(mode.Green));
console.log('All has Yellow: ' + mode.All.has(mode.Yellow));
console.log('All has Red: ' + mode.All.has(mode.Red));

if (mode.All.has(mode.Red)){
    console.log('[True]');
} else {
    console.log('[False]');
}