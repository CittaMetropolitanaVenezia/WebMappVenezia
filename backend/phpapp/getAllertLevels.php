<?php
include('common/functions.php');
$callback = $_REQUEST['callback'];
$allertLvls = getAllertLvls();
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $allertLvls)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $allertLvls));
}


die();