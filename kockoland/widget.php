<html>
<head>

<style>
body{background: #e3e3e3;
    margin: 0;
  font-family: 'Asap', sans-serif;}

.container{background: white;
width:13%;

position:absolute;
top:30%;
left:45%;
border-radius: 10px;}



.left{float: left;
box-sizing: border-box;
width:50%;

text-align: center;
}


.right{float: left;
    box-sizing: border-box;
    width:50%;

text-align: center;
}
.first{overflow: hidden;
padding: 0px;
padding-bottom: 15px;
text-align: center;

}
.stav_online {background: #c1ff8f;
float: left;
width:100%;
text-align: center;
padding-top: 5px;
padding-bottom: 5px;
margin-right: 5px;
margin :0px;
}

.invite{
font-weight: bold;

color: black;




cursor: pointer;
text-decoration: none;

transition: 0.3s;
text-align: center;
height:40px;
  line-height: 40px;
  white-space: nowrap;


}
.invite:hover{
    font-size: 18px;

}


</style>

</head>
<body>
    
<?php
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "pristupoveheslo";
$dbname = "kockoland";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM KOCKOLAND_STATS WHERE name='online'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {
      $online = $row["hodnota"];

  }
} else {
  echo "0 results";
}

$sql = "SELECT * FROM KOCKOLAND_STATS WHERE name='celkem'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {
      $celkem = $row["hodnota"];


  }
} else {
  echo "0 results";
}


$sql = "SELECT * FROM KOCKOLAND_STATS WHERE name='staff_online'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {
      $staff_online = $row["hodnota"];


  }
} else {
  echo "0 results";
}
$sql = "SELECT * FROM KOCKOLAND_STATS WHERE name='staff_celkem'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {
      $staff_celkem = $row["hodnota"];


  }
} else {
  echo "0 results";
}
$conn->close();
?>

<table>
<tr>
<td>  <?php  echo $staff_online; ?>  </td>
<td>   <?php  echo $celkem; ?> </td>

</tr>

</table>

<div class="container">

<div class="first" style=" padding-top: 20px;"><div class="left" >Název: </div>  <div class="right">  SkyBlock | Kockoland </div></div>
<div class="first"><div class="left">Uživatelů: </div>  <div class="right">  <?php echo $online; echo " / "; echo $celkem;?> </div></div>



<div class="first" ><div class="left" >Kód Pro Připojení: </div>  <div class="right">  <a href="https://discord.com/invite/BSB8zJqX?utm_source=Discord%20Widget&utm_medium=Connect" class="invite">BSB8zJqX</a> </div></div>
<div class="first"><div class="<?php if($staff_online > '0'){echo 'stav_online">Management je Online ('.$staff_online. ')';}else{echo 'stav_offline"> × Management není Online × ';} ?> </div></div>
<div class="first"> <a href="https://discord.com/invite/BSB8zJqX?utm_source=Discord%20Widget&utm_medium=Connect"> <img  src="discord.png" style=" width: 80%; padding: 10%; padding-bottom: 5px; padding-top: 5px;"></a></div>










</div>

</body>

</html>