<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";
$uzivatel = $_POST['uzivatel'];
$vysledek = $_POST['datum'];
$year = substr($vysledek, 0, 4);
$month = substr($vysledek, 5, 7);




    
    echo "Jméno: ";

    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$uzivatel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo "".$row["titul"]. " ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"]."";
  }
} else {
  echo "MySql Error";
}
$conn->close();



   
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT sessions.cas, sessions.datum, zakazky.jmeno_zakazky FROM sessions LEFT JOIN zakazky ON sessions.zakazka=zakazky.id_zakazky WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND uzivatel = $uzivatel";
//$sql = "SELECT * FROM sessions RIGHT JOIN zakazky ON sessions.zakazka=zakazky.id_zakazky ";
//$sql = "SELECT * FROM sessions WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND uzivatel = $uzivatel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table class=\"dochazka_table\"><tr class=\"dochazka_tr\"><th>Datum</th><th>Zakazka</th><th>Odpracováno</th></tr>";
    while($row = $result->fetch_assoc()) {
  

        $datum_fst = $row["datum"];  
         $datum = date("d-m-Y", strtotime($datum_fst));  
         $datum = str_replace("-",".",$datum);

         $cas = substr($row["cas"], 0,5);
         $dayofweek = date('w', strtotime($datum_fst));
         if($dayofweek == 0){
           $den_v_tydnu = "Neděle";
          }else if($dayofweek == 1){
            $den_v_tydnu = "Pondělí";
          }else if($dayofweek == 2){
           $den_v_tydnu = "Úterý";
          }else if($dayofweek == 3){
           $den_v_tydnu = "Středa";
          }else if($dayofweek == 4){
            $den_v_tydnu = "Čtvrtek";
          }else if($dayofweek == 5){
           $den_v_tydnu = "Pátek";
          }else if($dayofweek == 6){
           $den_v_tydnu = "sobota";
          }
         
        

         
      
      echo "<tr ><td class=\"dochazka_td\">".$datum."   ".$den_v_tydnu."</td><td class=\"dochazka_td\">".$row["zakazka"]."</td><td class=\"dochazka_td\">".$cas."</td></tr>";
    }
    echo "</table>";
  } else {
    echo "0 výsledků";
  }
  $conn->close();



?>