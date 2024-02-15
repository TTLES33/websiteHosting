
    <?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";
 $add = $_POST['add'];


 $conn = new mysqli($servername, $username, $password, $dbname);
 $conn->set_charset("utf8");
 if(isset($_POST['add_submit']))
 {

      $sql = "INSERT INTO anti_vulgarita_exc (blacklist_exc) VALUES ('$add')";

 }
 if ($conn->query($sql) === TRUE) {

    echo '<script type="text/JavaScript">  
    window.location.replace("http://ttles.space/kockoland/anti-vulgarita.php");
         </script>' ; 
   echo " <br>  <br> <a class=\"input2\" href=\"http://ttles.space/kockoland/anti-vulgarita.php\">Obnovit tabulku</a> ";

 }else{


    echo"Error";
 }
        ?>