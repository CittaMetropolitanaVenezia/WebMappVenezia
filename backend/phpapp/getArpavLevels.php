<?php

include('common/functions.php');
$callback = $_REQUEST['callback'];
$levels = getArpavLevels();
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $levels)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $levels));
}


die();