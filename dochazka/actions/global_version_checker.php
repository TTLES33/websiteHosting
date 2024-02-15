<?php
$jsonversion = fopen("../version.json", "r");
echo fread($jsonversion,filesize("../version.json"));
fclose($jsonversion);
?>