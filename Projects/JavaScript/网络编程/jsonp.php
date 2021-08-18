<?php
$name = $_GET["name"];
$age = $_GET["age"];
$arr = array("name"=>$name, "age"=>$age);
$data = json_encode($arr);

$cb = $_GET["cb"];
echo $cb."(".$data.");";