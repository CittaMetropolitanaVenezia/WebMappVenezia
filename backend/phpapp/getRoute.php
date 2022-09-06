<?php

include('common/functions.php');
$waypoint0 = $_GET['waypoint0'];
$waypoint1 = $_GET['waypoint1'];
$waypoints = $_GET['waypoints'];
$language = $_GET['language'];
$lastwpoint = $_GET['lastwpoint'];
$callback = $_REQUEST['callback'];
$route = getRoute($waypoint0,$waypoint1,$language,$waypoints,$lastwpoint);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $route)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $route));
}