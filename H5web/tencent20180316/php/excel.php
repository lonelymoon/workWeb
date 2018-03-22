<?php
session_start();

if( !$_SESSION["password"] || !$_SESSION["account"] || $_SERVER['HTTP_REFERER'] == "" ){
?>
	<script type="text/javascript">
		window.location.href = "../";
	</script>
<?php
	exit();
}

include("Classes/excel.php");
include("./mysql.php");

$con = new Mysql("devweilufei.mysql.rds.aliyuncs.com","aochey_zz","W13142gy","tencent_huiyi","conn","UTF8");

$con->select("save","*","name = name group by name,city,phone order by gid desc");

$data = array();
$i = 0;

while( $res = mysql_fetch_array($con->result) ){
	$arr = array(
		$res["gid"],
		$res["name"],
		$res["etime"],
		$res["phone"],
		$res["mail"],
		$res["company"],
		$res["job"],
		$res["address"],
		$res["date"],
		$res["city"]
	);
	$data[$i++] = $arr;
}

$title = array(
	'id',
	'姓名',
	'报名时间',
	'电话',
	'邮箱',
	'公司',
	'职位',
	'会议地址',
	'会议日期',
	'会议举办城市'
);

exportExcel($title, $data, '腾讯唤新计划报名表', './', true);

?>