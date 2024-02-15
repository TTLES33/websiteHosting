<?php
$uzi_id = $_POST['uzi_id'];


$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
  $status = "error";
}

$sql = "DELETE FROM uzivatele WHERE id_uzivatele='$uzi_id'";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně Smazáno</div>";
  $status = "success";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
  $status = "error";
}

setcookie("ajax_uzivatele_delete", $status, time() + (64000 * 5), "/");
$conn->close();

?>