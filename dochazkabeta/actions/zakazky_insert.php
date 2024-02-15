<?php
$nazev = $_POST['nazev'];
$uzivatel = $_POST['uzivatel'];
$zahajeni = $_POST['zahajeni'];
$ukonceni = $_POST['ukonceni'];
$stav = $_POST['stav'];
$faktura = $_POST['faktura'];
$insJSON = $_POST['insJSON'];

$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
  $status = "error";
}

$sql = "INSERT INTO zakazky (jmeno_zakazky, zodpovedna_osoba_zakazky, zahajeni_zakazky, ukonceni_zakazky, stav_zakazky, faktura, odpracovanoJSON) 
VALUES ('$nazev', '$uzivatel', '$zahajeni', '$ukonceni', '$stav', '$faktura', '$insJSON');";


if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně Vloženo</div>";
  $status = "success";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
  $status = "error";
}



 $sql = "INSERT INTO kooperace (id_kooperace_zakazky, 1_value, 2_value, 3_value, 4_value, 5_value, 6_value, 7_value, 8_value, 9_value, 10_value) VALUES ((SELECT MAX(id_zakazky) FROM zakazky),0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 );";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně Vloženo</div>";
  $status = "success";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
  $status = "error";
} 

setcookie("ajax_zakazky_insert", $status, time() + (64000 * 5), "/");
$conn->close();

?>