<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$insertarray = $_POST['insertarray'];
$edit_uzivatele_id = $_POST['edit_uzivatele_id'];
$array;



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}else{ 


$sql = "UPDATE zakazky SET uzivatele='$insertarray' WHERE id_zakazky='$edit_uzivatele_id'";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "Error updating record: " . $conn->error;
}
}
$conn->close();






?>