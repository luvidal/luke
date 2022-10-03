<?php

	$path = production() ? '/home/bitnami/credentials/' : '/Library/WebServer/Documents/';
	$cfg  = parse_ini_file($path.'database.ini');

	function production()
	{
		return isset($_SERVER['HTTPS']) ? true : false;
	}

	$pdo = new PDO('mysql:host='.$cfg['host'].'; dbname=eii; charset=utf8mb4', $cfg['usr'], $cfg['pwd'],
	[
  		PDO::ATTR_EMULATE_PREPARES   => true, // false means real prepared statements
  		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // errors are exeptions
  		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES	 => false, // show exceptions by prepare() method
		PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4'
	]);

	function insertinto($table, $assoc)
	{
		global $pdo;

		$cols = implode(', ', array_keys($assoc));
		$vals = implode(', ', array_map(function($x) { return "'$x'"; }, $assoc));

		$pdo->query("INSERT INTO $table ($cols) VALUES ($vals)"); // prepare this!
		$id = $pdo->lastInsertId();
		return $id;
	}

	function replaceinto($table, $assoc)
	{
		global $pdo;

		$cols = implode(', ', array_keys($assoc));
		$vals = implode(', ', array_map(function($x) { return "'$x'"; }, $assoc));

		$sql    = "SELECT k.column_name FROM information_schema.table_constraints t JOIN information_schema.key_column_usage k USING(constraint_name,table_schema,table_name) WHERE t.constraint_type='PRIMARY KEY' AND t.table_name='$table'";
		$index  = $pdo->query($sql)->fetchAll();
		$index  = array_values_recursive($index);		
		$nokeys = filter_not_array($assoc, $index);

		$update = '';
		foreach($nokeys as $key => $value)
			$update .= "$key='$value' "; //implode ' AND '?
		
		$sql = "INSERT INTO $table ($cols) VALUES ($vals) ON DUPLICATE KEY UPDATE $update";
		$pdo->query($sql); // prepare?
		$id = $pdo->lastInsertId();
		return $id;
	}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

	function array_values_recursive($arr)
	{
		$flat = [];

		foreach($arr as $value)
		{
			if (is_array($value))
			{
				$flat = array_merge($flat, array_values_recursive($value));

			} else {

			    $flat[] = $value;
			}
		}
		return $flat;
	}

	function filter_in_array($a, $b)
	{
		$keys = array_values($b);
		$c = [];
		foreach ($a as $key => $value)
		  if (in_array($key, $keys)) $c[$key] = $value;

		return $c;
	}

	function filter_not_array($a, $b)
	{
		$keys = array_values($b);
		$c = [];
		foreach ($a as $key => $value)
		  if (!in_array($key, $keys)) $c[$key] = $value;

		return $c;
	}

	//$arr = $pdo->query("SELECT * FROM sites WHERE id=$site LIMIT 1")->fetch();
?>