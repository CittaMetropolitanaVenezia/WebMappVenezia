<?php
include('common/functions.php');
$coords = $_GET['coords'];
$callback = $_REQUEST['callback'];
$area = getClickedArea($coords);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $area)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $area));
}


die();