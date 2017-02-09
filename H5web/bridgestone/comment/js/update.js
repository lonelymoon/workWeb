(function($){
	var num=0;
	var $evHandle = "ontouchstart" in document? "tap":"click";
	$('#upload').val("");
	$('#lb_upload').trigger($evHandle);
	$('#upload').off('change').on('change',img_upload);

function img_upload(){
	var upFile = this.files[0],
		file_Name = upFile.name,
		file_Type = upFile.type,
		file_Size = 0;

	if(!file_Type)
	file_Type = "image/" + file_Name.split('.').pop().toLowerCase();
	
	var file_upload_info = {
		name : upFile.name || upFile.fileName,
		size : upFile.size || upFile.fileSize,
		modTime:upFile.lastModifiedDate.valueOf(),
		blob : upFile,
	};

	num = $('#img_box').find('.img_box').length;
	//var oImg = null;
	//	oImg= document.createElement("img");
	// 加载图片
	//$('#img_box').append(oImg);
	// 使用FileReader读取
	//$('#img_box img').wrap('<div class="img_box"></div>');
	//$('.img_box').wrap("<div></div>");
	$('#upload').val("");
	$('#img_box').append('<div class="img_box"></div>');
	$('.img_box').eq(num).wrap("<div></div>");
	var sp = '<span class="closeImg">-</span>';
	$('#img_box>div').append(sp);
	var oReader = new FileReader();
	oReader.onload = function(e){
		var sBase64 = e.target.result;
		// 部分Android下base64字符串格式不完整
		if(window.gIsAndroid && sBase64.indexOf("data:image/") != 0){
			var sMime = file_Name.split(".").pop().toLowerCase();
			sBase64 = sBase64.replace("base64,", "image/" + sMime + ";base64,");
		}
		//oImg.src = sBase64;
		$('.img_box').eq(num).css({'background-image':'url('+sBase64+')','background-size':'cover'});
		console.log(num);
		sBase64 = null;
		var he = $('#img_box').height();
		if($("#img_box .img_box").length<=3)
		{
			$('.add_more').remove();
			$('#img_box>div').css('width',he+'px');
			$('#img_box').append('<label for="upload" class="add_more" style="line-height:'+(he-2)+'px;width:'+(he-2)+'px;height:'+(he-2)+'px;">十</label>');
		} else {
			$('.add_more').remove();
			$('#img_box>div').css('width',he+'px');
			$('.pic_choose').off($evHandle);
		}

		$('.closeImg').on($evHandle,function(e){
			$(this).parent('div').remove();
			$('#upload').val("");
			if($("#img_box .img_box").length==0)
			$('.add_more').remove();
			else if($("#img_box .img_box").length==3)
			{
				$('#img_box').append('<label for="upload" class="add_more" style="line-height:'+(he-2)+'px;width:'+(he-2)+'px;height:'+(he-2)+'px;">十</label>');
			}
		});
	}
	oReader.readAsDataURL(upFile);
}
})(jQuery);