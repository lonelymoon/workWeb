jQuery(function($){

	var utils = uxwee.utils,
		tData = {},
		canClick = true,
		lPhone,
		isPosting = false;

	function startCount(num){

		utils.addClass('.code-after','sending');
		utils.getElement('.code-after').innerHTML =  num + "秒后可重新发送";
		setTimeout(function(){
			if(num > 0)
			startCount(num-1);
			else {
				utils.removeClass('.code-after','sending');
				utils.getElement('.code-after').innerHTML = "点击获取验证码";
				canClick = true;
			}
		},1000);
	}

	utils.on('.code-after','click',function(e){
		if(!canClick){
			return false;
		}

		var phone = utils.getElement('#phone'),
			number = phone.value;

		utils.removeClass(phone,'alert');
		if(!(/^1[34578]\d{9}$/.test(number))){
			alert("请输入正确的手机号码");
			utils.addClass(phone,'alert');
			phone.focus();
			return false;
		}

		canClick = false;

		utils.ajax({
			"method" : "post",
	   		"url" : "/Registerphone.action",
	   		"dataType" : "json",			
	    	"data": {
	    		strphonenumber : number
	    	},
	   		"success" : function(data){
	   			if(data.strflg == "1"){
	   				canClick = true;
	   				alert("验证码发送失败");
	   			} else if(data.strflg == "0"){
	   				lPhone = number;
	   				startCount(60);
	   			} else {
	   				canClick = true;
	   				alert('该手机号码已被注册');
	   			}
	    	},
	    	"fail" : function(){
	    		canClick = true;
	    		alert("数据库连接失败,请稍候重试");
	    	}
		});
	});

	utils.on('.btn-submit','click',function(e){
		if(isPosting){
			return false;
		}

		var name = utils.getElement("#name"),
			phone = utils.getElement('#phone'),
			code = utils.getElement('#code'),
			company = utils.getElement('#company'),
			job = utils.getElement('#job span'),
			duration = utils.getElement('#duration'),
			testArr = [];

		testArr.push(name,phone,code,company);

		for( var i = 0, l = testArr.length; i < l; i++ ){
			utils.removeClass(testArr[i],'alert');
			if($.trim(testArr[i].value) == ""){
				utils.addClass(testArr[i],'alert');
				testArr[i].focus();
				return false;
			}
		}

		if(isNaN(duration.value)){
			alert("请填入数字");
			duration.focus();
			return false;
		}

		isPosting = true;
		tData = {
			"strname":name.value,
			"intage":20,
			"strbirthtime":"1990-11-10",
			"intid":0,
			"strsex":"2",
			"strcompany" :company.value,
			"strjob":job.innerHTML,
			"intworktime":duration.value,
			"radom" : code.value,
			"stremail":"237146050@qq.com",
			"strqqnumber":'9527'
		};

		var key = utils.getUrlObjs(),
			href = "";

		if(key.source == "enroll"){
			href = "../enroll/index.html?id="+key.id;
		} else {
			href = "../index.html";
		}

		utils.ajax({
			"method" : 'post',
	   		"url" : "/Register.action",   			
	    	"data" : tData,
	    	"dataType" : "json",
	   		"success" : function(data){	
	   			if(data.strflg == 0){
	   				window.location.href = href;
	   			} else {
	   				alert("验证码验证失败");
	   			}
	   			isPosting = false;
	    	},
	    	"fail" : function(){
	    		isPosting = false;
	    		alert("数据库连接失败,请稍候重试");
	    	}
		});
	});

	$('.selector').on('click',function(e){
		$(this).find('ul').slideToggle(300);
	});

	utils.on('#job','click','li',function(e){
		var tar = this,
			text = tar.innerHTML,
			id = tar.getAttribute('data-id');

		$(tar).parents('.selector').find('span').html(text);

		if(id){
			$(tar).parents('.selector').find('span').attr('data-id',id);
		}
	});

});