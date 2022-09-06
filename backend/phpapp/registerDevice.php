<?php
// include db configuration
include('common/functions.php');

$callback = $_REQUEST['callback'];

$device_key = $_GET['device_key'];
$platform = $_GET['platform'];
$language = $_GET['language'];
$enabled = $_GET['enabled'];
$timestamp = date("Y-m-d H:i:s");

//$handle = fopen('device_keys.txt','w');
	
//fwrite($handle,$device_key);
//file_put_contents('/tmp/registerDevice5.txt',$device_key.'|'.$platform.'|'.$language.'|'.$enabled.'|'.$timestamp.'\n',FILE_APPEND);

$success = registerDevice($device_key,$platform,$language,$enabled,$timestamp);

if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('success' => $success)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('success' => $success));
}


