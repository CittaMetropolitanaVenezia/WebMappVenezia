<?php

include('common/functions.php');
$codistat = $_GET['codistat'];
$level = $_GET['level'];
$callback = $_REQUEST['callback'];
$deroghe = retrieveDeroghe($codistat,$level);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $deroghe)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $deroghe));
}


die();