<?php
date_default_timezone_set("Asia/Shanghai");

$uid = $_POST['uid'];

if(!$uid || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ruxin_dahui","conn","UTF8");

$res = $con->update(data_save,"hide = 1", "uid = $uid");

if( $res ){
	echo 1;
	exit();
} else {
	echo 0;
	exit();
}

?>