function swipe(e) {
    this.el=document.getElementById(e.el);
    this.addEventListener(e);
    this.event();
    if(e.autoplay){
        this.autoplay();
    }
}
swipe.prototype={
    constructor:swipe,
    /*绑定相同事件*/
    on:function(type,fn){
        if(!type instanceof Array){
           return;
        }
        for(var i=0;i<type.length;i++){
            this.el.addEventListener(type[i],fn.bind(this));
        }
    },
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
    },
    autoplay:function () {
        var time=setInterval(function () {
            console.log(1);
            var width=document.body.offsetWidth;
            console.log(width);
            var left=parseInt(this.el.style.left) || parseInt(window.getComputedStyle(this.el).left);
            left=left-width+"px";
            if(parseInt(left)<=-3*width){
                this.el.style.left="0px";
                return;
            }
            this.el.style.left=left;
        }.bind(this),2000);
        this.on(["mouseover","touchstart"],function () {
            clearInterval(time);
        });
        this.on(["mouseout","touchend"],function () {
            time=setInterval(function () {
                var width=document.body.offsetWidth;
                var left=parseInt(this.el.style.left) || parseInt(window.getComputedStyle(this.el).left);
                left=left-width+"px";
                if(parseInt(left)<=-3*width){
                    this.el.style.left="0px";
                    return;
                }
                this.el.style.left=left;
            }.bind(this),2000);
        })
    }

};
