<?php
    $servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
    $username = "dochazka-pristup";
    $password = "dochazkapristupoveheslo";
    $dbname = "dochazka";
    


    
$conn = new mysqli($servername, $username, $password, $dbname);

$arrays_array = array();
$ids_array = array();
$jmeno_array = array();

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id_zakazky, jmeno_zakazky, odpracovanoJSON FROM zakazky WHERE stav_zakazky='true'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "success";
  
  while($row = $result->fetch_assoc()) {
      array_push($arrays_array, $row["odpracovanoJSON"]);
      array_push($ids_array, $row["id_zakazky"]);
      array_push($jmeno_array, $row["jmeno_zakazky"]);
 
  }
} else {
  echo "0 results";
}

echo "--split--";
echo json_encode($arrays_array, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($ids_array, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($jmeno_array, JSON_UNESCAPED_SLASHES);

$conn->close();
?>
