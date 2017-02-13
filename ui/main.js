//counter code
var button=document.getElementById('counter');

button.onclick=function(){
    //create a request objet
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            //take the action
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                 span.innerHTML=counter.toString();
            }
        }
    
    //not done yet
    };
    //make the request
    request.open('GET','http://mddidar.imad.hasura-app.io/counter',true);
    request.send(null);
};


//submsubmit-btn
var submit=document.getElementById('submit-btn');
   submit.onclick=function(){
    //create a request object
var request=new XMLHttpRequest();

//capture the response and store it in a variable
request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){

             //take the action
            if(request.status===200){
                var names=request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0;i< names.length;i++){
                    list+='<li>'+ names[i] +'</li>';
                }
            
                var ul=document.getElementById('namelist');
                ul.innerHTML=list; 
            }
        }
    //not yet done
};
    //make the request
    var nameinput=document.getElementById('name');
    var name=nameinput.value;
    request.open('GET','http://mddidar.imad.hasura-app.io/submit-name?name=' + name,true);
    request.send(null);
};