<html>
<head></head>
<body>
<form action="index.php" method="post">
    <input type="text" name="pass" id="">
    <input type="text" name="pass2" id="">
    <input type="submit" value="encrypt">
</form>


<?php

$password = $_POST["pass"];
$passwordToVerify = $_POST["pass2"];
echo $password;
echo "<br>";
$encrypt_password = password_hash($password, PASSWORD_DEFAULT);
echo $encrypt_password;
echo "<br>";
if(password_verify($passwordToVerify, $encrypt_password)){
    echo "password verified";
}
?>
</body>
</html>