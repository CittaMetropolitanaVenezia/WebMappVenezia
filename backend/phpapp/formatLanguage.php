<?php

include('common/functions.php');
$lang = $_GET['lang'];
$callback = $_REQUEST['callback'];
$languageData = loadLanguageData($lang);

if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $languageData)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $languageData));
}