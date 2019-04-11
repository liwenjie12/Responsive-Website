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
        else{
            this.event._fireEvent(e);
        }
    },
    event:function () {
        function start() {
            this.start={
                x:event.clientX?event.clientX : event.changedTouches[0].clientX,
                y:event.clientY?event.clientY : event.changedTouches[0].clientY
            }
        }
        function end() {
            console.log(event);
            this.end={
                "x":event.clientX?event.clientX : event.changedTouches[0].clientX,
                "y":event.clientY?event.clientY : event.changedTouches[0].clientY
            };
            console.log(this.end);
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
        this.el.addEventListener("mousedown",start.bind(this),false);
        this.el.addEventListener("mouseup",end.bind(this),false);
        this.el.addEventListener("touchstart",start.bind(this,event));
        this.el.addEventListener("touchmove",function () {
            event.preventDefault();
        });
        this.el.addEventListener("touchend",end.bind(this,event));
    }
};
var a=new swipe({
    el: "list",
    swipeLeft: function (event) {
        event.preventDefault();
        var left=parseInt(event.currentTarget.style.left) || parseInt(window.getComputedStyle(event.currentTarget).left);
        left=left-200+"px";
        if(left=="-600px"){
            return;
        }
        event.currentTarget.style.left=left;
    },
    swipeRight:function (event) {
        event.preventDefault();
        var left=parseInt(event.currentTarget.style.left) || parseInt(window.getComputedStyle(event.currentTarget).left);
        left=left+200;
        if(left>0){
            return;
        }
        event.currentTarget.style.left=left+"px";
    },
});
console.log(a);