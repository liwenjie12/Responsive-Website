window.onload=function () {
   function check() {
       var menu=document.getElementById("menu");
       var nav=document.getElementsByTagName("nav")[0];
       menu.onclick=function () {
           switch (nav.className) {
               case "":nav.className="scaleIn";break;
               case "scaleIn":nav.className="scaleOut";break;
               case "scaleOut":nav.className="scaleIn";break;
           }
       }
   }
   check();
   function fixed() {
       var header=document.getElementsByTagName("header")[0];
       window.addEventListener("scroll",function () {
           var scroll=document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
           var height=parseInt(window.getComputedStyle(header).height);
           if(scroll>height){
               console.log(2);
               header.style.position="fixed";
               header.style.top="0";
           }
           else{
               header.style.position="relative";
           }
       });
   }
   fixed();
}