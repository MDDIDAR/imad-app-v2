console.log('Loaded!');
var element=document.getElementById('main-text');

element.innerHTML='new value';//to change the value

var img=document.getElementById('modi');
img.onclick=function(){
    img.style.marginLeft='100px';
};