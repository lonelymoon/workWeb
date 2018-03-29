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

                el.src = src+"?ver="+new Date().getTime();
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

                el.src = src+"?ver="+new Date().getTime();
            });
        },
        "allEnd" : function(){
            setTimeout(function () {

                $(".loading-box").animateCss("rollOut",function(){
                    $(this).hide();
                    if($("#bgm")[0].paused)
                    $(".music").trigger("click");
                    $('.header-title,.header-sub1').animateCss("rollIn",function(){
                        $('.header-text').animateCss("fadeInRight",function(){
                            $('.header-subtitle').css("opacity",1).animateCss("slideInLeft",function(){
                                //$(".header-qq").addClass("qq-slideIn").one("transitionend webkitTransitionEnd",function(){
                                    $(".content-header").addClass("header-line-active");
                                //});
                            });
                        });
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

    $(window).on("scroll",function (e) {
        setTimeout(function(){
            $("[data-scrollIn]").each(function(){
                var top = $(this)[0].getBoundingClientRect().top;
                if(top <= se - 30 ) {
                   var ani = $(this).attr("data-ani"),
                       way = $(this).attr("data-way");
                   $(this)[way](ani).css("opacity",1).removeAttr("data-scrollIn data-way data-ani");
                }
            });
        },30);
    });

    $(".btn-box").on("click",function(){
        $("body").css("position","fixed");
        $(".my-layer").show();
    });

    $(".my-layer").on("touchmove",function(e){
        e.preventDefault();
    });

    $(".close-btn").on("click",function(e){
        $("body").css("position","relative");
        $('.my-layer').hide();
        $(".my-layer-wrapper").removeAttr("data-idx");
    });

    var save = {};
    
    var cityData = [
        {'id': '100', 'value': '长沙', 'parentId': '0'},
        {'id': '101', 'value': '郑州', 'parentId': '0'},
        {'id': '102', 'value': '杭州', 'parentId': '0'},
        {'id': '103', 'value': '济南', 'parentId': '0'},
        {'id': '104', 'value': '南京', 'parentId': '0'},
        {'id': '105', 'value': '重庆', 'parentId': '0'},
        {'id': '106', 'value': '成都', 'parentId': '0'},
        {'id': '107', 'value': '西安', 'parentId': '0'},
        {'id': '108', 'value': '合肥', 'parentId': '0'},
        {'id': '109', 'value': '武汉', 'parentId': '0'},
        {'id': '110', 'value': '沈阳', 'parentId': '0'},
        {'id': '111', 'value': '南昌', 'parentId': '0'}
    ];

    var timeData = [
        {'id': '1001', 'value' : "2018-03-27 14:30", 'parentId' : '100'},
        {'id': '1002', 'value' : "2018-03-28 14:30", 'parentId' : '101'},
        {'id': '1003', 'value' : "2018-03-29 14:30", 'parentId' : '102'},
        {'id': '1004', 'value' : "2018-04-02 14:30", 'parentId' : '103'},
        {'id': '1005', 'value' : "2018-04-03 14:30", 'parentId' : '104'},
        {'id': '1006', 'value' : "2018-04-09 14:30", 'parentId' : '105'},
        {'id': '1007', 'value' : "2018-04-10 14:30", 'parentId' : '106'},
        {'id': '1008', 'value' : "2018-04-11 14:30", 'parentId' : '107'},
        {'id': '1009', 'value' : "2018-04-12 14:30", 'parentId' : '108'},
        {'id': '1010', 'value' : "2018-04-17 14:30", 'parentId' : '109'},
        {'id': '1011', 'value' : "2018-04-18 14:30", 'parentId' : '110'},
        {'id': '1012', 'value' : "2018-04-19 14:30", 'parentId' : '111'},
    ];

    var address = {
        "100" : "长沙市雨花区德思勤城市广场西区德思勤创业大街二楼【千鲸海咖啡馆 】",
        "101" : "郑州金水区商务中央公园2号千玺广场【绿地JW万豪酒店3楼千玺会议室1+2】",
        "102" : "杭州市西湖区湖滨路28号【杭州凯悦酒店-二楼西湖厅二】",
        "103" : "济南市中区二环南路2888号【鲁能希尔顿酒店B2层领御厅】",
        "104" : "南京市鼓楼区江苏路3号 罗莱夏朵•颐和公馆【颐和馆二楼琅琊厅】",
        "105" : "重庆市渝中区民生路235号 【重庆JW万豪酒店6楼会议室1】",
        "106" : "成都市锦江区滨江东路9号【成都香格里拉大酒店1楼康定望江厅】",
        "107" : "西安市雁塔区慈恩路66号【西安威斯汀大酒店B2层朱雀厅】",
        "108" : "合肥市庐阳区濉溪西路256号【合肥香格里拉酒店2楼泸沽厅】",
        "109" : "武汉市武昌区临江大道96号 【武汉万达威斯汀酒店3楼长江厅】",
        "110" : "沈阳市沈河区青年大街115号（沈阳香格里拉大酒店二楼兰花厅2）",
        "111" : "南昌市青山湖区湖滨南路62号【游离卡布咖啡】"
    };

    $(".select-box").on("click",function(){

        var iosSelect = new IosSelect(2, [cityData, timeData],{
                title: '会议场次选择',
                itemHeight: 35,
                relation: [1,1,0,0],
                callback: function (selectOneObj, selectTwoObj) {
                    $(".select-box").html(selectOneObj.value);
                    var sarr = selectTwoObj.value.split(" "),
                        arr = sarr[0].split("-");
                    $(".select-result").html("会议时间："+arr[0]+"年"+arr[1]+"月"+arr[2]+"日");
                    save.place = selectOneObj.value;
                    save.date = selectTwoObj.value;
                    save.address = address[selectOneObj.id];
                }
        });

    });

    $('.next-btn1').on("click",function(){
        if( !save.place || !save.date ){
            wantAlert.setValues({
                title : "提示",
                msg : "请选择相应的会议场次后再进行操作"
            });
            wantAlert.showAlert();
            return false;
        }

        $(".my-layer-wrapper").attr("data-idx","2");
    });

    var canClick = true;

    $(".next-btn2").on("click",function(){

        if( !canClick ) return false;

        if( !check() ) return false;

        canClick = false;

        $.ajax({
            url : "php/save.php",
            type : "post",
            data : save,
            success : function(res){
                if( res == 1 ){
                    $(".my-layer-wrapper").attr("data-idx","3");
                } else {
                    wantAlert.setValues({
                        title : "错误",
                        msg : "上传出现错误，请刷新页面重试"
                    });
                    wantAlert.showAlert();
                }
                canClick = true;
            },
            fail : function(){
                wantAlert.setValues({
                    title : "错误",
                    msg : "上传出现错误，请刷新页面重试"
                });
                wantAlert.showAlert();

                canClick = true;
            }
        });

        var sarr = save.date.split(" "),
            arr = sarr[0].split("-")

        $(".message-time").html(arr[0]+"年"+arr[1]+"月"+arr[2]+"日 "+ (sarr[1] || "") );
        $(".message-address").html(save.address);
    });

    $(".next-btn3").on("click",function(){
        $(".close-btn").trigger("click");
    });

    function check(){
        var name = $("#name").val(),
            company = $("#company").val(),
            job = $("#job").val(),
            phone = $("#phone").val(),
            mail = $("#mail").val();

        if( !name ){
            wantAlert.setValues({
                title : "提示",
                msg : "请填写姓名"
            });
            wantAlert.showAlert();
            return false;
        }

        if( !company ){
            wantAlert.setValues({
                title : "提示",
                msg : "请填写公司"
            });
            wantAlert.showAlert();
            return false;
        }

        if( !job ){
            wantAlert.setValues({
                title : "提示",
                msg : "请填写职位"
            });
            wantAlert.showAlert();
            return false;
        }

        var phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

        if( !phoneReg.test(phone) ){
            wantAlert.setValues({
                title : "提示",
                msg : "请填写正确手机号"
            });
            wantAlert.showAlert();
            return false;
        }

        var mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if( !mailReg.test(mail) ){
            wantAlert.setValues({
                title : "提示",
                msg : "请填写正确邮箱"
            });
            wantAlert.showAlert();
            return false;
        }

        save.name = name;
        save.phone = phone;
        save.mail = mail;
        save.company = company;
        save.job = job;

        return true;
    }

    var u = navigator.userAgent,
        isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    wx.ready(function(){
        $("#bgm")[0].play();
        if(isIOS)
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
                    container.setAttribute("data-type","play");
                    return false;
                }

                var iTransform = getComputedStyle(image).transform;
                var cTransform = getComputedStyle(container).transform;
                image.style.transform = iTransform === 'none'
                    ? cTransform
                    : cTransform.concat(' ', iTransform);
                container.classList.remove('music-animate');
                container.setAttribute("data-type","pause");
            };
        }

        return function(type){
            if(type){
                $(".music").removeClass("pause");
                $(".music").attr("data-type","play");
                return false;
            }
            $(".music").addClass("pause");
            $(".music").attr("data-type","pause")
        };

    })();

});