<?php
include("mysql.php");
date_default_timezone_set('Asia/Shanghai');

if( $_SERVER['HTTP_REFERER'] == "" ){
	?>
	<script type="text/javascript">
		window.location.href = "../index.html";
	</script>
	<?php
}

$mycon = new mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_yc","W13142gy","xiechengwenjuan","conn","UTF8");

$mycon->selectAll("xiechengwenjuan.datas");

$str = array();
$i = 0;

while( $row = mysql_fetch_array($mycon -> result) ){
	$strdata = json_decode($row["sdata"]);
	$str[$i++] = $strdata;
}

echo json_encode($str);

?>