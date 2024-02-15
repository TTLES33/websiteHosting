<?php  


$mysqlcommand1 = $_POST["mysqlcommand1"];
$mysqlcommand2 = $_POST["mysqlcommand2"];
$uzivatel = $_POST["uzivatel"];
$datum = $_POST["datum"];



$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT cas_od, cas_do FROM cas WHERE datum='$datum' AND jmeno_id='$uzivatel'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
   echo "Cas existuje:".$row['cas_od']." - ".$row['cas_do']."";
   $cas_exist = "true";
  }
} else {
  $cas_exist = "false";
}
$conn->close();

if($cas_exist == "false"){ 












$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = $mysqlcommand2;


if ($conn->query($sql) === TRUE) {
 echo "goodresponse";

} else {
 echo "Error: " . $sql . "<br>" . $conn->error."";
}
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."");
}

$sql = $mysqlcommand1;
if ($conn->query($sql) === TRUE) {

} else {
echo "Error: " . $sql . "<br>" . $conn->error."";
}

$conn->close(); 

$conn->close(); 










}else{


}

?>