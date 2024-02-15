<?php
$searching_uzivatel = $_POST["searching_uzivatel"];
$searching_zakazka = $_POST["searching_zakazka"];
$databasetable = $_POST["databasetable"];

$casarray = array();
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT cas FROM sessions WHERE uzivatel=$searching_uzivatel AND zakazka=$searching_zakazka";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
 
  
    array_push($casarray, $row['cas']);
}
} else {
    array_push($casarray, "error");
}


$sql = "SELECT odpracovanoJSON FROM zakazky WHERE id_zakazky=$searching_zakazka";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
   echo $row["odpracovanoJSON"];

     //   echo "<script>var outputid = '".$row["id_zakazky"]."';var outputJSON = '".$row['odpracovanoJSON']."';testfnc(outputJSON, outputid);</script>";
}
} else {
  echo "0 results";
}


echo "--split--";
echo json_encode($casarray, JSON_UNESCAPED_SLASHES);





$conn->close();
?> 