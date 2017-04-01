jQuery(function($){

	var utils = uxwe.utils,
		templete = uxwe.templete;

	templete.loadTemplete([{
		"part" : "nav",
		"wrapper" : "#header"
	},{
		"part" : "category",
		"wrapper" : ".filter-box",
		"data" : {
			"categoryTargetElement" : ".lecturer-list"
		}
	},{
		"part" : "lecturer",
		"wrapper" : "#lecturer",
		"data" : {
		}
	}]);

});