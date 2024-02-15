<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";
$id = $_GET["zak_id"];
echo $id;
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
            array_push($array1, $row["".$i."name"]);
            array_push($array2, $row["".$i."value"]);
  }
}
} else {
  echo "0 results";
}
$conn->close();
print_r($array1);
echo "<br>";
print_r($array2);
?>