var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    speed: 1000,
    loop : true,
    autoplay: 3000
});

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
})();

jQuery(function($){
	goSlider(0);

	$('.home-layer').on('mousewheel',function(e){
		e = e || event;
		e.preventDefault();
		return;
	});

	if($('.flag-img')[0].complete){
		setTimeout("setCount()",1000);
	} else {
		$('.flag-img').on('load',function(){
			setTimeout("setCount()",1000);
		});
	}

	var pointsArr = [],
		randArr = [],
		unitPx = 26,
		throttleCount = 0,
		maxCount = 51,
		startPosition = 0,
		onceNum = 10,
		maxNum = 11;

	pointsArr = $('.zs-point');

	var	pointsAni = function(index){
		var self = this;

		this.flag = 0;
		this.hasShowed = false;
		this.idx = index;
		this.step = function(){
			pointsArr[self.idx].style.backgroundPosition = (-unitPx * self.flag) + "px 0px";
			if( self.flag > maxNum ) {
				self.hasShowed = true;
				self.flag = 0;
			}
			self.flag++;
		};

	};

	function getRandomNum(mark){
		if( mark > 8000 )
		return { startNum : 25, range : 25 };
		else if ( mark > 3000 )
		return { startNum : 10, range : 11 };
		else if ( mark > 1500 )
		return { startNum : 0, range : 6 };
		else if ( mark > 500 )
		return { startNum : 6, range : 4 };
		else
		return { startNum : 20, range : 5 };
	}

	function getRandom(){
		var time = (10 + Math.random() * 60) >> 0;

		setTimeout(function(){

			for ( var i = 0; i < (Math.random() * 5 >> 0); i++ ) {
				var mark = Math.random()*18000,
					countObj = getRandomNum(mark);
				randArr.push( new pointsAni( countObj.startNum + ((Math.random() * countObj.range) >> 0) ) );
			}

		},time);
		
		setTimeout(function(){
			getRandom();
		},700);
	}

	function start(){

		while( randArr[startPosition] && randArr[startPosition].hasShowed ){
			startPosition++;
		}

		if(throttleCount % 5 == 0)
		for ( var x = startPosition, y = randArr.length; x < y; x++ ) {
			randArr[x].step();
		}

		throttleCount++;
		window.requestAnimationFrame(start);
	}

	getRandom();
	start();

});

function setCount(){
	var finalDate = "2016/09/21 09:00:00",
		finalDateCount = new Date(finalDate).getTime(),
		now = 0,
		diffCount = 0,
		countNum = 0;

	var timer = setInterval(function(){
		now = new Date().getTime();
		diffCount = finalDateCount - now;
		timeChange(diffCount);
		countNum+=200;

		if( countNum >= 3600 ){
			clearInterval(timer);
			$('.home-layer').addClass("hide");
		}

	},200);

	$('.close').on('click',function(){
		countNum = 3600;
	});
}

function timeChange(time){

	var count_day = 24 * 60 * 60 * 1000,
		count_hour = 60 * 60 * 1000,
		count_min = 60 * 1000,
		count_sec = 1000,
		day = Math.floor( time/(count_day) ),
		hour = Math.floor( time % count_day / count_hour ),
		min = Math.floor( time % count_hour / count_min ),
		sec = Math.floor( time % count_min / count_sec ),
		timeArr = [];
	
	day = day < 10 ? "0" + day : day + "";
	hour = hour < 10 ? "0" + hour : hour + "";
	min = min < 10 ? "0" + min : min + "";
	sec = sec < 10 ? "0" + sec : sec + "";

	timeArr = day.split("").concat(hour.split("")).concat(min.split("")).concat(sec.split(""));

	$(".timeDiv").find('span').addClass('hide');

	for ( var i = 0,l = timeArr.length; i < l; i++ ) {
		$('.timeDiv').eq(i).find('span').eq((timeArr[i] * 1)).removeClass('hide');
	}

	$('.home-layer').removeClass("hide");

}

function goSlider(i){
	$('.slider').find('.slider-item').fadeOut(300);
	$('.slider').find('.slider-item').eq(i).fadeIn(800);

	i = i >= 2? 0 : i+1;
	setTimeout(function(){
		goSlider(i);
	},7000);
}