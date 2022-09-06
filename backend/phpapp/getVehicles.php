<?php
include('common/functions.php');
$callback = $_REQUEST['callback'];
$lang = $_GET['lang'];
$vehicles = getVehicles($lang);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $vehicles)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $vehicles));
}


die();