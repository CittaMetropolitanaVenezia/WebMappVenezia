<?php
include('common/functions.php');
$vehicle = $_GET['vehicle'];
$callback = $_REQUEST['callback'];
$lang = $_GET['lang'];
$fuelTypes = getVehicleFuelTypes($vehicle,$lang);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $fuelTypes)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $fuelTypes));
}


die();