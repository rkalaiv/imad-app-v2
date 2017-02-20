console.log('Loaded!');

var img=document.getElementById("kk");

var marginleft = 0;
function Setinterval(){
    marginleft=marginleft+10;
    img.style.marginleft= marginleft + "px";
}

img.onclick = function() {
    //img.style.marginleft="100 px";
    var interval = setinterval(moveright, 100);
    };

    var element=document.getElementById("main-text");
element.innerHTML="changed main content next time";
