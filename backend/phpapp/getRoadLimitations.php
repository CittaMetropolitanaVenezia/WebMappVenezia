<?php

include('common/functions.php');
$day = $_GET['day'];
$timezone = $_GET['timezone'];
$vehicle = $_GET['vehicle'];
$vehicleFuel = $_GET['vehicleFuel'];
$vehicleClass = $_GET['vehicleClass'];
$lang = $_GET['lang'];

$callback = $_REQUEST['callback'];


$roads = getRoads($day,$timezone,$vehicle,$vehicleFuel,$vehicleClass,$lang);
$limitMsg = getAllertLvls($day);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $roads,'limitationMsg' => $limitMsg)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $roads)); 
}