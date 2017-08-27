<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Ajax File Uploader Plugin For Jquery</title>
<script type="text/javascript" src="jquery-1.8.2.js"></script>
<script type="text/javascript" src="ajaxfileupload.js"></script>
<script type="text/javascript">
	function ajaxFileUpload() {
		var src = window.location.href; 			
		var code1 = src.indexOf("?openid=");
 		var code2 = src.indexOf("&",code1 + 4);
		var code3 = code2 - code1;
		var code4 = code3 - 5;
		var openid = src.substr(code1 + 8);
		alert(openid);
		$.ajaxFileUpload({
			url : 'upload',
			secureuri : false,
			fileElementId : 'fileToUpload',
			dataType : 'json',
			data : {username : $("#username").val(),openid : openid},
			success : function(data, status) {
				$('#viewImg').attr('src',data.picUrl);
			},
			error : function(data, status, e) {
				alert('上传出错');
			}
		})

		return false;

	}
</script>
</head>

<body>
	<h1>选择图片后,点击按钮上传</h1>
	<input id="fileToUpload" type="file" size="45" name="fileToUpload"
		class="input">
	<button class="button" onclick="ajaxFileUpload()">上传</button>
	<br>
	<img id="viewImg">
</body>
</html>