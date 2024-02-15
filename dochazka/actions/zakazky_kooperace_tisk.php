<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";
$id = $_POST["zak_id"];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM kooperace WHERE id_kooperace_zakazky = $id ";
$result = $conn->query($sql);
$array1 = array();
$array2 = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
      for($i = 0; $i <= 9; $i++){ 
   
            array_push($array1, $row["".$i."_name"]);
            array_push($array2, $row["".$i."_value"]);
  }
}
} else {
  echo "0 results";
}
$conn->close();
echo json_encode($array1, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($array2, JSON_UNESCAPED_SLASHES);
?>