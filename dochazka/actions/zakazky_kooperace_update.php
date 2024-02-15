<?php
$zak_id = $_POST['kooperacezakazka'];
$updatejson = $_POST['updateJSON'];
$databasetable = $_POST['databasetable'];




$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
}

$sql = "UPDATE zakazky SET kooperace='$updatejson' WHERE id_zakazky='$zak_id' ";

if ($conn->query($sql) === TRUE) {
    
  echo "success";
} else {
  echo " MySql Error: " . $conn->error ."";
}

$conn->close();

?>