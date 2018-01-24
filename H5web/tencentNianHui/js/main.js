jQuery(function($){

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            //$(this).removeClass('animated ' + animationName);
            if (callback) {
                callback.call(this);
            }
        });
        return this;
    }
});

var loadObj = {
    "length" : 0,
    "i" : 0,
    "fn" : function(el,src){
        el.onload = function(){
            loadObj.i++;
            loadObj.loadEnd();
        };

        el.onerror = function(){
            loadObj.i++;
            loadObj.loadEnd();
        };

        el.src = src;
    },
    "loadEnd" : function(){
        $(".loading").html(loadObj.i);

        if(loadObj.i == loadObj.length){
            $('.loading-wrapper').animateCss("bounceOutDown",function(){
                $(this).hide();
            });
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

});