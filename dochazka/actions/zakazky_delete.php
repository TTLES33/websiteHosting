<?php
$zak_id = $_POST['zak_id'];
$databasetable = $_POST['databasetable'];


$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
  $status = "error";
}

$sql = "DELETE FROM zakazky WHERE id_zakazky=$zak_id AND zakazkytable='$databasetable'";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně Smazáno</div>";
  $status = "success";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
  $status = "error";
}

setcookie("ajax_zakazky_delete", $status, time() + (64000 * 5), "/");
$conn->close();

?>