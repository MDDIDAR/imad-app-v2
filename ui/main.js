console.log('Loaded!');
var element=document.getElementById('main-text');

element.innerHTML='new value';//to change the value

var img= document.getElementById('madi');
 var marginLeft=0;
 function moveRight(){
     marginLeft=marginLeft+10;
     img.style.marginLeft=marginLeft+'px';
 }
img.onclick=function(){
    var intrval=setInterval(moveRight,100);
};