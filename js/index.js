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
}