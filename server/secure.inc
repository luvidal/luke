<?php

	require_once 'handy.inc';
	require_once $path.'jwt.inc';

	$jwt = $_SERVER['HTTP_JWT'];
	$token  = jwt2token($jwt);
	$_POST['email'] = $token->email;
?>