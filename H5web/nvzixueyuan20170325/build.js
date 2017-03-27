({
    baseUrl: 'js',
    fileExclusionRegExp : /^(r|build)\.js$/,
    removeCombined : true,
    name : "main",
    out : "main-built.js",
    paths : {
        "jquery" : "plugs/jquery.min",      //jquery
        "swiper" : "plugs/swiper.min",      //swiper
        "iscroll" : "plugs/iscroll-probe",  //iscroll
        "hammer" : "plugs/hammer.min",      //hammer
        "pageScroll" : "./page.scroll",     //iscroll.js
        "pageHand" : "./page.hands",        //hammer.js
        "page" : "./page",
        "main" : "./main"
    }
})