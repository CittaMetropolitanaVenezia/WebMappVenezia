<?php

include('common/functions.php');
$address = $_GET['address'];
$callback = $_REQUEST['callback'];
$storeData = geocodeAddress($address);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $storeData)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $storeData));
}


die();