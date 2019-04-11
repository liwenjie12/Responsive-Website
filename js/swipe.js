function swipe(e) {
    this.el=document.getElementById(e.el);
    this.addEventListener(e);
    this.event();
}
swipe.prototype={
    constructor:swipe,
    addEventListener:function (e) {
        for(var item in e){
            if(item==="swipeLeft" || item==="swipeRight" || item==="swipeTop" || item==="swipeBottom"){
                this[item]=document.createEvent('Event');
                this[item].initEvent(item,true,true);
               if(window.addEventListener){
                   this.el.addEventListener(item,e[item]);
               }
               else{
                   this.el.attachEvent(item,e[item]);
               }
            }
        }
    },
    dispatch:function (e) {
        if(window.dispatchEvent){
            this.el.dispatchEvent(e);
        }
    },
    event:function () {
        function start(event) {
            this.start={
                x:event.clientX,
                y:event.clientY
            }
        }
        function end(event) {
            this.end={
                x:event.clientX,
                y:event.clientY
            };
            var x=this.end.x-this.start.x;
            var y=this.end.y-this.start.y;
            if(Math.abs(x)>Math.abs(y)){
                if(x>20 && this.swipeRight){
                    this.dispatch(this.swipeRight);
                }
                else if(x<-20 && this.swipeLeft){
                    this.dispatch(this.swipeLeft);
                }
            }
            else{
                if(y>20 && this.swipeBottom){
                    this.dispatch(this.swipeBottom);
                }
                else if(y<-20 && this.swipeTop){
                    this.dispatch(this.swipeTop);
                }
            }
        }
        this.el.addEventListener("mousedown",start.bind(this));
        this.el.addEventListener("mouseup",end.bind(this));
        this.el.addEventListener("touchstart",start.bind(this));
        this.el.addEventListener("touchend",end.bind(this));
    }
};
var a=new swipe({
    el: "list",
    swipeLeft: function (event) {
        event.preventDefault();
        event.currentTarget.style.left="-200px";
    },
    swipeRight:function () {
        alert("右滑");
    },
    swipeTop:function () {
        alert("上画");
    },
    swipeBottom:function () {
        alert("下滑");
    },
});
console.log(a);