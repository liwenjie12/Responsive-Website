
function animation() {
    if(document.getElementsByClassName){
        var element=document.getElementsByClassName("scroll-animation");
    }
    else{
        var attr=document.getElementsByTagName("*");
        var element=[];
        for(var i=0;i<attr.length;i++){
            if(attr[i].className.indexOf("scroll-animation")!==-1){
                element.push(attr[i]);
            }
        }
    }
    function create() {
        for(var i=0;i<element.length;i++){
            if(element[i].getBoundingClientRect().top<=window.innerHeight){
                if(element[i].dataset){
                    var attr=element[i].dataset.animation;
                }
                else{
                    var attr=element[i].getAttribute("data-animation");
                }
                if(attr){
                    if(element[i].className.indexOf(attr)==-1){
                        element[i].className+=" "+attr;
                    }
                }
                else{
                    console.error("为设置data-animation属性");
                }
            }
        }
    }
    if(window.addEventListener){
        window.addEventListener("scroll",create);
    }
    else{
        window.attachEvent("onscroll",create);
    }
}
animation();