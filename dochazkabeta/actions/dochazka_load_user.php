<style>
/* nastavuje zobrazeni jen pro tisk: */
@media screen {
    .noScreen{
       display:none;
    }
}
</style>




<?php

$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$vysledek = $_POST['month'];
$year = substr($vysledek, 0, 4);
$month = substr($vysledek, 5, 7);
$prihlaseny_uzivatel_id = $_COOKIE["cookie_id"];
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


echo "<div class=\"noScreen\" style=\"height:auto;\">";
echo "<span style=\"float: left\">ROAD-TRAFFIC s.r.o.</span>";
echo "<span style=\"float: right\">$monthtext $year</span>";
echo "<br><hr>";
echo "</div>";
echo "<BR>";


   
    //echo "Jméno: ";

    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    $status = "error";
    $error_code = "".$error_code."Connection failed: " . $conn->connect_error ."<br>";
}

$sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$prihlaseny_uzivatel_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $status = "success";
  while($row = $result->fetch_assoc()) {
    echo "".$row["titul"]. " ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"]."";
  }
} else {
    $status = "error";
    $error_code = "".$error_code."MySQL Error <br>";
}
$conn->close();
echo "<BR>";
echo "<BR>";


   
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    $status = "error";
    $error_code = "".$error_code."Connection failed: " . $conn->connect_error ."<br>";
}

$sql = "SELECT * FROM cas WHERE YEAR(datum) = $year AND MONTH(datum) = $month AND jmeno_id = $prihlaseny_uzivatel_id ORDER BY datum ASC ";
$result = $conn->query($sql);
$dochazka_pocet = 0;
$dochazka_celkem = 0;
if ($result->num_rows > 0) {
    $status = "success";
    echo "<table class=\"dochazka_table\"><tbody><tr class=\"dochazka_tr\"><th>Datum</th><th>Od</th><th>Do</th><th>Odpracováno</th></tr>";
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

        $datum_fst = $row["datum"];  
         $datum = date("d-m-Y", strtotime($datum_fst));  
         $datum = str_replace("-",".",$datum);

         $dochazka_celkem = $dochazka_celkem + $odpracovano_row;
         $dochazka_pocet = $dochazka_pocet + 1;

      echo "<tr ><td class=\"dochazka_td\">".$datum."</td><td class=\"dochazka_td\">".$cas_od_string."</td><td class=\"dochazka_td\">".$cas_do_string."</td><td class=\"dochazka_td\">".$odpracovano_hodiny.":".$odpravovano_minuty."</td></tr>";
    }
    echo "</tbody>";
  } else {
    $status = "error";
    $error_code = "".$error_code."0 Výsledků <br>";
  }
  $conn->close();





  
        $odpracovano_hodiny = $dochazka_celkem / 60;
        $odpracovano_hodiny = (int)$odpracovano_hodiny;
        $hod_poc = $odpracovano_hodiny * 60;
        $odpravovano_minuty = $dochazka_celkem - $hod_poc;
        if($odpravovano_minuty < "10"){
            $odpravovano_minuty = "0" + "".$odpravovano_minuty."";
        }


        echo "<tr style=\"height: 10px;\"><td></td><td></td><td></td><td></td></tr>";
        echo "<tfoot class=\"testik\"><tr><th>". $dochazka_pocet." dnů</th><td></td><td></td>
        <th style=\"text-align: center;\">". $odpracovano_hodiny.":". $odpravovano_minuty." hod</th></tr></tfoot></table>";
        setcookie("ajax_dochazka_load", $status, time() + (64000 * 5), "/");
        setcookie("ajax_error_code", $error_code, time() + (64000 * 5), "/");
       ?>
        
        