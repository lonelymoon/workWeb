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

$name = addslashes($_POST["name"]);
$phone = addslashes($_POST["phone"]);
$email = addslashes($_POST["email"]);
$company = addslashes($_POST["company"]);
$job = addslashes($_POST["job"]);
$prop = addslashes($_POST["prop"]);
$cost = addslashes($_POST["cost"]);
$used = addslashes($_POST["used"]);
$know = addslashes($_POST["know"]);
$prefer = addslashes($_POST["prefer"]);
$standard = addslashes($_POST["standard"]);
$problem = addslashes($_POST["problem"]);
$targets = addslashes($_POST["targets"]);
$send = addslashes($_POST["send"]);
$sendTwo = addslashes($_POST["sendTwo"]);
$date = date("Y-m-d H:i:s");

$mycon = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_yc","W13142gy","tenxunyingxiao","conn","UTF8");

if($mycon->insert(
	"tenxunyingxiao.user",
	"name,phone,email,company,date,job,prop,cost,used,know,prefer,standard,problem,targets,send,sendTwo",
	"'$name','$phone','$email','$company','$date','$job','$prop','$cost','$used','$know','$prefer','$standard','$problem','$targets','$send','$sendTwo'")
){
	echo 1;
	exit();
}

echo 0;

?>