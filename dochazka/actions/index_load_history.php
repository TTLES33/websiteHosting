<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$searchuzivatel = $_POST['searchuzivatel'];

$jsonhistorydate = array(); 
$jsonhistorycasod = array(); 
$jsonhistorycasdo = array(); 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}else{ 

$sql = "SELECT * FROM cas WHERE datum > current_date - interval 7 day AND jmeno_id = '$searchuzivatel' ORDER BY datum;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "success";
  while($row = $result->fetch_assoc()) {
   array_push($jsonhistorydate, $row['datum']);
   array_push($jsonhistorycasod, $row['cas_od']);
   array_push($jsonhistorycasdo, $row['cas_do']);
  }
} else {
  echo "0 results";
}
}
$conn->close();


echo "--split--";
echo json_encode($jsonhistorydate, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($jsonhistorycasod, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($jsonhistorycasdo, JSON_UNESCAPED_SLASHES);


?> 