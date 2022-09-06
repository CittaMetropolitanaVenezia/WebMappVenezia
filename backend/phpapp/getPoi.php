<?php
include('common/functions.php');
$poiDesc = $_GET['poi'];
$area_id = $_GET['area_id'];
$callback = $_REQUEST['callback'];
$poi = getPoiFromDesc($poiDesc,$area_id);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $poi)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $poi));
}


die();