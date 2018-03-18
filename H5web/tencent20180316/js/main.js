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

    var u = navigator.userAgent,
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

                el.src = src;
            },16);
        },
        "loadEnd" : function(){

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

                el.src = src;
            });
        },
        "allEnd" : function(){
            setTimeout(function () {
                $(".loading-box").animateCss("rollOut",function () {
                    $('.header-title').animateCss("rollIn",function(){
                        $('.header-subtitle').css("opacity",1).animateCss("slideInLeft");
                    });
                });
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

    var se = document.documentElement.clientHeight;

    $(window).on("scroll",function () {
        $("[data-scrollIn]").each(function(){
            var top = $(this)[0].getBoundingClientRect().top;
            if(top <= se - 30 ) {
               var ani = $(this).attr("data-ani"),
                   way = $(this).attr("data-way");
               $(this)[way](ani).css("opacity",1).removeAttr("data-scrollIn data-way data-ani");
            }
        });
    });

});