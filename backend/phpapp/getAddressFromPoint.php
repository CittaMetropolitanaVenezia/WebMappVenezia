<?php

include('common/functions.php');
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$language = $_GET['language'];
$callback = $_REQUEST['callback'];
$address = geocodeAddressFromLocation($lat,$lng,$language);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $address)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $address));
}