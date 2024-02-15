<?php
$uzi_id = $_POST['uzi_id'];
$uzivatele_titul = $_POST['uzivatele_titul'];
$uzivatele_jmeno = $_POST['uzivatele_jmeno'];
$uzivatele_prijmeni = $_POST['uzivatele_prijmeni'];
$uzivatele_titul_za = $_POST['uzivatele_titul_za'];
$uzivatele_heslo = $_POST['uzivatele_heslo'];
$uzivatele_perms = $_POST['uzivatele_perms'];


$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
}

$sql = "UPDATE uzivatele SET titul='$uzivatele_titul', jmeno='$uzivatele_jmeno', prijmeni='$uzivatele_prijmeni', titul_za='$uzivatele_titul_za', passwd='$uzivatele_heslo', perms='$uzivatele_perms' WHERE id_uzivatele='$uzi_id' ";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně upraveno</div>";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
}

$conn->close();

?>