<?php

include('common/functions.php');
$day = $_GET['day'];
$callback = $_REQUEST['callback'];
$ecoLayers = getEcoLayers($day);

if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('layers' => $ecoLayers)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $ecoLayers));
}  