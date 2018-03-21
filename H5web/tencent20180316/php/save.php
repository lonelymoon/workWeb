<?php
date_default_timezone_set("Asia/Shanghai");

$address = $_POST["address"];
$name = $_POST["name"];
$company = $_POST["company"];
$job = $_POST["job"];
$phone = $_POST["phone"];
$mail = $_POST["mail"];
$city = $_POST["place"];
$date = $_POST["date"];

if(!$address || !$phone || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("./mysql.php");

$time = date("Y-m-d H:i:s");

$con = new Mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","tencent_huiyi","conn","UTF8");

if( $con->insert("save",
	"address,name,company,job,phone,mail,city,date,etime",
	"'$address','$name','$company','$job','$phone','$mail','$city','$date','$time'") ){
	echo 1;
} else {
	echo 0;
}

exit();

?>