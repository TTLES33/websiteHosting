<html>
  <head>
    <script type="text/javascript"> var databasetable = "zakazky2"; </script>
    <link rel="stylesheet" type="text/css" href="css/datatables.css">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/zakazky.css">
    <script src="//code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/global.js"></script>
    <script src="js/zakazky_js.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/plug-ins/1.11.3/sorting/custom-data-source/dom-text.js"></script>
    <title>Road Traffic - Zakázky</title>
  </head>


<body onload="VersionChecker(); ZakazkyInsertCheck(); uzavreno_check();">



  <?php
  $input_status = "2";
  $prihlaseny_uzivatel_id;

  include 'php_components/databaselogin.php';
  


  if(isset($_COOKIE["cookie_id"])) {
      $input_status = "1";
      $prihlaseny_uzivatel_id = $_COOKIE["cookie_id"];

      

      $conn = new mysqli($servername, $username, $password, $dbname);

      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

      $sql = "SELECT * FROM uzivatele WHERE id_uzivatele=$prihlaseny_uzivatel_id ";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $prihlaseny_uzivatel = "".$row["prijmeni"]." ".$row["jmeno"].", ".$row["titul"]." ".$row["titul_za"].""; 
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

    <a class="sidenav_content"  href="index.php">Editace Docházky</a>
    <a class="sidenav_content"  href="dochazka.php">Tisk Docházky</a>
    <a class="sidenav_content"  href="vyk-prace.php">Výkazy Práce</a>


    <?php

    if($permission == "admin"){?>
      <a class="sidenav_content active"  href="zakazky.php">Zakázky Projekce</a>
      <a class="sidenav_content"  href="zakazky1.php">Zakázky Dron</a>
      <a class="sidenav_content"  href="zakazky2.php">Zakázky Software</a>
      <a class="sidenav_content"  href="uzivatele.php">Uživatelé</a>
      <a class="sidenav_content"  href="posta.php">Pošta</a>
    <?php
    }
    ?>
      <div class="sidenav_bottom">
      <a style="float: bottom;" >
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

<div class="mainbox0" id="mainbox0">

  <div class="navigace">
     <a class="navigace_href" href="index.php"> Road Traffic </a> > <a class="navigace_href" href="zakazky.php">Zakázky </a>
  </div> 

  <center>
  <?php 
      if($permission == "admin"){ ?>

  <div id="vystup" class="tabulka">
    <table id="zakazkytable" class="dochazka_table">
      <thead id="zakazky_tbody" >
        <tr id="zakazky_top" class="dochazka_tr">
          <th>Název</th>
          <th>Zodpovědná osoba</th>
          <th>Zahájení</th>
          <th>Ukončení</th>
          <th>Faktura</th>
          <th>Kooperace</th>
          <th>Výdaje RT</th>
          <th>Zisk/Ztráta</th>
          <th>Stav</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        </thead>
      <tbody>
        <?php

          $uzivatele_array_id = array(" ");
          $uzivatele_array_name = array(" ");
          $uzivatele_array_name_small = array(" ");

          $conn = new mysqli($servername, $username, $password, $dbname);

          if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }

          $sql = "SELECT * FROM uzivatele ORDER BY prijmeni DESC";

          $result = $conn->query($sql);
          $uzi_pocet = 0;

          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {

              array_push($uzivatele_array_id, $row["id_uzivatele"]);
                $jmeno = "".$row["prijmeni"]." ".$row["jmeno"].", ".$row["titul"]." ".$row["titul_za"]."";
                $jmano_small = "".$row["prijmeni"]." ".$row["jmeno"]."";
              array_push($uzivatele_array_name, $jmeno);
              array_push($uzivatele_array_name_small, $jmeno_small);
                $uzi_pocet = $uzi_pocet + 1;
            }
          } else {
            echo "0 results";
          }


          $conn = new mysqli($servername, $username, $password, $dbname);

          if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }

          $sql = "SELECT *,(SELECT  SEC_TO_TIME( SUM( TIME_TO_SEC( `cas` ) ) )  FROM sessions WHERE zakazka = id_zakazky)
                AS totaltime 
                FROM zakazky 
                INNER JOIN uzivatele 
                ON zakazky.zodpovedna_osoba_zakazky=uzivatele.id_uzivatele 
                WHERE zakazkytable = 'zakazky0'
                ORDER BY stav_zakazky DESC, jmeno_zakazky;";


            $zak_pocet = 0;
            $result = $conn->query($sql);
            $ids = array("0");
            if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {

                $zak_id = $row["id_zakazky"] ;
                $uzivatele_vyber = "";
                $zahajeni = $row["zahajeni_zakazky"];  
                $ukonceni = $row["ukonceni_zakazky"];  

                  if($row["stav_zakazky"] == "true"){
                      $stav = "<option value=\"true\" class=\"otevreno\">Otevřeno</option> <option value=\"false\" class=\"uzavreno\">Uzavřeno</option>";
                  }else{
                    $stav = "<option value=\"false\" class=\"uzavreno\">Uzavřeno</option> <option value=\"true\" class=\"otevreno\">Otevřeno</option> ";
                  }

                $osoba = "".$row["jmeno"]." ".$row["prijmeni"].", ".$row["titul"]."".$row["titul_za"]."";
                $osoba_id = $row["id_uzivatele"];
                $time = $row["totaltime"];
                $zak_name = $row["jmeno_zakazky"];
                $zak_id = $row["id_zakazky"] ;
                $fakturarow = $row["faktura"];

                $time_hrs = substr($time, 0, 2);    
                $time_min = substr($time, 3, 2);      
                $time_min = $time_min / 60;    
                $time = $time_hrs + $time_min;    
                $vynos = $time * 850;               
                $faktura = number_format($fakturarow,0,","," ");              
                $sub_name = "zak_name_";
                $del_name = "zak_delete_";
                $tisk_name = "tisk_delete_";
                $name_name = "input_zak_";
                $koperacename = "kooperaceopen_";  
                $zak_pocet = $zak_pocet + 1;
                
                array_push($ids, $zak_id);
        
          
                $ignore_poradi = array_search($osoba_id, $uzivatele_array_id,  $strict = false );
                //echo "<script type='text/javascript'>alert('pocet uzivatelu: $uzi_pocet_men');</script>";
                //$uzivatele_vyber = "<option value=".$uzivatele_array_id[$ignore_poradi].">".$uzivatele_array_name[$ignore_poradi]."</option>";
                for($i = $uzi_pocet; $i > 0; $i--){    
                //echo "<script type='text/javascript'>alert('ignorovaný uživatel$ignore_poradi');</script>";
                  if($i !== $ignore_poradi){ 
                    $uzivatele_vyber = "".$uzivatele_vyber."<option value=".$uzivatele_array_id[$i].">". $uzivatele_array_name[$i]."</option>";
                    $uzi_pocet_men = $uzi_pocet_men - 1;
                  }
              }
  
        
                  $zak_tr = "tr_";
                  $test = "".$zak_tr."".$zak_pocet."";
                    
                  echo "<tr id=\"".$test."\">
                          <td class=\"dochazka_td\">
                              <input type=\"text\" class=\"input_name\"  id=\"".$name_name."name_".$zak_pocet."\" value=\"".$zak_name."\">
                          </td>                      
                          <td class=\"dochazka_td\">
                              <select id=\"".$name_name."osoba_".$zak_pocet."\"> <option value=\"".$osoba_id."\">".$osoba."".$uzivatele_vyber." </select>
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"date\" id=\"".$name_name."zahajeni_".$zak_pocet."\" oninput=\"uzavreno_check()\" value=\"".$zahajeni."\">
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"date\" id=\"".$name_name."ukonceni_".$zak_pocet."\" oninput=\"uzavreno_check()\" value=".$ukonceni.">
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"text\" class=\"numberinput\"  id=\"".$name_name."faktura_".$zak_pocet."\" value=\"".$faktura."\" oninput=\"numberformatterevent(event); freemny()\">
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"text\" class=\"clickable\" readonly  id=\"".$name_name."kooperace_".$zak_pocet."\" value=\"0\" onclick=\"kooperaceopen(this.id)\">
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"image\" class=\"clickable\" readonly  width=\"15\" height=\"15\" src=\"files/loading.gif\" id=\"".$name_name."odpracovano_".$zak_pocet."\" value=\"\" onclick=\"odpracovanoopen(this.id)\">
                          </td>
                          <td class=\"dochazka_td\">
                              <input type=\"image\" readonly  width=\"15\" height=\"15\" src=\"files/loading.gif\" id=\"".$name_name."free_".$zak_pocet."\" value=\"loading\">
                          </td>
                          <td class=\"dochazka_td\">
                              <select onInput=\"uzavreno_check();\" id=\"".$name_name."stav_".$zak_pocet."\" >".$stav."</select>
                          </td>
                          <td class=\"dochazka_td\" style=\"width:24\">
                              <button class=\"dochazka_edit_buttn\" onclick=\"updatejs(this.id)\" id=\"".$sub_name."".$zak_pocet."\">Uložit</button>
                          </td>
                          <td class=\"dochazka_td\" >  
                              <svg class=\"dochazka_delete_buttn\" onclick=\"delete_confirm(this.id)\" id=\"".$del_name."".$zak_pocet."\" fill=\"#ffffff\"  viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"/></svg>
                          </td>
                          <td class=\"dochazka_td\" >  
                              <button class=\"dochazka_tisk_buttn\" onclick=\"tiskjs(this.id)\" id=\"".$tisk_name."".$zak_pocet."\">Tisk</button>
                          </td>
                        </tr>";

        }
        echo "</tbody>";
      } else {
        echo "0 výsledků";
      }


      $js_zakazky_array = json_encode($ids);
      $jsuzivatele_array_id = json_encode($uzivatele_array_id);
      $jsuzivatele_array_name = json_encode($uzivatele_array_name);
      $jsuzivatele_array_name_small = json_encode($uzivatele_array_name_small);
        echo "<script> var zakazky_array = ". $js_zakazky_array . ";\n</script>";
        echo "<script> var uzivatele_array_id = ". $jsuzivatele_array_id . ";\n</script>";
        echo "<script> var uzivatele_array_name = ". $jsuzivatele_array_name . ";\n</script>";
        echo "<script> var uzivatele_array_name_small = ". $jsuzivatele_array_name_small . ";\n</script>";
      $conn->close();




    $vlozeni_name = "vlozeni_name";
    $vlozeni_uzivatel = "vlozeni_uzivatel";
    $vlozeni_zahajeni = "vlozeni_zahajeni";
    $vlozeni_ukonceni = "vlozeni_ukonceni";
    $vlozeni_faktura = "vlozeni_faktura";
    $vlozeni_kooperace = "vlozeni_kooperace";
    $vlozeni_stav = "vlozeni_stav";
    $vlozeni_vlozit = "vlozeni_vlozit";
    $uzi_pocet_inp = $uzi_pocet;
    $input_uzivatele_vyber = "<option value=\"none\"></option>";

    for($i = $uzi_pocet; $i > 0; $i--){ 
      $input_uzivatele_vyber = "".$input_uzivatele_vyber."<option value=".$uzivatele_array_id[$i].">".$uzivatele_array_name[$i]."</option>";
      $uzi_pocet_inp = $uzi_pocet_inp - 1;
    }
      
    echo "<tfoot class=\"bottom\">
            <tr class=\"test\">
            </center>
              <th class=\"table_add\"><div class=\"content\"> + Přidat Zakázku</div></th><center>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
              <th class=\"table_add\"></th>
            </tr>
            <tr>
              <td><input class=\"input_name\" type=\"text\"  id=".$name_name."".$vlozeni_name."> </th>
              <td><select id=\"".$name_name."".$vlozeni_uzivatel."\">". $input_uzivatele_vyber."</select></td>
              <td><input type=\"date\" id=\"".$name_name."".$vlozeni_zahajeni."\"></td>
              <td><input type=\"date\" id=\"".$name_name."".$vlozeni_ukonceni."\"></td>
              <td><input step=\".01\" type=\"number\" id=".$name_name."".$vlozeni_faktura."></td>
              <td></td>
              <td></td>
              <td></td>
              <td><select id=\"".$name_name."".$vlozeni_stav."\"><option value=\"true\" class=\"otevreno\"> Otevřeno </option> <option value=\"false\" class=\"uzavreno\"> Uzavřeno </option></select></td>
              <td><button class=\"dochazka_insert_bttn\" type=\"submit\" id=".$name_name."".$vlozeni_vlozit." onclick=\"insertjs(this.id)\"  type=\"button\" >Vložit</td>
            </tr>";
    ?>
        </tfoot>
  </table>

  <script type="text/javascript">
      vydajeRT();
  </script>
  
    
    </div>
    <br>
    <div class="ajax_vysledek" id="ajax_vysledek"></div>

    <div id="modal" class="modal">
      <div id="kooperace" class="kooperace">
        <div class="header">
            <div class="text" >Kooperace</div>
            <div class="bttn" onclick="kooperaceclose_confirm(save=false)"> X</div>
            <div class="clear"></div>
        </div>
        <div id="kooperace_content" class="content"> 

        </div>
      </div>
    </div>

    <div id="vydajertmodal" class="modal">
      <div id="vydajert" class="kooperace">
        <div class="header">
            <div class="text" >vydajeRT</div>
            <div class="bttn" onclick="odpracovano_confirm(save=false)"> X</div>
            <div class="clear"></div>
        </div>
        <div id="vydajert_content" class="content"> 
          
        </div>
      </div>
    </div>

    <div id="uzivatelemodal" class="modal">
      <div id="uzivatele" class="kooperace">
        <div class="header">
            <div class="text" >Uživatele</div>
            <div class="bttn" onclick="uzivateleclose()"> X</div>
            <div class="clear"></div>
        </div>
        <div id="uzivatele_content" class="content"> 
          
        </div>
      </div>
    </div>


    <div id="savemodal" class="modal" style="z-index: 1000;">
      <div id="save" class="savemodal">
        <div id="save_content" class="savekontent"> 
          
        </div>
      </div>
    </div>

  </div>


<?php

  }else if($permission = "user"){
  ?>
  <meta http-equiv="refresh" content="0; url='/dochazka/errors/401.php'" />
  <?php
  }
  ?>
  </div>

  <?php
  }else if($input_status == "2"){

      echo "<meta http-equiv=\"refresh\" content=\"0; url='/login/index.php?page=zakazky'\" />";

  }
      ?>
  </div>

  </div>
</div>
</body>
</html>


