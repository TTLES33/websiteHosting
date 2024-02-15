<?php
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
  $status = "error";
}

$sql = "INSERT INTO uzivatele (titul, jmeno, prijmeni, titul_za, passwd, perms) VALUES ('$uzivatele_titul', '$uzivatele_jmeno', '$uzivatele_prijmeni', '$uzivatele_titul_za', '$uzivatele_heslo', '$uzivatele_perms')";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně Vloženo</div>";
  $status = "success";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
  $status = "error";
}

setcookie("ajax_uzivatele_insert", $status, time() + (64000 * 5), "/");
$conn->close();

?>