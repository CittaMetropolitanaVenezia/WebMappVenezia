<?php

ini_set('memory_limit', '-1');

include('common/functions.php');

if (isset($_GET['table']) AND $_GET['table'] AND $_GET['table'] != "") {
	
	$table = $_GET['table'];
}
else $table = false;


if (isset($_GET['schema']) AND $_GET['schema'] AND $_GET['schema'] != "") {
	
	$schema = $_GET['schema'];
}
else $schema = 'qu_cmve';

if (isset($_GET['filter']) AND $_GET['filter'] AND $_GET['filter'] != "") {
	
	$filter = $_GET['filter'];
}
else $filter = '';

if (isset($_GET['webmapDb']) AND $_GET['webmapDb'] AND $_GET['webmapDb'] != "") {
	
	$webmapDb = true;
}
else $webmapDb = false;



if (isset($_GET['cache']) AND $_GET['cache'] AND $_GET['cache'] != "") {
	
	$cache = $_GET['cache'];
}
else $cache = false;

$geoJson = getGeoJson($schema,$table,$filter,$webmapDb,$cache);


$callback = null;

if(isset($_REQUEST['callback'])){
	$callback = $_REQUEST['callback'];
}

if($callback){
	header('Content-Type: text/javascript');
	echo $callback . '(' . json_encode(array('data' => $geoJson)) . ');';
}else{
	header('Content-Type: application/x-json');
    echo json_encode(array('data' => $geoJson));
}

die();