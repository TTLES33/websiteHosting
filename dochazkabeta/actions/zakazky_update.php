<?php
$zak_id = $_POST['zak_id'];
$zakazka_nazev = $_POST['zakazka_nazev'];
$zakazka_osoba = $_POST['zakazka_osoba'];
$zakazka_zahajeni = $_POST['zakazka_zahajeni'];
$zakazka_ukonceni = $_POST['zakazka_ukonceni'];
$zakazka_stav = $_POST['zakazka_stav'];
$faktura = $_POST['faktura'];

$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
}

$sql = "UPDATE zakazky SET jmeno_zakazky='$zakazka_nazev', zodpovedna_osoba_zakazky='$zakazka_osoba', zahajeni_zakazky='$zakazka_zahajeni', ukonceni_zakazky='$zakazka_ukonceni', stav_zakazky='$zakazka_stav', faktura='$faktura' WHERE id_zakazky='$zak_id' ";

if ($conn->query($sql) === TRUE) {
  echo "<div class=\"good\"> Úspěšně vloženo</div>";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
}

$conn->close();

?>