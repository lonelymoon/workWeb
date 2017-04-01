(function(window,undefined){

var utils = uxwe.utils,
	templete = uxwe.templete;

var timeline = [{
	"time" : "2012.7",
	"whatHappend" : "UXWee成立"
},{
	"time" : "2012.9",
	"whatHappend" : "第一次讲座活动"
},{
	"time" : "2012.12",
	"whatHappend" : "组委会成立"
},{
	"time" : "2013.1",
	"whatHappend" : "志愿者管理组成立"
},{
	"time" : "2013.8",
	"whatHappend" : "第一届人本大会"
}];

function cerateTimeline(selector){
	var wrapper = utils.getElement(selector),
		temp = "";

	for (var i = 0, tl_list; tl_list = timeline[i++]; ) {
		var list = utils.crtElement('li',{
			"class" : "time-line"
		}), time = utils.crtElement('span',{
			"class" : "li-time"
		}), happen = utils.crtElement('span',{
			"class" : "li-whatHappend"
		});

		time.innerHTML = tl_list["time"];
		happen.innerHTML = tl_list["whatHappend"];

		list.appendChild(time);
		list.appendChild(happen);

		temp += list.outerHTML;

	}

	wrapper.innerHTML = temp;

}


templete.loadTemplete([{
	"part" : "nav",
	"wrapper" : "#header"
}]);

cerateTimeline('.timeline-box');

})(window);