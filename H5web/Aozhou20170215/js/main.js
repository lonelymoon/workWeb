;(function(bodyStyle) {
    bodyStyle.mozUserSelect = 'none';
    bodyStyle.webkitUserSelect = 'none';

    var img = new Image(),
    	canvas = document.querySelector('#canvas'),
    	windowWidth = window.innerWidth,
    	trueWidth = windowWidth> 750 ? 750 : windowWidth,
    	per = trueWidth / 750;

    canvas.style.backgroundColor='transparent';

    img.addEventListener('load', function(e) {
        var ctx;
        var w = img.width * per,
            h = img.height * per;
        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mousedown = false;

        function layer(ctx) {
            ctx.drawImage(img,0,0,w,h);
        }

        function eventDown(e){
            e.preventDefault();
            mousedown=true;
        }

        function eventUp(e){
            e.preventDefault();
            mousedown=false;
            var cData = ctx.getImageData(0,0,w,h).data,
            	len = cData.length,
            	count = 0;

            for( var i = 0 ; i < len; i+=4 ){
            	if( cData[i+3] == 0 ){
            		count++;
            	}
            }

            if(count / (w * h) >= 0.65){
            	ctx.clearRect(0,0,w,h);
            	var temp = new myCoupon();
            }

        }

        function eventMove(e){
            e.preventDefault();
            if(mousedown) {
                if(e.changedTouches){
                    e=e.changedTouches[e.changedTouches.length-1];
                }
                var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                    y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                with(ctx) {
                    beginPath()
                    arc(x, y, 10, 0, Math.PI * 2);
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
        canvas.addEventListener('mousemove', eventMove);
    });
    img.src = 'images/lottery_1.png';
})(document.body.style);

jQuery(function($){

$('.layer,.alter-box').on('touchstart',function(e){
	e.preventDefault();
	e.stopPropagation();
});

$('.couponlink').on('touchstart',function(e){
	e.preventDefault();
	e.stopPropagation();
	localStorage.getCoupon = true;
	document.querySelector('.couponlink').click();
});

$('.no-win').on('click',function(e){
	e.stopPropagation();
	$('.alter-box[data-status="oh-no"]').addClass("hide");
	$('.layer').addClass("hide");
});

if(localStorage.getCoupon){
	$('.layer').removeClass("hide");
	$('.alter-box[data-status="oh-year"]').removeClass("hide");
	$('.alter-hongbao').find("img[data-type="+localStorage.hbCode+"]").removeClass("hide");
	$('.hbDone').removeClass("hide");
}

var myCoupon = function(){
	this.data = "";
	this.init();
};

myCoupon.prototype = {
	init : function(){
		this.getData();
	},

	getData : function(){
		var _self = this;
		$.ajax({
			"type" : "get",
			"data" : {},
			"url" : "",
			"cache" : false,
			"success" : function(data){
				var flag = data.resultjson || {},
					val = flag.strflg || "46032";
				_self.check(val);
			}
		});
	},

	check : function(val){
		$('.layer').removeClass("hide");
		if(val == "00000"){
			$('.alter-box[data-status="oh-no"]').removeClass("hide");
			return;
		}

		$('.alter-box[data-status="oh-year"]').removeClass("hide");
		$('.alter-hongbao').find("img[data-type="+val+"]").removeClass("hide");
		$('.btn-box[data-type='+val+']').removeClass("hide");
		localStorage.hbCode = val;
	}
};

window.myCoupon = myCoupon;

});