<?php
include('common/functions.php');
$topic = $_GET['topic'];
$callback = $_REQUEST['callback'];
$subarea = getSubarea($topic);
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $subarea)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $subarea));
}