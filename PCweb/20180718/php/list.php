<?php
date_default_timezone_set("Asia/Shanghai");

$kind = $_POST['kind'];

if(!$kind || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ruxin_dahui","conn","UTF8");

$con->select("data_save", "*", "kinds = '$kind' AND hide = 0 ORDER BY idx");

$i = 0;
$data = array();

while( $res = mysql_fetch_array($con->result) ){
	$arr = array();
	$arr["uid"] = $res["uid"];
	$arr["name"] = $res["name"];
	$arr["describe"] = $res["descri"];
	$arr["img"] = $res["imgSrc"];
	$arr["date"] = $res["date"];
	$arr["kind"] = $res["kinds"];
	$arr["idx"] = $res["idx"];

	$data[$i++] = $arr;
}

echo json_encode($data);

?>