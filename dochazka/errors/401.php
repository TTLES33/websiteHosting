<html>
<head>
<link rel="stylesheet" href="../css/global.css">
<link rel="stylesheet" href="../css/errors.css">
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="../js/global.js"></script>

</head>
<body>
<?php
$input_status = "2";
$prihlaseny_uzivatel_id;

if(isset($_COOKIE["cookie_id"])) {
    $input_status = "1";
    $prihlaseny_uzivatel_id = $_COOKIE["cookie_id"];


    
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$prihlaseny_uzivatel_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $prihlaseny_uzivatel = "".$row["titul"]." ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"].""; 
    $permission = $row["perms"];
   
  }
} else {
    $prihlaseny_uzivatel = "MySql Error."; 

}
$conn->close();




}
 







   
    
     if($input_status == "1"){ 
     
         ?>

<div class="all">
<div class="sidenav">
<img src="files/logort.png" class="sidenav_logo" href="index.php">

<a class="sidenav_content active"  href="index.php">Editace Docházky</a>
<a class="sidenav_content"  href="dochazka.php">Tisk Docházky</a>
<a class="sidenav_content "  href="vyk-prace.php">Výkazy práce</a>


<?php

 if($permission == "admin"){?>
<a class="sidenav_content"  href="zakazky.php">Zakázky 1</a>
<a class="sidenav_content"  href="zakazky1.php">Zakázky 2</a>
<a class="sidenav_content"  href="zakazky2.php">Zakázky 3</a>
<a class="sidenav_content"  href="uzivatele.php">Uživatelé</a>
<a class="sidenav_content"  href="posta.php">Pošta</a>



<?php
 }
 ?>
<div class="sidenav_bottom">
<a  style="float: bottom;" >
<?php

setcookie("test_cookie_povoleny", "test_povoleny", time() + 3600, '/');

if(count($_COOKIE) > 0) {
 
} else {
  echo "<div class=\"bad\">Cookies nejsou povoleny </div>";
}
?>
</a> 
<?php
 
 echo "<a class=\"sidenav_content sidenav_name\" style=\"float: bottom;\" >".$prihlaseny_uzivatel.""; ?><svg style="float:right;padding-left: 10px; cursor: pointer;" onclick="odhlaseni()"height="20px" viewBox="0 0 512.016 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0"/><path d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0"/><path d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0"/><path d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0"/><path d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0"/></svg></a>


</div>


</div>


<div class="mainbox0">



    <div class="errorbox">
        <div class="error">
            <div class="errorcode">
            401
            </div>
            <div class="errordes">
            Error - Unauthorized
            </div>

        </div>

        </div>


<?php 







}else if($input_status == "2"){


 
echo "<meta http-equiv=\"refresh\" content=\"0; url='http://ttles.space/dochazka/login/index.php?page=index'\" />";
}
    ?>
</div>
</div>

</div>


</body>

</html>