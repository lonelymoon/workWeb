<?php

include("mysql.php");
date_default_timezone_set('Asia/Shanghai');

if( $_SERVER['HTTP_REFERER'] == "" ){
	?>
	<script type="text/javascript">
		window.location.href = "../index.html";
	</script>
	<?php
}

$val = $_POST["val"];

$mycon = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_yc","W13142gy","xiechengwenjuan","conn","UTF8");

if($mycon->insert("xiechengwenjuan.datas","sdata","'$val'")){
	echo 1;
	exit();
}

echo 0;

?>