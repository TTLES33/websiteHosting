<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$vysledek = $_POST['month'];
$year = substr($vysledek, 0, 4);
$month = substr($vysledek, 5, 7);
$uzivatel = $_POST['uzivatel'];
$error_code;
$monthtext ="";
if ($month == '01'){$monthtext ="leden";}
if ($month == '02'){$monthtext ="únor";}
if ($month == '03'){$monthtext ="březen";}
if ($month == '04'){$monthtext ="duben";}
if ($month == '05'){$monthtext ="květen";}
if ($month == '06'){$monthtext ="červen";}
if ($month == '07'){$monthtext ="červenec";}
if ($month == '08'){$monthtext ="srpen";}
if ($month == '09'){$monthtext ="září";}
if ($month == '10'){$monthtext ="říjen";}
if ($month == '11'){$monthtext ="listopad";}
if ($month == '12'){$monthtext ="prosinec";}




$output_uzivatel = "";
$output_tabulka = "";

    //echo "Jméno: ";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
     
     $status = "error";
      $error_code = "".$error_code."Connection failed: " . $conn->connect_error ."<br>";
    }

$sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$uzivatel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
   $output_uzivatel = "".$output_uzivatel."<div class=\"noScreen\" style=\"height:auto;\">";
   $output_uzivatel = "".$output_uzivatel."<span style=\"float: left\">ROAD-TRAFFIC s.r.o.</span>";
   $output_uzivatel = "".$output_uzivatel."<span style=\"float: right\">".$monthtext."".$year."</span>";
   $output_uzivatel = "".$output_uzivatel."<br><hr>";
   $output_uzivatel = "".$output_uzivatel."</div>";
   $output_uzivatel = "".$output_uzivatel."<BR><br>";
  $status = "success";
  while($row = $result->fetch_assoc()) {
    $output_uzivatel = "".$output_uzivatel."".$row["titul"]. " ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"]."";
  } 
} else {
    $status = "error";
    $error_code = "".$error_code."MySQL Error <br>";
 
}
$conn->close();



   
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  $error_code = "".$error_code."Connection failed: " . $conn->connect_error ."<br>";
  $status = "error";
}

$sql = "SELECT * FROM cas WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND jmeno_id = $uzivatel ORDER BY datum ASC ";
$result = $conn->query($sql);
$dochazka_pocet = 0;
$dochazka_celkem = 0;
if ($result->num_rows > 0) {
    $status = "success";
    $output_tabulka = "".$output_tabulka."<table id=\"dochazkatable\" class=\"dochazka_table\"><thead>
    <tr class=\"dochazka_tr\">
    <th colspan=\"2\">Datum</th><th>Pauza na Oběd</th><th>Od</th><th>Do</th><th>Odpracováno</th>><th></th>
    </tr>
    </thead><tbody>";
   

    while($row = $result->fetch_assoc()) {
        $cas_od_string = substr($row["cas_od"], 0,5);
        $cas_do_string = substr($row["cas_do"], 0,5);
        $odpracovano_row = $row["cas"];
        $odpracovano_hodiny = $odpracovano_row / 60;
        $odpracovano_hodiny = (int)$odpracovano_hodiny;
        $hod_poc = $odpracovano_hodiny * 60;
        $odpravovano_minuty = $odpracovano_row - $hod_poc;
        if($odpravovano_minuty < "10"){
            $odpravovano_minuty = "0" + "".$odpravovano_minuty."";
        }

        if($odpracovano_row > 360){
            $pauzanaobed = "ano";
        }else{
            $pauzanaobed = "ne";
        }

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

         $dochazka_celkem = $dochazka_celkem + $odpracovano_row;
         $dochazka_pocet = $dochazka_pocet + 1;

         $output_tabulka = "".$output_tabulka."<tr><td class=\"dochazka_td\">".$datum."</td>   <td class=\"dochazka_td\">".$den_v_tydnu."</td>
      <td class=\"dochazka_td\" style=\"text-align: center;\"> ".$pauzanaobed."</td>
      <td id=\"cas_od_".$row["datum"]."\" class=\"dochazka_td\">".$cas_od_string."</td>
      <td id=\"cas_do_".$row["datum"]."\" class=\"dochazka_td\">".$cas_do_string."</td>
      <td class=\"dochazka_td\">".$odpracovano_hodiny.":".$odpravovano_minuty."</td>
 
      <td class=\"dochazka_td\"><img class=\"updatebttn\" src=\"files/edit.svg\" type=\"button\" value=\"upravit\" id=\"update_".$row["datum"]."\" onclick=\"dateupdate(this.id)\"></td>
      </tr>";
    }
    $output_tabulka = "".$output_tabulka."";
  } else {
    $status = "error";
    $error_code = "".$error_code."no_vysledky";
 
  }
  $conn->close();


  
        $odpracovano_hodiny = $dochazka_celkem / 60;
        $odpracovano_hodiny = (int)$odpracovano_hodiny;
        $hod_poc = $odpracovano_hodiny * 60;
        $odpravovano_minuty = $dochazka_celkem - $hod_poc;
        if($odpravovano_minuty < "10"){
            $odpravovano_minuty = "0" + "".$odpravovano_minuty."";
        }
        
        
        $output_tabulka = "".$output_tabulka."<tr style=\"height: 10px;\"><td></td><td></td><td></td><td></td><td></td></tr></tbody>";
        $output_tabulka = "".$output_tabulka."<tfoot class=\"testik\"><tr><th>". $dochazka_pocet." dnů</th><td></td><td></td><td></td>
          <th style=\"text-align: center;\">". $odpracovano_hodiny.":". $odpravovano_minuty." hod</th><td></td><td></td></tr></tfoot></table>";

        echo $status;
        echo "--split--";
        echo $error_code;
        echo "--split--";
        echo $output_uzivatel;
        echo $output_tabulka;
        ?>