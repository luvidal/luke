<?php

	require_once 'secure.inc';
	require_once 'handy.inc';

	extract($_POST);

	$stmt = $pdo->prepare("SELECT email, name, origin, pic FROM users.users WHERE email=:email");
	$stmt->execute(['email' => $email]);
	$rows = $stmt->fetch();

	echo json_encode($rows);
?>