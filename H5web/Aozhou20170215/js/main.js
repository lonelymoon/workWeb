;(function(bodyStyle) {
    bodyStyle.mozUserSelect = 'none';
    bodyStyle.webkitUserSelect = 'none';

    var img = new Image(),
    	canvas = document.querySelector('#canvas'),
    	windowWidth = window.innerWidth,
    	trueWidth = windowWidth> 750 ? 750 : windowWidth,
    	per = trueWidth / 750,
        hasShow = false;

    canvas.style.backgroundColor='transparent';

    img.addEventListener('load', function(e) {
        var ctx;
        var w = img.width * per,
            h = img.height * per,
            cLeft = 0,cTop = 0;
        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mousedown = false,
            mcp = new myCoupon();

        function layer(ctx) {
            ctx.drawImage(img,0,0,w,h);
            document.querySelector(".coupon-status").innerHTML = "读取中...";
            cLeft = canvas.getBoundingClientRect().left;
            cTop = canvas.getBoundingClientRect().top;
        }

        function eventDown(e){
            e.preventDefault();
            if(localStorage.getCoupon){
                mcp.getCoupon();
                return;
            }
            if(localStorage.hbCode){
                mcp.check(localStorage.hbCode);
                return;
            }
            mousedown=true;
        }

        function eventUp(e){
            e.preventDefault();
            mousedown=false;
            if(hasShow) return false;
            var cData = ctx.getImageData(0,0,w,h).data,
            	len = cData.length,
            	count = 0;

            for( var i = 0 ; i < len; i+=4 ){
            	if( cData[i+3] == 0 ){
            		count++;
            	}
            }

            if(count / (w * h) >= 0.4){
            	ctx.clearRect(0,0,w,h);
                hasShow = true;
            	mcp.init();
            }

        }

        function proxyMove(e){
            setTimeout(function(){
                eventMove(e);
            },16);
        }

        function eventMove(e){
            e.preventDefault();
            if(mousedown) {
                if(e.changedTouches){
                    e=e.changedTouches[e.changedTouches.length-1];
                }
                var x = (e.clientX || e.pageX) - cLeft || 0,
                    y = (e.clientY || e.pageY) - cTop || 0;
                with(ctx) {
                    beginPath()
                    arc(x, y, 35, 0, Math.PI * 2);
                    fill();
                }
            }
        }

        canvas.width  = w;
        canvas.height = h;
        ctx=canvas.getContext('2d');
        canvas.style.backgroundColor='transparent';
        layer(ctx);

        ctx.fillStyle='#fff';
        ctx.globalCompositeOperation = 'destination-out';

        canvas.addEventListener('touchstart', eventDown);
        canvas.addEventListener('touchend', eventUp);
        canvas.addEventListener('touchmove', eventMove);
        canvas.addEventListener('mousedown', eventDown);
        canvas.addEventListener('mouseup', eventUp);
        canvas.addEventListener('mousemove', proxyMove);
    });
    img.src = 'images/lottery_1.png';
})(document.body.style);

jQuery(function($){

var touchstart = "ontouchstart" in document ? "touchstart" : "click";

$('.alter-box').on(touchstart,function(e){
	e.preventDefault();
	e.stopPropagation();
});

$('.layer').on(touchstart,function(e){
    $('.alter-box[data-status="done"]').addClass("hide");
    $('.layer').addClass("hide");
});


$('.couponlink').on(touchstart,function(e){
    e.preventDefault();
    e.stopPropagation();
    this.click();
    setTimeout(function(){
        localStorage.getCoupon = true;
    },2500);
});

$('.no-win').on(touchstart,function(e){
	e.stopPropagation();
    e.preventDefault();
	$('.alter-box[data-status="oh-no"]').addClass("hide");
	$('.layer').addClass("hide");
    window.location.reload();
});

var myCoupon = function(){
	this.data = "";
};

myCoupon.prototype = {
	init : function(){	
        this.t100 = this.substrNum($('.t100').html()) * 1,
        this.t200 = this.substrNum($('.t200').html()) * 1 ,
        this.t1000 = this.substrNum($('.t1000').html()) * 1;
        this.getData();
	},

	getData : function(){
		var _self = this;
        if(localStorage.hbCode){
            _self.check(localStorage.hbCode);
        } else {
            this.check(this.getResult());
        }
	},

	check : function(val){
		$('.layer').removeClass("hide");
		if(val == "00000"){
			$('.alter-box[data-status="oh-no"]').removeClass("hide");
            $(".coupon-status").html("谢谢参与");
			return;
		}

        $(".coupon-status").html("中奖了");
		$('.alter-box[data-status="oh-year"]').removeClass("hide");
		$('.alter-hongbao').find("img[data-type="+val+"]").removeClass("hide");
		$('.btn-box[data-type='+val+']').removeClass("hide");
		localStorage.hbCode = val;
	},

    getCoupon : function(){
        $('.layer').removeClass("hide");
        $('.alter-box[data-status="done"]').removeClass("hide");
        $(".hasDone").removeClass("hide");
    },

    getResult : function(){
        var random = this.getRandom();
        return (random <= 30 && this.t1000) ? 
                "46036" : 
                (random <= 180 && this.t200) ? 
                "46033" : 
                (random <= 430 && this.t100) ? 
                "46032" : 
                "00000";
    },

    getRandom : function(){
        return Math.random() * 1000 >> 0;
    },

    substrNum : function(str){
        var start = str.indexOf("剩")+1,
            end = str.lastIndexOf("张");

        return str.substring(start,end);
    }
};

window.myCoupon = myCoupon;

});