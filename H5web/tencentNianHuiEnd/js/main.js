jQuery(function($){

$.fn.extend({
    animateCss: function (animationName, callback,dontRemove) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).attr("data-anime",animationName).one(animationEnd, function() {
            if(!dontRemove)
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback.call(this);
            }
        });
        return this;
    }
});

var swiper,
    u = navigator.userAgent,
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

var loadObj = {
        "length" : 0,
        "i" : 0,
        "fn" : function(el,src){
            setTimeout(function(){
                el.onload = function(){
                    loadObj.i++;
                    loadObj.loadEnd();
                };

                el.onerror = function(){
                    loadObj.i++;
                    loadObj.loadEnd();
                };

                el.src = src + "?ver="+new Date().getTime();
            },30);
        },
        "loadEnd" : function(){
            var per = (loadObj.i / loadObj.length * 100 >> 0) + "%";
            $(".loading-icon").css("left",per);
            $(".loading-progress").css("width",per);

            if(loadObj.i == loadObj.length){
                loadObj.allEnd();
                loadObj.loadOthers();
                return false;
            }
        },
        "loadOthers" : function(){
            $("[data-later='yes']").each(function(){
                var el = $(this)[0],
                    src = $(this).attr("data-src");

                el.src = src + "?ver="+new Date().getTime();
            });
        },
        "allEnd" : function(){
            setTimeout(function () {
                $('.loading-wrapper').animateCss("rollOut",function(){
                    $(this).hide();
                    $(".start-title").animateCss("rollIn",function () {
                        $(this).css("opacity",1);
                        $(".start-face").animateCss("fadeInLeft",function(){
                            $(this).css("opacity",1);
                        });
                    });
                    swiper = new Swiper(".swiper-container",{
                        direction : "vertical",
                        onTransitionEnd : function(){
                            eventBind.start();
                        }
                    });
                    $(".music").trigger("click");
                    flip();
                },true);
            },1000);

        }
    };

function loadstart(){
    loadObj.length = $("[data-src]").length;

    $("[data-src]").each(function(){

        var el = $(this)[0],
            src = $(this).attr("data-src"),
            later = $(this).attr("data-later");

        if(later == "yes"){
            loadObj.i++;
            loadObj.loadEnd();
        } else {
            loadObj.fn(el,src);
        }

    });

}

loadstart();

var img_pos = {
    "small" : {
        "p_1" : ["-0.08rem","-0.1rem"],
        "p_2" : ["-0.54rem","-0.1rem"],
        "p_3" : ["-1rem","-0.1rem"],
        "p_4" : ["-1.46rem","-0.1rem"],
        "p_5" : ["-1.82rem","-0.1rem"],
        "p_6" : ["-2.22rem","-0.1rem"],
        "p_7" : ["-2.62rem","-0.1rem"],
        "p_8" : ["-3.02rem","-0.1rem"],
        "p_9" : ["-3.4rem","-0.1rem"],
        "p_10" : ["-3.8rem","-0.1rem"]
    },
    "big" : {
        "p_1" : ["0.1rem","-0.1rem"],
        "p_2" : ["-0.6rem","-0.1rem"],
        "p_3" : ["-1.3rem","-0.1rem"],
        "p_4" : ["-2rem","-0.1rem"],
        "p_5" : ["-2.65rem","-0.1rem"],
        "p_6" : ["-3.3rem","-0.1rem"],
        "p_7" : ["-4rem","-0.1rem"],
        "p_8" : ["-4.8rem","-0.1rem"],
        "p_9" : ["-0.17rem","-1.4rem"]
    }
};

var eventBind = {

    $wrapper : null,

    len : 1,

    slideing : false,

    start : function(){
        var _self = this;

        _self.$wrapper = $(".swiper-slide-active").find(".page-content").eq(0);

        if(_self.$wrapper.find('.page-box').length == 0)
        return false;

        _self.len = _self.$wrapper.find('.page-box-item').length;

        _self.freshSmallNum();

        $(".page-btn-left").off("click").on("click",function(){
            _self.slidePrev();
        });

        $(".page-btn-right").off("click").on("click",function(){
            _self.slideNext();
        });
    },

    slidePrev : function () {
        if(this.slideing) return false;
        this.slideing = true;

        var $wrapper = this.$wrapper,
            $el = $wrapper.find('.page-box-item[data-show="true"]'),
            id = $el.attr("data-id") * 1,
            nid = id - 1 == 0 ? this.len : id - 1,
            $nel = $wrapper.find('.page-box-item[data-id="'+nid+'"]');

        this.outAnime($el,$nel,"prev");
        this.inAnime($nel,"prev");
    },

    slideNext : function () {
        if(this.slideing) return false;
        this.slideing = true;

        var $wrapper = this.$wrapper,
            $el = $wrapper.find('.page-box-item[data-show="true"]'),
            id = $el.attr("data-id") * 1,
            nid = id == this.len ? 1 : id + 1,
            $nel = $wrapper.find('.page-box-item[data-id="'+nid+'"]');

        this.outAnime($el,$nel,"next");
        this.inAnime($nel,"next");
    },

    outAnime : function ($el,$nel,type) {
        var _self = this,
            animeArray = ["hinge","rollOut","zoomOutUp","zoomOutLeft","zoomOutRight","zoomOutDown","lightSpeedOut",
                        "rotateOutUpRight","rotateOutUpLeft","rotateOutDownRight","rotateOutDownRight"],
            ani = animeArray[(Math.random() * animeArray.length >> 0)] || "hinge";

        var way = type == "prev" ? "fadeOutLeft" : "fadeOutRight";

        $el.animateCss(way,function(){
            $el.attr("data-show","false");
            $el.hide();
            //_self.inAnime($nel);
        });
    },

    inAnime : function ($el,type) {
        var _self = this,
            animeArray = ["jackInTheBox","rollIn","zoomInLeft","zoomInRight","lightSpeedIn","flipInY",
                "rotateInUpRight","rotateInUpLeft","fadeInRightBig","fadeInLeftBig"],
            ani = animeArray[(Math.random() * animeArray.length >> 0)] || "hinge";

        var way = type == "prev" ? "fadeInRight" : "fadeInLeft";

        $el.show();
        $el.animateCss(way,function(){
            $el.attr("data-show","true");
            _self.freshBigNum($el.attr("data-id"));
            _self.slideing = false;
        });
    },

    freshSmallNum : function () {
        var num = this.len,
            pos = "p_"+num,
            data = img_pos.small[pos],
            $wrapper = this.$wrapper;

        $wrapper.find(".page-btn-center-bottom").css("background-position",data[0]+" "+data[1]);
    },

    freshBigNum : function (num) {
        var pos = "p_"+num,
            data = img_pos.big[pos],
            $wrapper = this.$wrapper;

        $wrapper.find(".page-btn-center-up").css("background-position",data[0]+" "+data[1]);
    }

};

function flip() {
    var count = 0;
    $('.flip').turn({
        gradients: true,
        acceleration: true,
        autoCenter: false,
        display : "single",
        when : {
            turned : function () {
                if(count == 1){
                    $('.page9-icon4').addClass("plane");
                    return false;
                }

                count++;
            }
        }
    });
}

wx.ready(function(){
    $("#bgm")[0].play();
    $("#bgm")[0].pause();
});

$(".music").on("click",function(){
    var bgm = $("#bgm")[0];
    if(bgm.paused){
        bgm.play();
        changeIcon(true);
    } else {
        bgm.pause();
        changeIcon(false);
    }
});

var changeIcon = (function(){
    var container = $(".music")[0],
        image = $(".music>img")[0];

    if(isIOS){
        $(".music").removeClass("pause");
        return function(type){
            if(type){
                container.classList.add('music-animate')
                return false;
            }

            var iTransform = getComputedStyle(image).transform;
            var cTransform = getComputedStyle(container).transform;
            image.style.transform = iTransform === 'none'
                ? cTransform
                : cTransform.concat(' ', iTransform);
            container.classList.remove('music-animate');
        };
    }

    return function(type){
        if(type){
            $(".music").removeClass("pause");
            return false;
        }
        $(".music").addClass("pause");
    };

})();

});