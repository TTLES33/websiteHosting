    
    <html>
        <head>
        <link rel="stylesheet" href="../css/global.css">
        <link rel="stylesheet" href="../css/login.css">
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="../js/login.js"></script>

        </head>
        <body>
        <div id="main" class="main">
            <?php
           
            $page = $_GET["page"];
            echo "<script> var page = \"".$page."\";console.log(page);</script>";
            ?>
            <center>
    <div class="login_form">
     <div class="tab_nadpis">ROAD-TRAFFIC</div>
     <form id="loginform" onsubmit="checkpasswd(); return false;">
    <select  autofocus id="uzivatele_vyber_login">

<?php

include '../php_components/databaselogin.php';



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

  
  echo "<option class=\"userselect\" value=\"none\">Vybrat uživatele</option>";
$sql = "SELECT * FROM uzivatele ORDER BY prijmeni";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo "<option value=". $row["id_uzivatele"].">". $row["prijmeni"]." ". $row["jmeno"]."</option>";
  }
} else {
  echo "<br> 0 results";
}
$conn->close();
?>
     </select><br>
     <input type="password" id="input_passwd">
     <br>
     <div class="login_button"  onclick="checkpasswd()" id="login_submit" >Příhlásit se </div>
</form>
</div >
   
     <div id="status">
     </div>
     </div>
    
</body>
</html>