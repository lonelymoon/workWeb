jQuery(function($){
	if ( !zShan.msg )
	zShan.msg = {};

	var ObjEvent = zShan.ObjEvent;
		zShan.msg.isUploading = false;

	zShan.msg.propertyId = "1";
	zShan.msg.category = "1";
	zShan.msg.hasPost = false;

	$('.select-category').on('click',function(e){
		$(".select-options").slideToggle(100);
	});

	$('.zs-content-visitors').on('click','.zs-visitors-item',function(e){

		$('.visitor-selected').find("img").toggleClass("hide");
		$('.zs-visitors-item').removeClass('visitor-selected');
		$(this).addClass("visitor-selected").find("img").toggleClass("hide");

		zShan.msg.propertyId = $(this).attr("data-id");
		changeInput(zShan.msg.propertyId);
		
	});

	$('.select-options').on('click',"li",function(e){
		var id = $(this).attr("data-flag");
		zShan.msg.category = id;
		$('.select-val').html($(this).find('.'+ObjEvent.getUrlObj()["language"]+'-text').text());
		$('.select-options').hide();
	});

	zShan.msg.canUploadNum = 0;

	checkName("#companyName");
	checkPerson("#contactPerson");
	checkMail("#email");
	checkPhone("#phone");

	$('#sub').on('click',function(e){
		if(zShan.msg.hasPost){
			alert("您已经报过名");
			return;
		}

		if ( zShan.msg.canUploadNum>=4 && !zShan.msg.isUploading) {
			zShan.msg.isUploading = true;
			uploadMsg(zShan.msg);
		}
	});
});

function changeInput(id){
	if ( id === "1" ) {
		$(".category").show();
	} else {
		$(".category").hide();
	}
}

function checkName(eleName){
	$(eleName).on('change',function(e){
		var val = $(eleName).val();
		if ( val == "" ) {
			notPass(eleName);
		} else {
			pass(eleName);
		}

	});
}

function checkPerson(eleName){
	$(eleName).on('change',function(e){
		var val = $(eleName).val();
		if ( val == "" ) {
			notPass(eleName);
		} else {
			pass(eleName);
		}

	});
}

function checkMail(eleName){
	$(eleName).on('change',function(e){

		var val = $(eleName).val(),
			reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if ( val == "" || !reg.test(val)) {
			notPass(eleName);
		} else {
			pass(eleName);
		}

	});
}

function checkPhone(eleName){
	$(eleName).on('change',function(e){

		var val = $(eleName).val();
		if ( val == "") {
			notPass(eleName);
		} else {
			pass(eleName);
		}

	});
}

function notPass(eleName){
	zShan.msg.canUploadNum--;
	$(eleName).addClass("redBorder");
}

function pass(eleName){
	zShan.msg.canUploadNum++;
	$(eleName).removeClass("redBorder");
}

function uploadMsg(msg){
	msg.companyName = $('#companyName').val();
	msg.contactPerson = $('#contactPerson').val();
	msg.fax = $('#Fax').val();
	msg.phone = $('#phone').val();
	msg.email = $('#email').val();
	msg.companyAddress = $('#companyAddress').val();
	
	if ( msg.propertyId !== "1" ) {
		msg.category = 0;
	}	

	$.ajax({
		type : "post",
		data : {companyName:msg.companyName,contactPerson:msg.contactPerson,fax:msg.fax,phone:msg.phone,email:msg.email,companyAddress:msg.companyAddress,propertyId:msg.propertyId,category:msg.category},
		dataType : "json",
		url : "/iitczs/servlet/SignupServlet",
		success : function(data){
			alert("报名成功");
			msg.isUploading = false;
			msg.hasPost = true;
		},
		error : function(data){
			
		}
	});

}