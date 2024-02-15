<?php
$databasetable = $_POST["databasetable"];


$casarray = array();
$userarray = array();
$zakazkaarray = array();
$zakazkyid = array();
$zakazkyJSONS = array();
$zakazkykooperace = array();
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM zakazky WHERE zakazkytable='$databasetable';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($zakazkyid, $row['id_zakazky']);
    array_push($zakazkyJSONS, $row['odpracovanoJSON']);
    array_push($zakazkykooperace, $row['kooperace']);
     //   echo "<script>var outputid = '".$row["id_zakazky"]."';var outputJSON = '".$row['odpracovanoJSON']."';testfnc(outputJSON, outputid);</script>";
}
} else {
  echo "0 results";
}
$sql = "SELECT * FROM sessions";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
 



    array_push($userarray, $row['uzivatel']);
    array_push($zakazkaarray, $row['zakazka']);
    array_push($casarray, $row['cas']);
}
} else {
  echo "0 results";
}

echo json_encode($zakazkyid, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($zakazkyJSONS, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($casarray, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($userarray, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($zakazkaarray, JSON_UNESCAPED_SLASHES);
echo "--split--";
echo json_encode($zakazkykooperace, JSON_UNESCAPED_SLASHES);


//echo "<script>  casarray = ".json_encode($casarray)."; console.log(casarray);</script>";
//echo "<script>  userarray = ".json_encode($userarray)."; console.log(userarray);</script>";
//echo "<script>  zakazkaarray = ".json_encode($zakazkaarray)."; console.log(zakazkaarray);</script>";
//echo "<script>objectlooping(casarray, userarray, zakazkaarray);</script>";

$conn->close();
?> 