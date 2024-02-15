<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";
$date = $_POST["datum"];
$searchuzivatel = $_POST["searchuzivatel"];

$jsonhistoryzakazka = array(); 
$jsonhistorycas = array(); 


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}else{ 

$sql = "SELECT * FROM sessions WHERE datum = '$date' AND uzivatel = '$searchuzivatel';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "success";
  while($row = $result->fetch_assoc()) {
    array_push($jsonhistoryzakazka, $row['zakazka']);
    array_push($jsonhistorycas, $row['cas']);
   
  }
} else {
  echo "0 results";
}
}
$conn->close();


echo "--split--";
echo json_encode($jsonhistoryzakazka, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($jsonhistorycas, JSON_UNESCAPED_SLASHES);



?> 