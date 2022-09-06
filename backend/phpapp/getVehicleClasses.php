<?php
include('common/functions.php');
$vehicle = $_GET['vehicle'];
$vehicleFuelType = $_GET['vehicleFuelType'];
$lang = $_GET['lang'];
$callback = $_REQUEST['callback'];
$classes = getVehicleClasses($vehicle,$vehicleFuelType,$lang);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $classes)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $classes));
}


die();