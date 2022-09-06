<?php

include('common/functions.php');
$values = $_GET['values'];
$callback = $_REQUEST['callback'];
$sentReport = sendReport($values,null);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $sentReport)) . ');';	
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $poi));
}


die();