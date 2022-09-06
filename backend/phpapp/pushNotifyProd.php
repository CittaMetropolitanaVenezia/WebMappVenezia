<?php

// script based on:
// http://www.assafelovic.com/blog/php-mobile-pus-notifications

// NOTE
// iOS
// if error -> Warning: stream_socket_client(): unable to connect to ssl://gateway.sandbox.push.apple.com:2195 (Connection timed out)
// check the port 2195 using -> telnet gateway.push.apple.com 2195
// as described here -> https://stackoverflow.com/questions/19865598/unable-to-connect-to-ssl-gateway-sandbox-push-apple-com2195-connection-refus

include('common/functions.php');
$title = $_GET['titolo'];
$message_it = $_GET["it"];
$message_en = $_GET["en"];

sendPushNotification($title,$message_it,$message_en);

