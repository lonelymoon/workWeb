<?php

require("jssdk.php");
$appid = "wx35951132f79b4782";
$appsecret = "0324bfaa7fde377a73c2170f80252937";
$url = $_POST["signurl"];

$jssdk = new JSSDK($appid,$appsecret,$url);//这里填写自己的appid 和secret  
$signPackage = $jssdk->GetSignPackage();  

$result = json_encode($signPackage);

echo $result;

?>