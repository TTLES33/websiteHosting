<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";
$uzivatel = $_POST['uzivatel'];
$vysledek = $_POST['datum'];
$year = substr($vysledek, 0, 4);
$month = substr($vysledek, 5, 7);
$status = "good";



    
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  $error_code = "<br>Connection failed: " . $conn->connect_error;
  $status = "error";
}

$sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$uzivatel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo "".$row["titul"]. " ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"]."";
  }
} else {
  $status = "error";
  
  $error_code  ="<br>MySql Error";
}
$conn->close();



   
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  $error_code = "<br>Connection failed: " . $conn->connect_error;
  $status = "error";
}
$sql = "SELECT sessions.cas, sessions.datum, zakazky.jmeno_zakazky FROM sessions INNER JOIN zakazky ON sessions.zakazka=zakazky.id_zakazky WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND uzivatel = $uzivatel ORDER BY datum ASC ";
//$sql = "SELECT * FROM sessions RIGHT JOIN zakazky ON sessions.zakazka=zakazky.id_zakazky ";
//$sql = "SELECT * FROM sessions WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND uzivatel = $uzivatel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table id=\"vykpracetable\" class=\"dochazka_table\"><thead>
    <tr class=\"dochazka_tr\"><th>Datum</th><th></th><th>Zakazka</th><th>Odpracováno</th></tr></thead><tbody>";
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
         
        

         
      
      echo "<tr ><td class=\"dochazka_td\">".$datum."</td>   <td class=\"dochazka_td\">".$den_v_tydnu."</td><td class=\"dochazka_td zakazka\">".$row["jmeno_zakazky"]."</td><td class=\"dochazka_td\">".$cas."</td></tr>";
    }
    echo "</tbody><tfoot></tfoot></table>";
  } else {

    $error_code = "no_vysledky";
    $status = "error";
  }
  $conn->close();

  setcookie("ajax_vyk_prace_load", $status, time() + (64000 * 5), "/");
  setcookie("ajax_error_code", $error_code, time() + (64000 * 5), "/");

?>