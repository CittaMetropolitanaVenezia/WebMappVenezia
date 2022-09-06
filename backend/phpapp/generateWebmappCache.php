<?php 


ini_set('memory_limit', '-1');

include('common/functions.php');


$startLogString = date('d-m-Y H:i:s').' INIZIO CREAZIONE CACHE WEBMAPP VENEZIA
'; 
file_put_contents('/var/www/html/appvenezia/phpapp/cache/log.txt',$startLogString,FILE_APPEND);

$topics = ['amicibici','bikefriends','health','life','mobilita','mobility','salute','security','sicurezza','societa','tourism','traffic','traffico','turismo'];

$legends = [];


$geojson_comuni = getGeoJson('public','comuni_simplify');
file_put_contents('/var/www/html/appvenezia/phpapp/cache/comuni.json',json_encode($geojson_comuni));


$geojson_comuni2 = getGeoJson('qu_cmve','v_cor_comuni_centroide');
file_put_contents('/var/www/html/appvenezia/phpapp/cache/v_cor_comuni_centroide.json',json_encode($geojson_comuni2));

foreach($topics as $topic){
	
	
	$layers = parse_ini_file('/var/www/html/appvenezia/configurazioni/'.$topic.'/layers.ini',true);
	
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
				
				if(isset($layers[$layer]['nocache']) && $layers[$layer]['nocache'] == 1){
					array_push($root['children'][$index]['children'],array(
					'text' => $layers[$layer]['label'],
					'tipo' => $layers[$layer]['tipo'],
					'leaf' => true,
					'cls' => 'noSpacing',
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
					'iconCls' => null,
					'tooltipfields' => array_key_exists('tooltipfields',$layers[$layer]) ? $layers[$layer]['tooltipfields'] : null ,
					'schema' => array_key_exists('schema',$layers[$layer]) ? $layers[$layer]['schema'] : null ,
					'hidden' => array_key_exists('hidden',$layers[$layer]) ? $layers[$layer]['hidden'] : null ,
					'childLayers' => array_key_exists('childLayers',$layers[$layer]) ? $layers[$layer]['childLayers'] : null ,
					'checked' => array_key_exists('checked',$layers[$layer]) ? $layers[$layer]['checked'] : false));
					
				}else if($layers[$layer]['tipo'] != 'wms'){
					
					
					$geoJson = getGeoJson($layers[$layer]['schema'],$layers[$layer]['table']);
					file_put_contents('/var/www/html/appvenezia/phpapp/cache/'.$layers[$layer]['table'].'.json',json_encode($geoJson));
					
					
					array_push($root['children'][$index]['children'],array(
					'text' => $layers[$layer]['label'],
					'tipo' => $layers[$layer]['tipo'],
					'leaf' => true,
					'iconCls' => null,
					'cls' => 'noSpacing',
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
					'geoJson' => '/var/www/html/appvenezia/phpapp/cache/'.$layers[$layer]['table'].'.json',
					'tooltipfields' => array_key_exists('tooltipfields',$layers[$layer]) ? $layers[$layer]['tooltipfields'] : null ,
					'schema' => array_key_exists('schema',$layers[$layer]) ? $layers[$layer]['schema'] : null ,
					'hidden' => array_key_exists('hidden',$layers[$layer]) ? $layers[$layer]['hidden'] : null ,
					'childLayers' => array_key_exists('childLayers',$layers[$layer]) ? $layers[$layer]['childLayers'] : null ,
					'checked' => array_key_exists('checked',$layers[$layer]) ? $layers[$layer]['checked'] : false));
				}else {
					array_push($root['children'][$index]['children'],array(
					'text' => $layers[$layer]['label'],
					'tipo' => $layers[$layer]['tipo'],
					'leaf' => true,
					'cls' => 'noSpacing',
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
					'hidden' => array_key_exists('hidden',$layers[$layer]) ? $layers[$layer]['hidden'] : null ,
					'childLayers' => array_key_exists('childLayers',$layers[$layer]) ? $layers[$layer]['childLayers'] : null ,
					'iconCls' => null,
					'checked' => array_key_exists('checked',$layers[$layer]) ? $layers[$layer]['checked'] : false));
				}
				
			}
		}
	} 	
	$legends[$topic] = $root;
}

file_put_contents('/var/www/html/appvenezia/phpapp/cache/legends.json',json_encode($legends));
$endLogString = date('d-m-Y H:i:s').' FINE CREAZIONE CACHE WEBMAPP VENEZIA
'; 
file_put_contents('/var/www/html/appvenezia/phpapp/cache/log.txt',$endLogString,FILE_APPEND);



?>