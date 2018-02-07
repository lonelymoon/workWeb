(function(window,Math){

var questTemplate = "<div class='quest-box'>\
        <div class='quest-wrapper'>\
            <div :class='startClasses' @animationend.once='startAnimeEnd'>\
                <img src='images/face.jpg'>\
                <div class='quest-start-btn' @click='start'></div>\
            </div>\
            <div :class='item.classes' :style='item.styles' v-for='item in items' :data-id='item.id' @animationend.once='animeEnd'>\
                <div class='quest-item-bg'>\
                    <img :src='item.contentBG' >\
                </div>\
                <div class='quest-index-box'>\
                    <div class='quest-index'>\
                        <div class='quest-index-img' :style='item.indexStyles'>\
                            <img src='images/index.png'>\
                        </div>\
                    </div>\
                    <div class='quest-num'>\
                        <img src='images/len.png'>\
                    </div>\
                </div>\
                <div class='quest-item-leftTime'>\
                    <div class='quest-item-leftTime-img' :data-time='item.leftTime'>\
                        <img src='images/time.png?v=1.1'>\
                    </div>\
                </div>\
                <div class='quest-item-content'>\
                    <div class='quest-answer-box'>\
                        <div class='quest-item-answer' :data-selected='answer.selected' v-for='(answer, index) in item.answers'\
                        @click='check(answer.status,index)'></div>\
                    </div>\
                </div>\
            </div>\
            <div class='quest-alert-item' v-show='alert'>\
                <img src='images/alert.png'>\
                <div class='quest-alert-btn' @click='refresh()'></div>\
            </div>\
            <div class='quest-end-wrapper'>\
                <div class='quest-item-end' v-show='results.show1'>\
                    <img src='images/show1.jpg'>\
                    <div class='quest-end-results'>{{correctCount}}</div>\
                    <div class='quest-code'>\
                        {{code}}\
                    </div>\
                </div>\
                <div class='quest-item-end' v-show='results.show2'>\
                    <img src='images/show2.jpg'>\
                    <div class='quest-end-results'>{{correctCount}}</div>\
                </div>\
                <div class='quest-item-end' v-show='results.show3'>\
                    <img src='images/show3.jpg'>\
                    <div class='quest-end-results'>{{correctCount}}</div>\
                </div>\
                <div class='quest-item-end' v-show='results.show4'>\
                    <img src='images/show4.jpg'>\
                    <div class='quest-end-results quest-end-result4'>{{correctCount}}</div>\
                </div>\
                <div class='quest-item-end' v-show='results.show5'>\
                    <img src='images/show5.jpg'>\
                    <div class='quest-end-results quest-end-result5'>{{correctCount}}</div>\
                </div>\
            </div>\
        </div>\
    </div>";

window.vm = new Vue({
    el : "#page",
    template : questTemplate,
    components : {},
    props : {},
    data : {
        startClasses : {
            "quest-first-page" : true,
            "animated" : true,
            "rollOut" : false,
            "item-hide" : false
        },
        results : {
            show1 : false,
            show2 : false,
            show3 : false,
            show4 : false,
            show5 : false
        },
        correctCount : 0,
        wrongCount : 0,
        items : {},
        activeId : "quest_1",
        idx : 1,
        timer : null,
        cando : false,
        code : "",
        alert : false,
        onAnimating : false
    },
    computed : {
        length : function(){
            var n = 0;
            for( var i in this.items ){
                n++;
            }
            return n;
        }
    },
    methods : {
        refresh : function () {
            window.location.href = "./index.html";
        },
        countTime : function(){
            var _self = this,
                ltime = this.items[this.activeId].leftTime;

            if(ltime == 0){
                this.failNext();
                return false;
            }

            this.timer = setTimeout(function(){
                _self.$set(_self.items[_self.activeId],"leftTime",ltime-1);
                _self.countTime();
            },1000);
        },
        check : function(status,index){
            if(this.onAnimating){
                return false;
            }
            this.onAnimating = true;
            this[status](index);
        },
        pass : function(index){
            this.next(index);
            this.correctCount++;
        },
        fail : function(index){
            this.next(index);
            this.wrongCount++;
        },
        start : function(){
            var count = Number(localStorage.count);
            if( count > 0 ){
                localStorage.count = count - 1;
                this.cando = true;
            }

            if(!this.cando){
                alert("你今天的机会已经用完");
                return false;
            }
            this.$set(this.startClasses,"rollOut",true);
        },
        startAnimeEnd : function(){
            this.$set(this.startClasses,"item-hide",true);
            this.countTime();
        },
        ajax : function(code){
            var fd = new FormData();
            fd.append("code",code);
            var xhr = new XMLHttpRequest();
            xhr.onload = function(result){
                console.log(result.target.response);
            };
            xhr.open("post","php/save.php");
            xhr.send(fd);
        },
        end : function(){
            var num = this.length - this.correctCount;
            if( num == 0 ){
                this.results.show1 = true;
                var code = Math.random().toString(36).substr(2).substring(0,8);
                this.code = code;
                changeDESC("我是重度旅游成瘾患者，我的病情严重程度超过了98.8%人");
                this.ajax(code);
            } else if( num <= 2 ){
                this.results.show2 = true;
                changeDESC("我是中度旅游成瘾患者，我的病情严重程度超过了88.7%人");
            } else if( num <= 5 ){
                this.results.show3 = true;
                changeDESC("我是轻度旅游成瘾患者，我的病情严重程度超过了68.5%人");
            } else if( num <= 8 ){
                this.results.show4 = true;
                changeDESC("我疑似旅游成瘾患者，我的病情严重程度超过了38.5%人");
            } else {
                this.results.show5 = true;
                changeDESC("我不是旅游成瘾患者，我的病情严重程度超过了18.6%人");
            }
        },
        next : function(index){
            clearTimeout(this.timer);
            var _self = this;
            this.$set(this.items[this.activeId].answers[index],"selected",true);
            setTimeout(function(){
                _self.$set(_self.items[_self.activeId].classes,"rollOut",true);
            },300);
        },
        failNext : function(){
            this.wrongCount++;
            var _self = this;
            setTimeout(function(){
                _self.$set(_self.items[_self.activeId].classes,"rollOut",true);
            },300);
        },
        animeEnd : function(){
            var classes = this.items[this.activeId].classes;
            this.$set(classes,"item-hide",true);

            if(this.idx < this.length){
                this.idx++;
                this.activeId = "quest_"+this.idx;
                this.countTime();
                this.onAnimating = false;
                return false;
            }
            this.end();
        },
        saveLocal : function(){
            var date = localStorage.date,
                today = new Date().getDate();

            if( today != date){
                localStorage.count = 1;
                localStorage.hasShared = "no";
                localStorage.date = today;
            }
        },
        createQuest : function(){
            var res = getQuest(4,7,1),
                len = res.length,
                obj = {};

            for( var i = 0, quest; quest = res[i++]; ){
                var name = "quest_" + i;
                quest.id = name;
                quest.classes.rollOut = false;
                quest.indexStyles = {
                    "transform": 'translate( '+ (-10 / 12 * (i - 1)) + 'rem, 0rem )'
                };
                quest.styles = {
                    "z-index" : len - i + 1
                };
                obj[name] = quest;
            }

            this.items = obj;
        }
    },
    created : function(){
        this.createQuest();
    },
    mounted : function(){
        this.saveLocal();
        window.onload = function(){
           setTimeout(function () {
               document.querySelector(".loading").style.display = "none";
               $(".music").trigger("click");
           },500);
        };
    }
});

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

})(window,Math);