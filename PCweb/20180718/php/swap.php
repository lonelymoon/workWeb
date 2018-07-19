<?php
date_default_timezone_set("Asia/Shanghai");

$fuid = $_POST['fuid'];
$suid = $_POST['suid'];
$fidx = $_POST['fidx'];
$sidx = $_POST['sidx'];

if(!$fuid || !$suid || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ruxin_dahui","conn","UTF8");

$res = $con->update(data_save,"idx = $sidx", "uid = $fuid");

if(!$res){
	echo 0;
	exit();
}

$res = $con->update(data_save,"idx = $fidx", "uid = $suid");

if( !$res ){
	$con->update(data_save,"idx = $fidx", "uid = $fuid");
	echo 0;
	exit();
} else {
	echo 1;
}

?>