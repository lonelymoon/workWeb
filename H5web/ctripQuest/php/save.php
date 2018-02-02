<?php
date_default_timezone_set("Asia/Shanghai");
$code = $_POST["code"];

if(!$code || $_SERVER['HTTP_REFERER'] == ""){
    exit();
}

include("mysql.php");

$time = date("Y-m-d H:i:s");

$con = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","ctrip_quest","conn","UTF8");

while( $con->select("save_data") ){
    echo "0";
    exit();
}

if( $con->insert("save_data","date,code","'$time','$code'") ){
    echo "1";
} else {
    echo "0";
}

exit();

?>