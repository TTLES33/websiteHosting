<!DOCTYPE html>
<html>
<body id="body">
<script>
var casarray = "";
var userarray = "";
var zakazkaarray = "";
var zakazkyJSONarray = {};
function testfnc(outputJSON, outputid) {
    
if(outputJSON !== ""){
    outputJSON = JSON.parse(outputJSON);
   
    console.log(outputJSON.uzivatele.length);
    for(i = outputJSON.uzivatele.length - 1; i >= 0; i--){

    outputJSON.uzivatele[i].celkem = "";

    }
    zakazkyJSONarray[outputid] = outputJSON;
    console.log(zakazkyJSONarray);
    console.log(outputJSON);
    

}
}


function objectlooping(casarray, userarray, zakazkaarray){
    console.log("cas " + casarray);
    console.log("user " + userarray);
    console.log("zakazka " + zakazkaarray);



  for(i = Object.keys(zakazkyJSONarray).length - 1; i >= 0; i--){
    for(x = zakazkaarray.length - 1; x >= 0; x-- ){
  
      if(zakazkaarray[x] == Object.keys(zakazkyJSONarray)[i]){
        var other_status = true;
        for(y = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele.length - 1; y >= 0; y--){
          
   
          if(userarray[x] == zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].uzivatel){
            other_status = false;
            var cas = casarray[x];
            cas = cas.substring(0,2) + cas.substring(3,5) / 60;
            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].celkem = cas * parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].cena, 10);
            console.log(zakazkyJSONarray);
            
          }
        }
        if(other_status = true){
          var cas = casarray[x];
            cas = cas.substring(0,2) + cas.substring(3,5) / 60;
            for(y = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele.length - 1; y >= 0; y--){
              if(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].uzivatel == "other"){ 
              zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].celkem = cas * parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[y].cena, 10);
            }
            }
            
            console.log(zakazkyJSONarray);

        }

     }
     }
    
  }
document.getElementById("test").innerHTML = JSON.stringify(zakazkyJSONarray);

}


</script>
<div id="test"></div>
<?php
$casarray = array();
$userarray = array();
$zakazkaarray = array();
$servername = "database-ttles.cr2b8qefitxx.us-east-2.rds.amazonaws.com";
$username = "dochazka-pristup";
$password = "dochazkapristupoveheslo";
$dbname = "dochazka";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM zakazky";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    
        echo "<script>var outputid = '".$row["id_zakazky"]."';var outputJSON = '".$row['odpracovanoJSON']."';testfnc(outputJSON, outputid);</script>";
}
} else {
  echo "0 results";
}
$sql = "SELECT * FROM sessions";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
 



    array_push($userarray, $row['uzivatel']);
    array_push($zakazkaarray, $row['zakazka']);
    array_push($casarray, $row['cas']);
}
} else {
  echo "0 results";
}

echo "<script>  casarray = ".json_encode($casarray)."; console.log(casarray);</script>";
echo "<script>  userarray = ".json_encode($userarray)."; console.log(userarray);</script>";
echo "<script>  zakazkaarray = ".json_encode($zakazkaarray)."; console.log(zakazkaarray);</script>";
echo "<script>objectlooping(casarray, userarray, zakazkaarray);</script>";

$conn->close();
?> 




</body>
</html>
