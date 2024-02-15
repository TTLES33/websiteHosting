<?php


$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";
 $delete = $_POST['delete'];

 echo ($nadpis.$popis.$autor.$typ);
 $conn = new mysqli($servername, $username, $password, $dbname);
 $conn->set_charset("utf8");
   $sql = "DELETE FROM anti_vulgarita_exc WHERE id = '$delete'";
 if ($conn->query($sql) === TRUE) {
    echo '<script type="text/JavaScript">  
    window.location.replace("http://ttles.space/kockoland/anti-vulgarita.php");
         </script>' ; 

   echo " <br>  <br> <a class=\"input2\" href=\"http://ttles.space/test/blacklist.php\">Obnovit tabulku</a> ";

 } 

 ?>