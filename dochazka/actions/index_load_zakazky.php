<?php
    $servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
    $username = "dochazka-pristup";
    $password = "dochazkapristupoveheslo";
    $dbname = "dochazka";
    
    $mysqlcommand = $_POST['mysqlcommand'];


    
$conn = new mysqli($servername, $username, $password, $dbname);

$jmeno_array = array();
$ids_array = array();

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id_zakazky, jmeno_zakazky FROM zakazky WHERE $mysqlcommand";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "success";
  
  while($row = $result->fetch_assoc()) {
      array_push($jmeno_array, $row["uzivatele"]);
      array_push($ids_array, $row["id_zakazky"]);

 
  }
} else {
  echo "0 results";
}

echo "--split--";
echo json_encode($jmeno_array, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($ids_array, JSON_UNESCAPED_SLASHES);


$conn->close();
?>
