

<?php
    $servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
    $username = "dochazka-pristup";
    $password = "dochazkapristupoveheslo";
    $dbname = "dochazka";
    


    
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id_zakazky, jmeno_zakazky FROM zakazky";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  
  while($row = $result->fetch_assoc()) {
     $zakazky = "".$zakazky."{\"id\": \"".$row['id_zakazky']."\", \"name\": \"".$row['jmeno_zakazky']."\"},";
  }
} else {
  echo "0 results";
}
echo $zakazky;
$conn->close();
?>
