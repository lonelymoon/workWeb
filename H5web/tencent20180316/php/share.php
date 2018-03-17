<?php

require("jssdk.php");
$appid = "wx1b2c4b4df592c45f";
$appsecret = "1da29715a87fedd52894335a444359fa";
$url = $_POST["signurl"];

$jssdk = new JSSDK($appid,$appsecret,$url);//这里填写自己的appid 和secret  
$signPackage = $jssdk->GetSignPackage();  

$result = json_encode($signPackage);

echo $result;

?>