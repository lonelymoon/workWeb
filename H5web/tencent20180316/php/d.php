<?php
session_start();

if( !$_POST["check"] || !$_SESSION["password"] || !$_SESSION["account"] || $_SERVER['HTTP_REFERER'] == "" ){
	echo 0;
	exit();
}

include("./mysql.php");

$con = new Mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","tencent_huiyi","conn","UTF8");

$con->select("save","*","name = name group by name,city,phone order by gid desc");

$i = 0;
$data = array();

while( $res = mysql_fetch_array($con->result) ){
	$arr = array();
	$arr["id"] = $res["gid"];
	$arr["name"] = $res["name"];
	$arr["company"] = $res["company"];
	$arr["address"] = $res["address"];
	$arr["phone"] = $res["phone"];
	$arr["mail"] = $res["mail"];
	$arr["date"] = $res["date"];
	$arr["job"] = $res["job"];
	$arr["city"] = $res["city"];
	$arr["etime"] = $res["etime"];

	$data[$i++] = $arr;
}

echo json_encode($data);

?>