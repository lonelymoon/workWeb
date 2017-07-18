<?php

include("mysql.php");
date_default_timezone_set('Asia/Shanghai');

if( $_SERVER['HTTP_REFERER'] == "" )
{
	?>
	<script type="text/javascript">
		window.location.href = "../index.html";
	</script>
	<?php
}

$name = $_POST["name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$date = date("Y-m-d H:i:s");

$mycon = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_yc","W13142gy","yechunlvyou","conn","UTF8");

if($mycon -> insert("user","name,email,phone,date","'$name','$email','$phone','$date'")){
	echo 1;
	exit();
}

echo 0;

?>