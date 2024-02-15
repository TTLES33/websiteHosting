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
    <a style="padding-top: 20px;" href="anti-vulgarita.php">Anti Vulgarita</a>
    <a style="font-weight: bold;" href="reklama.php">Reklama</a>
    <a href="embed.php">Embed</a>
    <a href="widget.php">Widget</a>
    <a style="margin-bottom: 10px; position: absolute; bottom: 0;">TTLES</a>

  </div>


<div class="mainbox3">

    <a class="navcigace" href="index.html">KOCKOLAND BOT</a> > <a class="navcigace"href="reklama.php">Reklama</a> <br>

  <div class="box">




<div class="tab_list">
        <div class="tab_nadpis"> <center> Záznamy Zpráv Obsahující Reklamu </center> </div>
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

$sql = "SELECT *  FROM reklama";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table ><tr><td class=\"tab_th_r\" >Id</td><td class=\"tab_th_r\">Nick</td><td class=\"tab_th_r\">Zpráva</td></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr><td class=\"tab_td_r\"> ".$row["id"]."</td><td class=\"tab_td_r\">".$row["nick"]."</td><td class=\"tab_td_r\">".$row["original_message"]."</td></tr>";
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
</div>
</div>










</div>

</center>



</div> 
</div>

<div class="mainbox2">


<center>















</div>
</div>
</body>

</html>