<?php
session_start();

$r = $_POST["r"];
$ac = $_POST["account"] ? $_POST["account"] : $_SESSION["account"];
$pw = $_POST["password"] ? $_POST["password"] : $_SESSION["password"];

if( !$r || !$ac || !$pw || $_SERVER['HTTP_REFERER'] == ""){
	echo 0;
	exit();
}

include("./mysql.php");

$con = new Mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","tencent_huiyi","conn","UTF8");

$con->selectAll("user");

while( $res = mysql_fetch_array($con->result) ){
	if( $ac == $res["user"] && $pw == $res["password"] ){
		$_SESSION["account"] = $ac;
		$_SESSION["password"] = $pw;
		echo 1;
		exit();
	}
}

echo 0;

?>