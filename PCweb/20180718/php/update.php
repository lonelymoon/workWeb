<?php
date_default_timezone_set("Asia/Shanghai");

$uid = $_POST['uid'];

if(!$uid || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$name = $_POST['name'];
$desc = $_POST['desc'];
$time = date("Y-m-d H:i:s");
$imgPath = $_POST['imgPath'];

$file = $_FILES['img'];
$img = $imgPath;

if(!empty($file["tmp_name"])){
	$nFileName = time().''.rand(10000, 1000000).$file["name"];
	$img = "/images/resource/".$nFileName;

	if( $imgPath && file_exists('../'.$imgPath) ){
		unlink('../'.$imgPath);
	}

	if( !move_uploaded_file($file["tmp_name"], '..'.$img) ){
		echo 2;
		exit();
	}
}

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ruxin_dahui","conn","UTF8");

$res = $con->update(data_save,"name='$name',descri='$desc',date='$time',imgSrc='$img'", "uid = $uid");

if($res){
	echo 1;
	exit();
} else {
	echo 0;
	exit();
}
?>