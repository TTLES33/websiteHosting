<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$casod = $_POST['casod'];
$casdo = $_POST['casdo'];
$cas = $_POST['cas_minutes'];
$datum = $_POST['datum'];
$searchuzivatel = $_POST['searchuzivatel'];
$sessionsinsert = $_POST['sessionsinsert'];



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}else{ 


    $sql = "UPDATE cas SET cas_od='$casod', cas_do='$casdo', cas='$cas' WHERE datum='$datum' AND jmeno_id='$searchuzivatel'";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }
echo "--split--";

$sql = "DELETE FROM sessions WHERE datum='$datum' AND uzivatel='$searchuzivatel'";

    if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
    } else {
    echo "Error deleting record: " . $conn->error;
    }

    echo "--split--";
$sql = "INSERT INTO sessions (zakazka, cas, uzivatel,datum) VALUES $sessionsinsert;";

    if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();




?> 