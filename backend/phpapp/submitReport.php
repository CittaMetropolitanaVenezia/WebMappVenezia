<?php
include('common/functions.php');


$file = $_FILES['file'];
$values = $_POST['values'];
$sentReport = sendReport($values,$file);
header('Content-Type: application/x-json');
echo json_encode(array('success' => $sentReport));



die();