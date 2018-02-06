(function(window,Math){

var knowledge = [
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge1.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge2.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge3.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge4.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge5.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },//5
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge6.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge7.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge8.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge9.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge10.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },//10
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge11.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge12.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge13.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/knowledge14.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    }
];

var must = [
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/must1.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    }
];

var point = [
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point1.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point2.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point3.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point4.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point5.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    }, //5
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point6.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point7.png",
        answers : [{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point8.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point9.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point10.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    }, //10
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point11.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point12.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point13.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point14.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    },
    {
        content : "",
        classes : {
            "quest-item" : true,
            "animated" : true,
            "fadeOutLeft" : false,
            "item-hide" : false
        },
        contentBG : "images/point15.png",
        answers : [{
            selected : false,
            status : "fail"
        },{
            selected : false,
            status : "pass"
        },{
            selected : false,
            status : "fail"
        }],
        leftTime : 10,
        leftClass : {
            "timeAnime" : false
        }
    } //15
];

var getRandom = function(num,len,res){
    res = res || {};
    var n = Math.random() * len >> 0;

    if( n == len ) n = len - 1;

    if( num == 0 ){
        return res;
    }

    if( n in res ){
        return getRandom(num,len,res);
    }

    res[n] = true;
    return getRandom(num-1,len,res);

}

var getRandomKnow = function(num){
    var len = knowledge.length;
    num = num > len ? len : num;

    var res = getRandom(num,len);

    var arr = [],
        i = 0;

    for( var key in res ){
        knowledge[key].type = "knowledge";
        arr[i++] = knowledge[key];
    }

    return arr;
};

var getRandomPoint = function (num) {
    var len = point.length;
    num = num > len ? len : num;

    var res = getRandom(num,len);

    var arr = [],
        i = 0;

    for( var key in res ){
        point[key].type = "point";
        arr[i++] = point[key];
    }

    return arr;
};

var getRandomMust = function (num) {
        var len = must.length;
        num = num > len ? len : num;

        var res = getRandom(num,len);

        var arr = [],
            i = 0;

        for( var key in res ){
            must[key].type = "must";
            arr[i++] = must[key];
        }

        return arr;
    };

window.getQuest = function(k,p,m){
    var arr = [];

    var ka = getRandomKnow(k),
        pa = getRandomPoint(p),
        ma = getRandomMust(m);

    return arr.concat([],ka,pa,ma);

};

})(window,Math);