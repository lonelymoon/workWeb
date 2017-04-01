jQuery(function($){
	var utils = uxwee.utils,
		hasCode = false,
		timer,
		pastTimeCount = 0,
		Ticket,
		url = utils.getUrlObj('source'),
		id = utils.getUrlObj('id') || 0;

	utils.on('.type-wechat','click',function(e){
		if(!hasCode){
			getQRcode();	
		}else{
			utils.getElement('.QRcode-layer').style.display = "block";
			checkLogin();
		}
	});

	utils.on('.close','click',function(e){
		utils.getElement('.QRcode-layer').style.display = "none";
		clearInterval(timer);
	});

	function getQRcode(){
		utils.ajax({
			method : 'post',
		/*	//url : '/weixintest/Creatercode.action',
*/			url : '/weixintest/Getercode.action',
			data : {userName:'userName01',password:'password01'},
			dataType : 'json',
			success : function(data){
	   			var url = data.Ercode_url;
	   			Ticket = data.Ticket;
	   			utils.getElement('.code-box img').setAttribute('src',url);
	   			utils.getElement('.QRcode-layer').style.display = 'block';
	   			hasCode = true;
	   			checkLogin();
	    	},
	    	fail : function(){
	    		alert("数据库连接失败,请稍候重试");
	    	}
		});

	};

	function checkLogin(){
		timer = setInterval(function(){
			if(pastTimeCount >= 300000){
				pastTimeCount = 0;
				hasCode = false;
				utils.getElement('.close').click();
				return false;
			}
			pastTimeCount += 1000;
			utils.ajax({
				"method" : "post",
				/*//"url" : "/weixintest/Ercodeload.action",
*/				"url" : "/weixintest/Ercodeload.action",
				"data" : {ercode_ticket:Ticket},
				"dataType" : "json",
				"success" : function(data){
					var ticket = data.strflg;
		   			if(ticket == "0"){
		   				if(url == "enroll")
		   				window.location.href = "../enroll/index.html?id="+id;
		   				else
		   				window.location.href = "../index.html";
		   			} else if (ticket == "1"){
		   				window.location.href = "../register/index.html?source="+url+"&id="+id;
		   			} else if(ticket == 2){
		   				
		   			} else {
		   				alert("二维码已失效");
		   			}
				},
				"fail" : function(e){
					alert("数据库连接失败,请稍候重试");
				}
			});

		},3000);
	}

});