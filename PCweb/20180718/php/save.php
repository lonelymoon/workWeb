<?php
session_start();
date_default_timezone_set("Asia/Shanghai");

$name = $_POST['name'];

if(!$name || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$desc = $_POST['desc'];
$kind = $_POST['kind'];
$time = date("Y-m-d H:i:s");

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ruxin_dahui","conn","UTF8");

$con->selectAll("data_save");

if($_SESSION['len']){
	$_SESSION['len']++;
	$len = $_SESSION['len'];
} else {
	$len = $con->db_num_rows();
	$_SESSION['len'] = $len;
}

$file = $_FILES['img'];
$img = "";

if(!empty($file["tmp_name"])){
	$nFileName = time().''.rand(10000, 1000000).$file["name"];
	$img = "/images/resource/".$nFileName;

	if( !move_uploaded_file($file["tmp_name"], '..'.$img) ){
		echo 2;
		exit();
	}
}

if($con->insert("data_save", "name,descri,imgSrc,date,kinds,idx,hide","'$name','$desc','$img','$time','$kind',$len,0")){
	echo 1;
} else {
	echo 0;
}

exit();

?>