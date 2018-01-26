jQuery(function($){

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).attr("data-anime",animationName).one(animationEnd, function() {
            //$(this).removeClass('animated ' + animationName);
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

            el.src = src+"?v="+new Date().getTime();
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

            el.src = src+"?v="+new Date().getTime();
        });
    },
    "allEnd" : function(){
        setTimeout(function () {
            $('.loading-wrapper').animateCss("bounceOutDown",function(){
                $(this).hide();
                swiper = new Swiper(".swiper-container",{
                    direction : "vertical",
                    onTransitionEnd : function(){

                        $("[data-useanime]").each(function(){
                            var cls = $(this).attr("data-anime");
                            $(this).removeClass("animated "+cls);
                        });

                        var page = $('.swiper-slide-active').find(".page").attr("data-page");
                        enterPage[page]();
                    }
                });
                $(".music").trigger("click");
                enterPage.page1();
            });
        },1000);

    }
};

var enterPage = {
    "page1" : function(){
        $(".face").animateCss("fadeInUp");
        $(".btn").animateCss("bounceInLeft").removeClass("opa0");
        $(".btn").off("click").on("click",function(){
            swiper.slideNext();
        });
    },
    "page2" : function(){
        $(".btn,.item-title1").addClass('opa0');
        $(".text1,.text2,.text3,.text4").animateCss("fadeInUp");
        $(".text5").animateCss("rollIn");
    },
    "page10" : function(){
        $(".btn,.item-title1").addClass("opa0");
        $('.page10-header').animateCss("rollIn");
    },
    "page3" : function(){
        $(".page3-body-box").animateCss("fadeInUp",function(){
            $(".item-icon1,.item-icon2,.item-icon3").animateCss("pulse infinite");
            $(".item-title1").animateCss("bounceInLeft").removeClass("opa0");
        });
    },
    "page4" : function(){
        $(".item-title1,.item3-title").addClass('opa0');
        $(".page4-body-box").animateCss("fadeInUp");
        $(".item2-shou").animateCss("fadeInUp");
        $(".item2-titleBg").animateCss("fadeInLeft");
        $(".item2-title").animateCss("rollIn");
    },
    "page5" : function(){
        $(".item4-title").addClass("opa0");
        $('.item3-icon1').animateCss('fadeInUp');
        $('.item3-icon2').animateCss('fadeInRight');
        $(".item3-icon3").animateCss('infinite pulse');
        $(".item3-icon5").animateCss('infinite flash');
        $(".item3-title").animateCss('rotateInUpRight').removeClass("opa0");
    },
    "page6" : function(){
        $(".item3-title,.item5-icon2,.item5-title").addClass("opa0");
        $(".item4-icon1").animateCss('flash infinite');
        $(".item4-title").animateCss('bounceInDown').removeClass("opa0");
    },
    "page7" : function(){
        $(".item4-title,.page8-header").addClass("opa0");
        $(".item5-icon1").animateCss('fadeInRight');
        $(".item5-icon3").animateCss('fadeInLeft');
        $(".item5-icon2").animateCss('lightSpeedIn').removeClass('opa0');
        $(".item5-title").animateCss('zoomInUp').removeClass('opa0');
    },
    "page8" : function(){
        $(".item5-icon2,.item5-title,.last-title,.last-icon1,.last-icon2").addClass("opa0");
        $('.page8-header').animateCss("rollIn").removeClass('opa0');
    },
    "page9" : function(){
        $('.page8-header').addClass("opa0");
        $('.last-title').animateCss('bounceInDown').removeClass('opa0');
        $('.last-icon1').animateCss('rotateInUpLeft').removeClass('opa0');
        $('.last-icon2').animateCss('bounceInLeft').removeClass('opa0');
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

loadstart();

});