<?php

include('common/functions.php');
$lang = $_GET['lang'];
$callback = $_REQUEST['callback'];
$languageData = loadLanguageData($lang);

$legends = file_get_contents('/var/www/html/appvenezia/phpapp/cache/legends.json');

$comuni = file_get_contents('/var/www/html/appvenezia/phpapp/cache/comuni.json');
if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('langData' => $languageData,'legends' => $legends, 'comuni' => $comuni)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $languageData));
}