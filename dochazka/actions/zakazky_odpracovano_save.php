<?php
$nazodpracovanozakazkaev = $_POST['odpracovanozakazka'];
$outputJSON = $_POST['outputJSON'];
$databasetable = $_POST['databasetable'];
$status = array();

$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die();
  array_push($status, "error");
  array_push($status, $conn->connect_error);
}else{
    array_push($status, "good");

}

$sql = "UPDATE zakazky SET odpracovanoJSON='$outputJSON' WHERE id_zakazky=$nazodpracovanozakazkaev";

if ($conn->query($sql) === TRUE) {
 array_push($status, "good");
} else {
    array_push($status, "error");
    array_push($status, $conn->error);
  
}

echo json_encode($status, JSON_UNESCAPED_SLASHES);
$conn->close();

?>