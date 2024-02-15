<?php
include '../php_components/databaselogin.php';
    $pass = $_POST["passwd"];  
    $uzivatel_id = $_POST["uzivatel_id"];  
   



$conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM uzivatele WHERE `id_uzivatele`= '".$uzivatel_id."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $passwd_db = $row["passwd"];
        $permission = $row["perms"];
        $prihlaseny_uzivatel = "".$row["titul"]." ".$row["jmeno"]." ".$row["prijmeni"]." ".$row["titul_za"].""; 
    }
    }
    $conn->close();



    if($pass == $passwd_db){
        $input_status = "1";
        echo "success";
        setcookie("cookie_id", $uzivatel_id, time() + (86400 * 7), "/"); 
        }else{
            echo "error";
        
        }
        ?>