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
   echo "<div class=\"bad\"> Cas existuje:".$row['cas_od']." - ".$row['cas_do']."</div><br>";
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
 echo " <div class=\"good\"> Úspěšně Vloženo:  Datum: ".$datum."<br>";
 echo "</div>";
} else {
 echo "<div class=\"bad\">Error: " . $sql . "<br>" . $conn->error."</div><br>";
}
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("<div class=\"bad\">Connection failed: " . $conn->connect_error."</div><br>");
}

$sql = $mysqlcommand1;
if ($conn->query($sql) === TRUE) {

} else {
echo "<div class=\"bad\">Error: " . $sql . "<br>" . $conn->error."</div><br>";
}

$conn->close(); 

$conn->close(); 










}else{


}

?>