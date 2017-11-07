jQuery(function($){

	var data = {},
		uploading = false;

	$('#quest-submit').on("click",function(e){

		initData();

	});

	function sendData(data){

		var strData = JSON.stringify(data);

		if(uploading) return false;

		uploading = true;

		$.ajax({
			type : "post",
			url : "php/save.php",
			data : {
				val : strData
			},
			success : function(data){
				if(data == 1){
					wantAlert.setValues({
						title : "提示",
						msg : "您的答卷已提交，感谢您的意见",
						callback : function(){
							window.location.href = "https://m.ctrip.com/webapp/tours/marketing/index?pageid=604";
						}
					});
				} else {
					wantAlert.setValues({
						title : "提示",
						msg : "您的答卷提交失败，请稍后重试"
					});
				}
				wantAlert.showAlert();
				uploading = false;
			},
			fail : function(status){
				wantAlert.setValues({
					title : "提示",
					msg : "您的答卷提交失败，请稍后重试"
				});
				wantAlert.showAlert();
				uploading = false;
			}
		});

	};


	function initData(){

		var $eles = $(".quest-column[data-idx]"),
			canUpload = true;

		$eles.each(function(){

			var $type = $(this).attr("data-type"),
				$val = getValFromInput($type,this),
				$idx = $(this).attr("data-idx");

			if( $(this).attr("data-require") != "false" && !$val ){
				wantAlert.setValues({
					title : "提示",
					msg : "第"+$idx+"题没有填选答案，请完成后继续"
				});
				wantAlert.showAlert();
				canUpload = false;
				return false;
			}

			data["quest_"+$idx] = {
				"qid" : $idx * 1,
				"title" : $(this).find(".quest-title").text(),
				"value" : $val
			};

		});

		if(canUpload)
		sendData(data);

	};

	function getValFromInput(type,target){
		return !!fnGetVal[type] && fnGetVal[type](target);
	}

	var fnGetVal = {

		radio : function(target){
			var $val = $(target).find("input:checked").val() || "";
			return $val;
		},

		checkbox : function(target){
			var $checked = $(target).find("input:checked"),
				$arr = [];

			$checked.each(function(){
				var $val = $(this).val();
				if(!$val) {
					console.log("有多选框的预设值遗漏");
					return false;
				}
				$arr.push($val);
			});

			if($arr.length == 0) return "";

			return $arr.join(",");
		},

		text : function(target){
			var $val = $(target).find(":text").eq(0).val() || "";
			return $val;
		}

	};

});