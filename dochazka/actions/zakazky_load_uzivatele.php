<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$searchzakazka = $_POST['searchzakazka'];
$array;



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}else{ 

$sql = "SELECT uzivatele FROM zakazky WHERE id_zakazky = '$searchzakazka';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "success";
  while($row = $result->fetch_assoc()) {
  $array = $row['uzivatele'];
  }
} else {
  echo "0 results";
}
}
$conn->close();


echo "--split--";
echo $array;



?>