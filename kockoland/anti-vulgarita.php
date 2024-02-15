<!doctype html>
<html>
<head>
    
<link rel="stylesheet" href="css.css">
</head>
<body>
  

    <div class="main">
 <div class="sidenav">
    <a style="font-weight: bold; font-size: 25px; padding-bottom: 6px;" href="index.html">KOCKOLAND BOT</a>
    <hr>
    <a style="font-weight: bold; padding-top: 20px;" href="anti-vulgarita.php">Anti Vulgarita</a>
    <a  href="reklama.php">Reklama</a>
    <a href="embed.php">Embed</a>
    <a href="widget.php">Widget</a>
    <a style="margin-bottom: 10px; position: absolute; bottom: 0;">TTLES</a>
  
  </div>


<div class="mainbox1">

    <a class="navcigace" href="index.html">KOCKOLAND BOT</a> > <a class="navcigace"href="anti-vulgarita.php">anti vulgarita</a> <br>

  <div class="box">


    <div class="tab_list">
        <div class="tab_nadpis"> <center> Zakázané slova </center> </div>
    <div class="tab_content">
        <?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT *  FROM anti_vulgarita";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table ><tr><td class=\"tab_th\" >Id</td><td class=\"tab_th\">Blacklist</td></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr ><td class=\"tab_td\">".$row["id"]."</td><td class=\"tab_td\">".$row["blacklist"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();
?>
</div>
</div>





<div class="tab_list">
        <div class="tab_nadpis"> <center> Vyjímky </center> </div>
    <div class="tab_content">
        <?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT *  FROM anti_vulgarita_exc";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table ><tr><td class=\"tab_th\" >Id</td><td class=\"tab_th\">Vyjímky</td></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr ><td class=\"tab_td\"> ".$row["id"]."</td><td class=\"tab_td\">".$row["blacklist_exc"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();
?>
</div>
</div>




<div class="tab2">

<form action="insert.php" method="post">
  <center>
 
          <div class="section_nad">Vložit zak. slovo</div>
        <input class="input" type="text" name="add" id="add">
        <br>
    <input class="button" name="add_submit" type="submit" value="Odeslat">

</form>
</div>

<div class="tab2">

<form action="delete.php" method="post">
  <center>
    

          <div class="section_nad">Odstranit zak. slovo</div>
        <input class="input" value="id" type="text" name="delete" id="delete">
        <br>
    <input class="button" name="delete_submit" type="submit" value="Odstranit">

</form>
</div>


<div class="tab2">

<form action="insert_exc.php" method="post">
  <center>
 
          <div class="section_nad">Vložit vyjímku</div>
        <input class="input" type="text" name="add" id="add">
        <br>
    <input class="button" name="add_submit" type="submit" value="Odeslat">

</form>
</div>

<div class="tab2">

<form action="delete_exc.php" method="post">
  <center>
    

          <div class="section_nad">Odstranit Vyjímku</div>
        <input class="input" value="id" type="text" name="delete" id="delete">
        <br>
    <input class="button" name="delete_submit" type="submit" value="Odstranit">

</form>
</div>


</div>

</center>



</div> 
</div>

<div class="mainbox2">


<center>
<div class="tab_log">
<div class="tab_nadpis"> Historie Zablokovaných zpráv </div>
<div class="log_table">
<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT *  FROM anti_vulgarita_log";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table class=\"tab12\"><tr><th>Id</th><th>Nick Id</th><th>Blokované Slovo</th><th>Originální Zpráva</th></tr>";
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<tr><td class=\"tab_td\">".$row["id"]."</td><td class=\"tab_td\">".$row["nick"]."</td><td class=\"tab_td\">".$row["blacklisted_word"]."</td><td class=\"tab_td\">".$row["original_message"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();
?>
<div class="hvezdicka">
Nick je zjistitelný pomocí <a href="https://discord.id/" class="">discord.id</a>, po vložení id
</div>
</center>
</div>














</div>
</div>
</body>

</html>