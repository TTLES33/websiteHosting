<?php
$zak_id = $_POST['kooperacezakazka'];

$name_1 = "";
$name_2 = "";
$name_3 = "";
$name_4 = "";
$name_5 = "";
$name_6 = "";
$name_7 = "";
$name_8 = "";
$name_9 = "";
$name_10 = "";

$value_1 = "";
$value_2 = "";
$value_3 = "";
$value_4 = "";
$value_5 = "";
$value_6 = "";
$value_7 = "";
$value_8 ="";
$value_9 = "";
$value_10 = "";

$name_1 = $_POST['name_1'];
$name_2 = $_POST['name_2'];
$name_3 = $_POST['name_3'];
$name_4 = $_POST['name_4'];
$name_5 = $_POST['name_5'];
$name_6 = $_POST['name_6'];
$name_7 = $_POST['name_7'];
$name_8 = $_POST['name_8'];
$name_9 = $_POST['name_9'];
$name_10 = $_POST['name_10'];

$value_1 = $_POST['value_1'];
$value_2 = $_POST['value_2'];
$value_3 = $_POST['value_3'];
$value_4 = $_POST['value_4'];
$value_5 = $_POST['value_5'];
$value_6 = $_POST['value_6'];
$value_7 = $_POST['value_7'];
$value_8 = $_POST['value_8'];
$value_9 = $_POST['value_9'];
$value_10 = $_POST['value_10'];


$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("<div class=\"bad\"> Error: " . $conn->connect_error. "</div>");
}

$sql = "UPDATE kooperace SET 1_value='$value_1', 2_value='$value_2',3_value='$value_3',4_value='$value_4',5_value='$value_5',6_value='$value_6',7_value='$value_7',7_value='$value_7',8_value='$value_8',9_value='$value_9',10_value='$value_10', 1_name='$name_1', 2_name='$name_2', 3_name='$name_3', 4_name='$name_4', 5_name='$name_5', 6_name='$name_6', 7_name='$name_7', 8_name='$name_8', 9_name='$name_9', 10_name='$name_10' WHERE id_kooperace_zakazky='$zak_id' ";

if ($conn->query($sql) === TRUE) {
    
  echo "<div class=\"good\">Úspěšně vloženo</div>";
} else {
  echo "<div class=\"bad\"> Error: " . $conn->error . "</div>";
}

$conn->close();

?>