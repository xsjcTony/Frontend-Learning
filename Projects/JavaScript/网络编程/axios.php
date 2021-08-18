<?php
//echo "it666";

//$teacher = $_GET["teacher"];
//$age = $_GET["age"];
//$arr = array("name"=>$teacher, "age"=>$age);
//$data = json_encode($arr);
//echo $data;

$rws_post = $GLOBALS["HTTP_RAW_POST_DATA"];
$mypost = json_decode($rws_post);
$teacher = (string)$mypost->teacher;
$age = (string)$mypost->age;
$arr = array("name"=>$teacher, "age"=>$age);
$data = json_encode($arr);
echo $data;