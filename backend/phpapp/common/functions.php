<?php


include('geophp/geophp.php');

function connectDb() {
	
	$setup = parse_ini_file('../../setup.ini',true);
	
	$dbConfig = $setup['database'];
	$dbi = pg_connect("host=".$dbConfig['host']." port=5432 dbname=".$dbConfig['database']." user=".$dbConfig['user']." password=".$dbConfig['password']);
	
	return $dbi;
	
}
function connectWebpaperDb() {
	
	$setup = parse_ini_file('../../webpapersetup.ini',true);
	
	$dbConfig = $setup['database'];
	$dbi = pg_connect("host=".$dbConfig['host']." port=5432 dbname=".$dbConfig['database']." user=".$dbConfig['user']." password=".$dbConfig['password']);
	
	return $dbi;
	
}


function getEcoLayers($day){
	
	if($day == 'today'){
		$date = date('d/m/Y');
	}else{
		$date = date("d/m/Y", strtotime('tomorrow'));
	}
	
	
	$dbi = connectWebpaperDb();
	

	
	$query = "SELECT codistat,testo FROM limtraf_ecologica WHERE date like '%".$date."%'";
	
	$results = pg_query($dbi,$query);
	
	if(pg_num_rows($results) == 0){
		return array();
	}
	$ecoLayers = array();
	while($row = pg_fetch_assoc($results)){
		array_push($ecoLayers,$row);	
	}
	
	return $ecoLayers;
	
	
}


function getLayersListData($topic) {
	
	$layers = parse_ini_file('../../configurazioni/'.$topic.'/layers.ini',true);
	
	$groups = [];
	//ciclo i layer per ricavarmi un array con i nomi dei gruppi
	foreach($layers as $layer => $conf){
		if(array_key_exists('openedGroup',$conf)){
			$opened = ($conf['openedGroup'] != "" ? true : false);
			array_push($groups,array(
				"name" => $conf['group'], 
				"opened" => $opened
				));
		}
	}
	//creo la root
	$root = array(
				   'text' => 'root',
				   'visible' => true,
				   'expanded' => true,
				   'expandable' => true,
				   'children' => array());
	//aggiungo i gruppi alla root
	foreach($groups as $key => $value){
		array_push($root['children'],array(
			'text' => $value['name'],
			//'leaf' => false,
			//'iconCls' => 'x-fa fa-list',
			'expanded' => $value['opened'],
			'checked' => false,
			'expandable' => true,
			'children' => array())); 
	}
	//aggiungo i layer ai vari gruppi
	foreach($layers as $layer => $conf){
		foreach($root['children'] as $index => $children){
			if($children['text'] === $conf['group']){
				array_push($root['children'][$index]['children'],array(
					'text' => $layers[$layer]['label'],
					'tipo' => $layers[$layer]['tipo'],
					'leaf' => true,
					'layer' => array_key_exists('layer',$layers[$layer]) ? $layers[$layer]['layer'] : null ,
					'noCluster' => array_key_exists('noCluster',$layers[$layer]) ? $layers[$layer]['noCluster'] : null ,
					'url' => array_key_exists('url',$layers[$layer]) ? $layers[$layer]['url'] : null ,
					'color' => array_key_exists('color',$layers[$layer]) ? $layers[$layer]['color'] : null ,
					'weight'=> array_key_exists('weight',$layers[$layer]) ? $layers[$layer]['weight'] : null ,
					'opacity'=> array_key_exists('opacity',$layers[$layer]) ? $layers[$layer]['opacity'] : null ,
					'fillColor'=> array_key_exists('fillColor',$layers[$layer]) ? $layers[$layer]['fillColor'] : null ,
					'fillOpacity' => array_key_exists('fillOpacity',$layers[$layer]) ? $layers[$layer]['fillOpacity'] : null ,
					'table' => array_key_exists('table',$layers[$layer]) ? $layers[$layer]['table'] : null ,
					'icon' => array_key_exists('icon',$layers[$layer]) ? $layers[$layer]['icon'] : null ,
					'tooltipfields' => array_key_exists('tooltipfields',$layers[$layer]) ? $layers[$layer]['tooltipfields'] : null ,
					'schema' => array_key_exists('schema',$layers[$layer]) ? $layers[$layer]['schema'] : null ,
					'checked' => array_key_exists('checked',$layers[$layer]) ? $layers[$layer]['checked'] : false));
			}
		}
	} 	
	return $root;
}


function getSubarea($topic) {
	
	$layers = parse_ini_file('../../configurazioni/'.$topic.'/layers.ini',true);
	//ciclo i layer per ricavarmi un array con i nomi dei gruppi
	$subAreas = [];
	foreach($layers as $layer => $conf){
		if($layer != 'layers.v_cor_comuni'){
			array_push($subAreas,$conf['label']);
		}
	}
	return $subAreas;
}



function getGeoJson($schema = null,$tableName= null,$filter= null,$webmapDb= null,$cache = null) {
		
	
	if($cache){
		
		$GEOJSON = json_decode(file_get_contents($cache),true);
		return $GEOJSON;
	}

	$GEOJSON = array(
		'type' => 'FeatureCollection',
		'features' => array()
	);
		$dbi = connectDb();
	
	
	
	
	
	if ($tableName) {
		
		//controllo se esiste la tabella
		$cond = "";
		
		if ($filter != "") {
			$token = explode("!",$filter);
			$cond = " AND ".$token[0]." = '".$token[1]."'";
		}
		
		$sqlCheck = "SELECT * FROM geometry_columns WHERE f_table_schema = '".$schema."' AND f_table_name = '".$tableName."'";
		
		$resultCheck = pg_query($dbi, $sqlCheck);
		
		$numRows = pg_num_rows($resultCheck);
		
		//tabella non presente
		if ($numRows == 0) {
			return $GEOJSON;
		}
		
		$sql = "SELECT *, ST_AsText(ST_Transform(geom, 4326)) AS wkt FROM ".$schema.".".$tableName." WHERE geom IS NOT NULL ".$cond;
		
		
		$result = pg_query($dbi, $sql);
		
		
		while ($row = pg_fetch_assoc($result)) {
			//echo $row['wkt'].'<br>';
			
			// remove bynary geom
			unset($row['geom']);
			// create geoPHO object
			$geom = geophp::load($row['wkt'], 'wkt');
			// remove ewkb geom
			unset($row['wkt']);
			// get geojson (encoded)
			$geometry = (array)json_decode($geom->out('geojson'));
			$feature = array(
				'type' => 'Feature',
				'properties' => $row,
				'geometry' => $geometry
			);
			// add features
			$GEOJSON['features'][] = $feature;
			
		}
	}
	if($webmapDb){
		$dbi2 = connectWebpaperDb();
		$sqlCheck = "SELECT * FROM public.v_limtraf_livallerta";	
		$resultCheck = pg_query($dbi2, $sqlCheck);
		if(pg_num_rows($resultCheck) == 0){
			return array();
		}
		$alertLevel = array();
		while($row = pg_fetch_assoc($resultCheck)){
			array_push($alertLevel,$row);	
		}
		foreach($GEOJSON['features'] as  $key => $feature){
			foreach($alertLevel as $level){		
				if($feature['properties']['codistat'] == $level ['codistat']){	
					$feature['properties']['livallerta'] = $level['livallerta'];
					$GEOJSON['features'][$key] = $feature;
				}
			}
		}
	}
	
	return $GEOJSON;
}
function getRoads($day,$timezone,$vehicle,$vehicleFuel,$vehicleClass,$lang){
		$dbi = connectWebpaperDb();
		$tableName = "v_limtraf_casistiche";
		if($day == 'tomorrow'){
			$tableName.='_domani';
		}

		if($lang == 'eng'){
			$tableName.='_eng';
		}
		
		$sqlCheck = "SELECT DISTINCT codistat,nome_comune,limitazione FROM ".$tableName." WHERE veicolo ='".$vehicle."' AND  alimentazione ='".$vehicleFuel."' AND  classe ='".$vehicleClass."' AND  fasciaoraria ='".$timezone."'";
		$result = @pg_query($dbi, $sqlCheck);
		if($result){
			$limitationAreas = array();
			$istatArray = array();
			foreach(pg_fetch_all($result) as $limit){
					array_push($limitationAreas,$limit);
			}
			return $limitationAreas;	
		}else{
			return false;
		}	
		
}

function loadLanguageData($language){
	$languageText = parse_ini_file('config/'.$language.'.ini',true);
	return $languageText;
}

function geocodeAddress($addressText) {
	set_time_limit(0);
	//here.com aucomplete
	$dbi = connectWebpaperDb();
	$appId = "HEREAPPID";
	$appCode = "HEREAPPCODE";

	$baseUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?&app_id=".$appId."&app_code=".$appCode;

	$baseUrlGeocode = "https://geocoder.api.here.com/6.2/geocode.json?&app_id=".$appId."&app_code=".$appCode;


	$url = $baseUrl."&maxresults=10&country=ITA&mapview=10.538635,44.863656;14.243774,46.128460&language=it&query=".$addressText;

	$urlForGeocodeURLEncoded = str_replace(' ', '%20', $url);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_VERBOSE, true);
	curl_setopt($ch, CURLOPT_URL, $urlForGeocodeURLEncoded);
	curl_setopt($ch, CURLOPT_HTTPGET, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE);
	
	$response = curl_exec ($ch);
	/*if($response === FALSE){
		echo curl_error($ch);
		die(); 
	}*/
	$responseObj = json_decode($response);
	//memorizzo i risultati se prensenti
	$storeResults = array();
	$finalAddresses = array();
	//ok con la risposta
	if (isset($responseObj->suggestions) AND $responseObj->suggestions AND count($responseObj->suggestions) >0){

		foreach ($responseObj->suggestions as $result) {

			//per ogni risultato memorizzo la street e la location id e recupero le coordinates
			$addressFind = $result->label;

			$locationId = $result->locationId;

			$geoCodeUrl = $baseUrlGeocode."&&mapview=10.538635,44.863656;14.243774,46.128460&country=ITA&language=it&locationid=".$locationId;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_VERBOSE, true);
			curl_setopt($ch, CURLOPT_URL, $geoCodeUrl);
			curl_setopt($ch, CURLOPT_HTTPGET, 1);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE);

			$responseLocation = curl_exec ($ch);

			$responseObjLocation = json_decode($responseLocation);
			if (isset($responseObjLocation->Response) AND isset($responseObjLocation->Response->View) AND isset($responseObjLocation->Response->View[0]->Result[0])
			AND isset($responseObjLocation->Response->View[0]->Result[0]->Location) AND isset($responseObjLocation->Response->View[0]->Result[0]->Location->DisplayPosition)
			) {
				$latLng = $responseObjLocation->Response->View[0]->Result[0]->Location->DisplayPosition;
				$find = true;
				if ($find) {
					$latLng = json_encode($latLng);

					$storeResults[] = array(
						"address" => $addressFind,
						"latLng" => $latLng
					);

				}
			}
		}
	}
	if(count($storeResults)>0){
		
		$truncateQuery = "TRUNCATE address_filter_tmp";
		$truncateCheck = pg_query($dbi, $truncateQuery);
		foreach($storeResults as $poi){
			$poiLatLng = json_decode($poi['latLng'],true);
			$insertQuery = "INSERT INTO address_filter_tmp (geom,address) 
			VALUES (ST_Transform(ST_SetSRID(ST_Point(".$poiLatLng['Longitude'].",".$poiLatLng['Latitude']."),4326),3003),'".str_replace("'","''",$poi['address'])."')";
			$insertCheck = pg_query($dbi,$insertQuery);
		}
		$containsQuery = 'SELECT ST_Contains(lim.geom, poi.geom) as contained,address FROM address_filter_tmp poi,confini_cmve lim';
		$containsCheck = pg_query($dbi,$containsQuery);
		$containsResults = pg_fetch_all($containsCheck);
		foreach($containsResults as $containResult){
			foreach($storeResults as $storeResult){
				if($containResult['contained'] == 't' && $containResult['address'] == $storeResult['address']){
					$finalAddresses[] = $storeResult;
				}
			}
		}
	}
	return $finalAddresses;
}

function geocodeAddressFromLocation($lat,$lng,$language){
	$app_id = "HEREAPPID";
	$app_code = "HEREAPPCODE";
	if($language == 'it'){
		$lang = $language;
	}else{
		$lang = 'en-US';
	}
	$url = 'http://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id='.$app_id.'&app_code='.$app_code.'&language='.$lang.'&mode=retrieveAddresses&maxresults=1&prox='.$lat.','.$lng.',200';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_VERBOSE, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPGET, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE);
	$response = curl_exec ($ch);
	/*if($response === FALSE){
		echo curl_error($ch);
		die();
	}*/
	$responseObj = json_decode($response,true);
	return $responseObj;
}

function getRoute($firstWaypoint,$lastWaypoint,$language,$waypoints,$lastwpoint){
	$app_id = "HEREAPPID";
	$app_code = "HEREAPPCODE";
	if($language == 'it'){
		$lang = $language;
	}else{
		$lang = 'en-US';
	}
	$url = 'https://route.api.here.com/routing/7.2/calculateroute.json?app_id='.$app_id.'&app_code='.$app_code.'&waypoint0='.$firstWaypoint.$waypoints.'&waypoint'.$lastwpoint.'='.$lastWaypoint.'&mode=fastest;bicycle&language='.$lang.'&routeAttributes=waypoints,summary,legs,shape'; 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_VERBOSE, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPGET, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE);
	$response = curl_exec ($ch);
	$responseObj = json_decode($response,true);
	return $responseObj;
}

function getPoiFromDesc($poiDesc,$area_id){
	$dbi = connectWebpaperDb();
	$descs = explode(' ',$poiDesc);
	$sql = '';
	$twoCharWords = parse_ini_file('config/words.ini')['words'];
	$twoCharWords = explode(';',$twoCharWords);
	foreach($descs as $poi){
		foreach($twoCharWords as $word){
			if(strtolower($poi) == $word){
				if($sql == ''){
					$sql = "descr_2 ILIKE '%".$poi."%'";
				}else{
					$sql.= " AND descr_2 ILIKE '%".$poi."%'";
				}
			}
		}
		if($poi != '' && strlen($poi) > 2){
			if($sql == ''){
				$sql = "descr_2 ILIKE '%".$poi."%'";
			}else{
				$sql.= " AND descr_2 ILIKE '%".$poi."%'";
			}
		}
	}
	if($sql == ''){
		return array();
	}
	if($area_id){
		$sqlCheck = "SELECT DISTINCT id,id_area,layer_name,object_id,descr_1,descr_2,ST_AsText((ST_Dump(ST_Transform(geom, 4326))).geom) AS wkt FROM v_search_table WHERE ".$sql." AND geom IS NOT NULL AND descr_1 IS NOT NULL AND id_area =".$area_id." LIMIT 10";	
	}else{
		$sqlCheck = "SELECT DISTINCT id,id_area,layer_name,object_id,descr_1,descr_2,ST_AsText((ST_Dump(ST_Transform(geom, 4326))).geom) AS wkt FROM v_search_table WHERE ".$sql." AND geom IS NOT NULL AND descr_1 IS NOT NULL LIMIT 10";	
	}
	$resultCheck = pg_query($dbi, $sqlCheck);
	
	if(pg_num_rows($resultCheck) == 0){
		return array();
	}
	$pois = array();
	while($row = pg_fetch_assoc($resultCheck)){
		array_push($pois,$row);	
	}
	return $pois;
}
function getVehicles($lang){
	$dbi  = connectWebpaperDb();
	
	
	if($lang == 'it'){
		$sqlCheck = "SELECT DISTINCT  veicolo FROM v_limtraf_casistiche ORDER BY veicolo ASC";	
	}else{
		$sqlCheck = "SELECT DISTINCT  veicolo FROM v_limtraf_casistiche_eng ORDER BY veicolo ASC";	
	}
	
	
		$resultCheck = pg_query($dbi, $sqlCheck);
	if(pg_num_rows($resultCheck) == 0){
		return array();
	}
	$vehicles = array();
	while($row = pg_fetch_assoc($resultCheck)){
		array_push($vehicles,$row);	
	}
	return $vehicles;
}
function getVehicleFuelTypes($vehicle,$lang){
	$dbi = connectWebpaperDb();
	
	if($lang == 'it'){
		$sqlCheck = "SELECT DISTINCT  alimentazione FROM v_limtraf_casistiche WHERE veicolo = '".$vehicle."' ORDER BY alimentazione ASC";	
	}else{
		$sqlCheck = "SELECT DISTINCT  alimentazione FROM v_limtraf_casistiche_eng WHERE veicolo = '".$vehicle."' ORDER BY alimentazione ASC";	
	}
		
	$resultCheck = pg_query($dbi, $sqlCheck);
	if(pg_num_rows($resultCheck) == 0){
		return array();
	}
	$vehicleFuelTypes = array();
	while($row = pg_fetch_assoc($resultCheck)){
		array_push($vehicleFuelTypes,$row);	
	}
	return $vehicleFuelTypes;
}


function getVehicleClasses($vehicle,$vehicleFuelType,$lang){
	$dbi  = connectWebpaperDb();
	
	if($lang == 'it'){
		$sqlCheck = "SELECT DISTINCT  classe FROM v_limtraf_casistiche WHERE veicolo = '".$vehicle."' AND alimentazione = '".$vehicleFuelType."' ORDER BY classe ASC";	
	}else{
		$sqlCheck = "SELECT DISTINCT  classe FROM v_limtraf_casistiche_eng WHERE veicolo = '".$vehicle."' AND alimentazione = '".$vehicleFuelType."' ORDER BY classe ASC";	
	}	
	$resultCheck = pg_query($dbi, $sqlCheck);
	if(pg_num_rows($resultCheck) == 0){
		return array();
	}
	$vehicleClasses = array();
	while($row = pg_fetch_assoc($resultCheck)){
		array_push($vehicleClasses,$row);	
	}
	return $vehicleClasses;
}


function getClickedArea($coords){
	$dbi = connectDb();
	$query = "SELECT codistat FROM public.comuni where ST_CONTAINS(geom,ST_Transform(ST_SetSRID(ST_Point(".$coords."),4326),3003))";
	$result = pg_query($dbi,$query);
	$istat = pg_fetch_all($result)[0]['codistat'];
	return $istat;
}
function getArpavLevels(){
	$dbi = connectWebpaperDb();
	$query = "SELECT nome_comune,codistat,livallerta,livallerta_domani FROM v_limtraf_livallerta";
	$result = pg_query($dbi,$query);
	$levels = pg_fetch_all($result);
	return $levels;
}
function retrieveDeroghe($codistat,$level){
	$dbi = connectWebpaperDb();
	if($level == 0 || $level == 1 || $level == 2){
		$query = "SELECT testo FROM v_limtraf_deroghe WHERE codistat = ".$codistat." AND livelloallerta = '".$level."'";
		$result = pg_query($dbi,$query);
		$text = pg_fetch_all($result)[0]['testo'];
	}else{
		$query = "SELECT messaggio FROM v_codici_livelloallerta WHERE  livelloallerta = '".$level."'";
		$result = pg_query($dbi,$query);
		$text = pg_fetch_all($result)[0]['messaggio'];
	}
	
	return $text;
}

function getAllertLvls($day){
	$dbi = connectWebpaperDb();
		$livField = 'livallerta';
	if($day == 'tomorrow'){
		$livField.= '_domani';
	}
	$query = "SELECT DISTINCT ".$livField." FROM v_limtraf_livallerta";
	$result = pg_query($dbi,$query);
	$lvls = pg_fetch_all($result);
	
	if($lvls AND count($lvls) == 1){
		$msgQuery = "SELECT messaggio FROM v_codici_livelloallerta WHERE  livelloallerta = '".$lvls[0][$livField]."'";
		$msgResult = pg_query($dbi,$msgQuery);
		$message = pg_fetch_all($msgResult)[0]['messaggio'];
		if(!$message OR $message == ''){
			$message = 'Il suo veicolo può circolare liberamente!';
		}	
	}else {
		$message = 'Il suo veicolo può circolare liberamente!';
		foreach($lvls as $lvl){
			if($lvl[$livField] == 0 OR $lvl[$livField] == 1 OR $lvl[$livField] != 2){
				$message = 'Il suo veicolo è soggetto a restrizioni!';
			}  
			if($lvl[$livField] == 99){
				$msgQuery = "SELECT messaggio FROM v_codici_livelloallerta WHERE  livelloallerta = '99'";
				$msgResult = pg_query($dbi,$msgQuery);
				$message = pg_fetch_all($msgResult)[0]['messaggio'];
				return $message;
			}
		}
	}
	return $message;
}
function sendReport($valuesRaw,$file){
	$dbi = connectWebpaperDb();
	$values = json_decode($valuesRaw,true);
	$area = $values['area_combo'];
	$subarea = $values['subarea_combo'];
	$desc = $values['submission_desc'];
	$report_x = $values['report_x'];
	$report_y = $values['report_y'];
	//$current_x = $values['current_x'];
	//$current_y = $values['current_y'];
	$current_x = $values['report_x'];
	$current_y = $values['report_y'];
	$email = $values['submission_email'];
	$todayDate = date('Y-m-d H:i:s');
	if($file != null){
		$typeTokens = explode('/',$file['type']);
		$type = array_pop($typeTokens);
		$query = "SELECT MAX(id) as id FROM reports";
		$result = pg_query($dbi,$query);
		$id = pg_fetch_all($result)[0]['id'];
		$target_path = "../../reports/";
		$target_path = $target_path . basename($id.".".$type);
		$res = move_uploaded_file($file['tmp_name'], $target_path);
	}else{
		$id = 'empty';
	}
	if($current_x == ''){
		$current_x = 'null';
		$current_y = 'null';
	}
	$insertQuery = "INSERT INTO reports (email,area,subarea,text,longitude,latitude,photo_name,timestamp,userlongitude,userlatitude)
					VALUES  ('".$email."','".$area."','".$subarea."','".$desc."',".$report_x.",".$report_y.",'".$id."','".$todayDate."',".$current_x.",".$current_y.")";
	$result = pg_query($insertQuery);
	if(pg_affected_rows($result) == 1){
		return true;
	}else{
		return false;
	}
}

function registerDevice($device_key,$platform,$language,$enabled,$timestamp){

	$db_conn = connectWebpaperDb();

	// prepare response
	$success = false;
	
	

	// check if device_key already exist
	$query = "SELECT id FROM devices_new WHERE device_key='" . $device_key . "'";
	$result = pg_query($db_conn, $query);
	$rows = pg_num_rows($result);
	if ($rows > 0) {
		$line = pg_fetch_array($result, null, PGSQL_ASSOC);
		$row_id = $line['id'];

		// update with this $row_id
		$query = "UPDATE devices_new SET language = '" . $language . "', enabled = " . $enabled . ", timestamp = '" . $timestamp . "' WHERE device_key = '" . $device_key . "'";
		// excute query
		$result = pg_query($db_conn, $query);
		if ($result) {
			$success = true;
		}

	} else {
		$query = "INSERT INTO devices_new (device_key, platform, language, enabled, timestamp)
		VALUES ('" . $device_key . "','" . $platform . "','" . $language . "'," . $enabled . ",'" . $timestamp . "')";

		// excute query
		$result = pg_query($db_conn, $query);
		if ($result) {
			$success = true;
		}
	}

	return $success;
}


function sendPushNotification($title,$message_it,$message_en){
	
	$db_conn = connectWebpaperDb();

	$ios_devices_it = array();
	$ios_devices_en = array();
	$android_devices_it = array();
	$android_devices_en = array();
	// make query
																						 
	$query = "SELECT device_key, platform, language FROM devices_new ";
	
	$result = pg_query($db_conn, $query);
	$rows = pg_num_rows($result);
	
	if ($rows > 0) {
		// prepare devices array
		while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
	
			if ($line['platform'] == "android") {
				if ($line['language'] == "it") {
					$android_devices_it[] = $line['device_key'];
				} else {
					$android_devices_en[] = $line['device_key'];
				}
			} else if ($line['platform'] == "ios") {
				if ($line['language'] == "it") {
					$ios_devices_it[] = $line['device_key'];
				} else {
					$ios_devices_en[] = $line['device_key'];
				}
			}
		}
	}

	// send ios italian notifications
	//print_r($ios_devices_it);
	
	$payload = create_payload_json($message_it);
	if (sizeof($ios_devices_it)) {
		$result = send_ios_push($ios_devices_it, $payload);
		if ($result > 0) {
			//echo "Success send iOS italian push!";
		} else {
			//echo "Push send error -> " . $result;
		}
	} else {
		echo "No iOS italian notification to send!";
	}

	// send ios english notifications
//	print_r($ios_devices_en);
	$payload = create_payload_json($message_en);
	if (sizeof($ios_devices_en)) {
		$result = send_ios_push($ios_devices_en, $payload);
		if ($result > 0) {
		//	echo "Success send iOS english push!";
		} else {
			//echo "Push send error -> " . $result;
		}
	} else {
		echo "No iOS english notification to send!";
	}

	// send android italian notifications
//	print_r($android_devices_it);
	if (sizeof($android_devices_it)) {
		$result = send_android_push($android_devices_it, $message_it,$title);
		if ($result > 0) {
			echo "Success send android italian push!";
		} else {
			echo "Push send error -> " . $result;
		}
	} else {
		echo "No android italian notification to send!";
	}
	
	// send android english notifications
//	print_r($android_devices_en);
	if (sizeof($android_devices_en)) {
		$result = send_android_push($android_devices_en, $message_en,$title);
		if ($result > 0) {
			echo "Success send android english push!";
		} else {
			echo "Push send error -> " . $result;
		}
	} else {
		echo "No android english notification to send!";
	}
}


//Create json file to send to Apple/Google Servers with notification request and body
function create_payload_json($message)
{
    //Badge icon to show at users ios app icon after receiving notification
    $badge = "0";
    $sound = 'default';

    $payload = array();
    $payload['aps'] = array('alert' => $message, 'badge' => intval($badge), 'sound' => $sound);
    return json_encode($payload);
}

function send_android_push($devices, $message,$title)
{
	//Default result
	$result = -1;
	// API access key from Google FCM App Console
	define('API_ACCESS_KEY', 'LATUAAPIACCESSKEY');


	$registrationIDs = $devices;

	// prepare message
	$fcmMsg = array(
		'body' => $message,
		'title' => $title,
		'sound' => "default",
		'color' => "#E33921",
		'image' => "notification",
		'icon' => "notification",
	);

	$fcmFields = array(
		'registration_ids' => $registrationIDs,
		'priority' => 'high',
		'notification' => $fcmMsg,
	);

	$headers = array(
		'Authorization: key=' . API_ACCESS_KEY,
		'Content-Type: application/json',
	);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmFields));
	$result = curl_exec($ch);
	curl_close($ch);
	// echo $result . "\n\n";

	return $result;
}







function send_ios_push($devices, $payload_msg)
{	
	$result = 0;
	$apple_cert =  __DIR__ . '/pem_push/aps_2022.pem';
	$pushkey = '-----BEGIN PRIVATE KEY-----
LATUACHIAVEIOSPUSHNOTIFICATION
-----END PRIVATE KEY-----';
	$key_id = 'APPLE KEY ID';
	$team_id = 'APPLE TEAM ID';
	$token =  apns_jwt_token($team_id,$key_id,$pushkey);
	$http2_server = 'https://api.push.apple.com'; // or 'api.development.push.apple.com' if development
	$app_bundle_id = 'APPLE APP BUNDLE ID';
	//error_reporting(E_ALL);
	$http2ch = curl_init();
	curl_setopt($http2ch, CURLOPT_HTTP_VERSION, 3);
	
	foreach($devices as $deviceToken){	
		// send push
		$message = $payload_msg;

		
		
		
		$status = sendHTTP2Push($http2ch, $http2_server, $apple_cert, $app_bundle_id, $message, $deviceToken,$token);
		echo "Response from apple -> {$status}\n";

		// close connection
		
		
	} 
	curl_close($http2ch); 
	return $result;
}

function base64url_encode($binary_data) { return strtr(rtrim(base64_encode($binary_data), '='), '+/', '-_'); }

function apns_jwt_token($team_id, $key_id, $private_key_pem_str)
{
    if (! function_exists('openssl_get_md_methods') || ! in_array('sha256', openssl_get_md_methods())) throw new Exception('Requires openssl with sha256 support');

    $private_key = openssl_pkey_get_private($private_key_pem_str);
	
    if (! $private_key) throw new Exception('Cannot decode private key');

    $msg = base64url_encode(json_encode([ 'alg' => 'ES256', 'kid' => $key_id ])) . '.' . base64url_encode(json_encode([ 'iss' => $team_id, 'iat' => time() ]));
    openssl_sign($msg, $der, $private_key, 'sha256');

    // DER unpacking from https://github.com/firebase/php-jwt
    $components = [];
    $pos = 0;
    $size = strlen($der);
    while ($pos < $size) {
        $constructed = (ord($der[$pos]) >> 5) & 0x01;
        $type = ord($der[$pos++]) & 0x1f;
        $len = ord($der[$pos++]);
        if ($len & 0x80) {
            $n = $len & 0x1f;
            $len = 0;
            while ($n-- && $pos < $size) $len = ($len << 8) | ord($der[$pos++]);
        }

        if ($type == 0x03) {
            $pos++;
            $components[] = substr($der, $pos, $len - 1);
            $pos += $len - 1;
        } else if (! $constructed) {
            $components[] = substr($der, $pos, $len);
            $pos += $len;
        }
    }
    foreach ($components as &$c) $c = str_pad(ltrim($c, "\x00"), 32, "\x00", STR_PAD_LEFT);

    return $msg . '.' . base64url_encode(implode('', $components));
}


  function sendHTTP2Push($http2ch, $http2_server, $apple_cert,   $app_bundle_id, $message, $token,$apnsToken) {
    //////////////////////////////////////////////
    // @param $http2ch          the curl connection
    // @param $http2_server     the Apple server url
    // @param $apple_cert       the path to the certificate
    // @param $app_bundle_id    the app bundle id
    // @param $message          the payload to send (JSON)
    // @param $token            the token of the device
    // @return mixed            the status code
    ///////////////////////////////////////////////
	//$token = '29b3017dcc6d44fbec923b39a867f38245f2cf37284f7380ceba1179b47562e8';
    // url (endpoint)
	
    $url = "{$http2_server}/3/device/{$token}";
	
    // certifi	cate
    $cert = realpath($apple_cert);
	
    // headers
    $headers = array(
        "apns-topic: {$app_bundle_id}",
        "User-Agent: WebmappVenezia",
		"Authorization: bearer {$apnsToken}"
    );
	
	/*$headers = array(
        "apns-topic: {$app_bundle_id}",
        "User-Agent: WebmappVenezia"
    );*/
	
	//var_dump($url);
	//die();
    // other curl options
    curl_setopt_array($http2ch, array(
        CURLOPT_URL => $url,
        CURLOPT_PORT => 443,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POST => TRUE,
        CURLOPT_POSTFIELDS => $message,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSLCERT => $cert,
        CURLOPT_HEADER => 1
    ));

    // go...
    $result = curl_exec($http2ch);
	
    if ($result === FALSE) {
      throw new Exception("Curl failed: " .  curl_error($http2ch));
    }
	//var_dump($result);
	//die();
    // get response
    $status = curl_getinfo($http2ch, CURLINFO_HTTP_CODE);

    return $status;
    }

function checkDailyNotifications(){
	
	$db_conn = connectWebpaperDb();
	$query = 'SELECT * FROM messages WHERE processed = false';
	$result = pg_query($db_conn, $query);
	$rows = pg_num_rows($result);

	if ($rows > 0) {
		$today = date('Y-m-d');

		// prepare devices array
		while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			if($line['send_date'] == $today){
				sendPushNotification($line['name'],$line['value_it'],$line['value_en']);
				$updateQuery = "UPDATE messages SET processed = true, sent_date = '".$today."' WHERE id = ".$line['id'];
				$updateResult = pg_query($db_conn, $query);
			}
		}
	}
}


