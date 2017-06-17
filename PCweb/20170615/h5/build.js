({
    baseUrl: 'js',
    fileExclusionRegExp : /^(r|build)\.js$/,
    removeCombined : true,
    name : "main",
    out : "main-pack.js",
    paths : {
        "jquery" : "jquery.min",      //jquery
        "swiper" : "swiper.min",      //swiper
        "countUp" : "jquery.countup.min",
        "waypoints" : "jquery.waypoints.min",
        "css" : "css",
        "main" : "main"
    }
})