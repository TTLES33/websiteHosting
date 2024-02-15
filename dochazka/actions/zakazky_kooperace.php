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

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
      echo "<table class=\"kooperacetable\">";
      echo"<tr><td><input id=\"1_name\" value=\"".$row["1_name"]."\"></td><td><input id=\"1_value\" value=\"".$row["1_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"2_name\" value=\"".$row["2_name"]."\"></td><td><input id=\"2_value\" value=\"".$row["2_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"3_name\" value=\"".$row["3_name"]."\"></td><td><input id=\"3_value\" value=\"".$row["3_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"4_name\" value=\"".$row["4_name"]."\"></td><td><input id=\"4_value\" value=\"".$row["4_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"5_name\" value=\"".$row["5_name"]."\"></td><td><input id=\"5_value\" value=\"".$row["5_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"6_name\" value=\"".$row["6_name"]."\"></td><td><input id=\"6_value\" value=\"".$row["6_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"7_name\" value=\"".$row["7_name"]."\"></td><td><input id=\"7_value\" value=\"".$row["7_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"8_name\" value=\"".$row["8_name"]."\"></td><td><input id=\"8_value\" value=\"".$row["8_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"9_name\" value=\"".$row["9_name"]."\"></td><td><input id=\"9_value\" value=\"".$row["9_value"]."\"></td></tr>";
      echo"<tr><td><input id=\"10_name\" value=\"".$row["10_name"]."\"></td><td><input id=\"10_value\" value=\"".$row["10_value"]."\"></td></tr>";
      echo"</table>";
      echo "<button  class=\"odpracovano_save_bttn\" onclick=\"kooperacesave()\"> Uložit </button> ";
  }
} else {
  echo "0 results";
}
$conn->close();
?>