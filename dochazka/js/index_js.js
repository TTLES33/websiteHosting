
var zakazkypagepocet = 0;
var zakazkyJSON = "{}";
var historicalID;
zakazkyJSON = JSON.parse(zakazkyJSON);
var zakazkyarray = [];
var inserting_status = "insert";
var insert_status;


function RunOnLoad() {
  console.groupCollapsed("Function: RunOnLoad");
  VersionChecker();
  

  console.log(postedupdatestatus);
  if(postedupdatestatus == "updatestatus"){
    document.getElementById("uzivatel").value = posteduzivatel;
    document.getElementById("datum").value = posteddatum;
    document.getElementById("cas_od").value = postedcasod;
    document.getElementById("cas_do").value = postedcasdo;
  }
  getUzivatelVar();
  loadZakazky(inserttype="onload");
  //LoadHistory();


console.groupEnd();
}


function testfnc(){
 // var value = document.getElementById("cas_od").value;
  //alert(value);
  

}

function getUzivatelVar(){
  if(perms == "admin"){

  
  uzivatel_var = document.getElementById("uzivatel").value;
  console.log("uzivatel_var= " + uzivatel_var);
  }
}

function loadZakazky(inserttype){
 
    console.groupCollapsed("Function: loadZakazky");


  $.ajax({    //načtení id_zakazky, jmeno_zakazky, uzivatele z databaze
    type: "POST",
    url: 'actions/index_load_zakazky_arrays.php',
    data: {},

success: function(result){

  var splittedresult = result.split("--split--");
  console.log(splittedresult);
  
  if(splittedresult[0] == "success"){
    
    var authorizedzakazky = [];

    var arrayids = JSON.parse(splittedresult[2]);
      console.log(arrayids);
    var arrayarrays = JSON.parse(splittedresult[1]);
      console.log(arrayarrays);
    var arraynames = JSON.parse(splittedresult[3]);
      console.log(arraynames);

      for(i = arrayids.length -1; i >= 0; i--){  //vložení do authorizedzakazky id všech zakázek kde je v uzivatele array
        var idarray = JSON.parse(arrayarrays[i]);
        console.log(idarray.uzivatele);
        for(x = idarray.uzivatele.length -1; x >= 0; x--){
            console.count();
            
          if(idarray.uzivatele[x]){
            if(idarray.uzivatele[x].uzivatel == uzivatel_var){
                authorizedzakazky.push(arrayids[i]);
            }
            }
        } 
      }


      for(i = Object.keys(zakazkyJSON).length -1; i >= 0; i--){   //vymazání všech zakázek z tabulky a zakazkyJSON
        console.log(i);
      if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi !== ""){
          console.log("Vymazána zakázka " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
          document.getElementById("zak_" + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi).remove();
          zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi = "";
          zakazkyJSON[Object.keys(zakazkyJSON)[i]].value = "";
      };
    }


      console.log(authorizedzakazky);
      if(authorizedzakazky.length > 0){

/*         var mysqlcommand = "";

        for(i = authorizedzakazky.length -1; i >= 0; i--){
          mysqlcommand = mysqlcommand + "id_zakazky = '" +  authorizedzakazky[i] + "' OR ";

        }
        console.log(mysqlcommand);
        mysqlcommand = mysqlcommand.slice(0, -4);
        console.log(mysqlcommand); */
//------------------------------------------------------------------
        resultlenght = authorizedzakazky.length - 1;
        console.log(resultlenght);
        zakazkyJSON = {};
        for(i = resultlenght; i >= 0; i--){

          zakazkyJSON[authorizedzakazky[i]] = {"jmeno": arraynames[arrayids.indexOf(authorizedzakazky[i])], "poradi": "", "value": "" };
          
        }
        console.log(zakazkyJSON);
        console.log(JSON.stringify(zakazkyJSON));

//-------------------------------------------------------------------


         

  if(postedupdatestatus == "updatestatus"){
      var runstatus = "editload";         
      LoadHistory(runstatus);
  }else{ 
    zakazky_select_add();          
    LoadHistory();

  }


      }else{
        alert("Není přiřazena žádná zakázka");
        zakazkyJSON = {};
        document.getElementById("result").innerHTML = "";
      }
      
  }else{
    alert("error");
  }


/*  result = "[" + result.slice(0, -1) + "]";
result = JSON.parse(result);
console.log(result);
zakazky_array = result;

resultlenght = Object.keys(result).length - 1;
console.log(resultlenght);
for(i = resultlenght; i >= 0; i--){

  zakazkyJSON[result[i].id] = {"jmeno": result[i].name, "poradi": "", "value": "" };
  
}
console.log(zakazkyJSON);
console.log(JSON.stringify(zakazkyJSON));

console.log("________________________________________________"); */

},


error: function (xhr, ajaxOptions, thrownError) {
alert(xhr.status);
alert(thrownError);
}
})
console.groupEnd();
}



function zakazky_select_add(insertstatus, historyzakazka, historytime){
    console.groupCollapsed("Function: zakazky_select_add");
    if(insertstatus){
    insertstatus = insertstatus.toString();
     }
     if(historyzakazka){ 
    historyzakazka = historyzakazka.toString();
  }
  if(historytime){
    historytime = historytime.toString();
  }
  console.log(zakazkyJSON);
  var JSONlenght = Object.keys(zakazkyJSON).length - 1;
  console.log(JSONlenght);
  var select = "<select id=\"select_add\" oninput=\"array_id_change(this.id);\">";
  var zakazky_status = false;


  if(zakazkypagepocet != Object.keys(zakazkyJSON).length){    //kontrola, jestli se počet zakázek na stránce nerovná maximálnímu počtu (délka zakazkyJSON)
    zakazkypagepocet++;


    if(insertstatus){
      if(insertstatus == "historyinsert"){
           
     for(i = JSONlenght; i >= 0; i--){
        console.log("i: " + i);
        console.log("poradi: " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
        console.log("zakazky_status: " + zakazky_status);
        if(Object.keys(zakazkyJSON)[i] == historyzakazka){
          select = select + "<option selected value=\"" + Object.keys(zakazkyJSON)[i] + "\"> " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].jmeno + " </option>";
        }else{
          select = select + "<option value=\"" + Object.keys(zakazkyJSON)[i] + "\"> " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].jmeno + " </option>";
        }  

       }
      }
    }else{ 
      
  for(i = JSONlenght; i >= 0; i--){
  console.log("i: " + i);
  console.log("poradi: " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
  console.log("zakazky_status: " + zakazky_status);

 

    if(zakazky_status === false && zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi === ""){
        select = select + "<option selected value=\"" + Object.keys(zakazkyJSON)[i] + "\"> " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].jmeno + " </option>";
        zakazky_status = true;
    }else{    
      select = select + "<option value=\"" + Object.keys(zakazkyJSON)[i] + "\"> " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].jmeno + " </option>";
    }
    
    

  }
}
  select = select + "</select>";

    var zakid = zakazkyarray.length;

    var htmltable = document.getElementById("zakazky");
    var htmlrow = htmltable.insertRow(-1);


    var cell_zakazka = htmlrow.insertCell(0);
    var cell_time = htmlrow.insertCell(1);
    var cell_delete = htmlrow.insertCell(2);

  var svg = "<svg class=\"dochazka_delete_buttn\" onClick=\"zakazky_select_delete(this.id)\" id=\"zak_delete_" + zakid + "\" fill=\"#ffffff\"  viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"/></svg>";
    cell_zakazka.innerHTML = select;
    cell_time.innerHTML = "<input type=\"time\" required=\"true\" oninput=\"zak_input_insert_time(this.id); timeLeft();\" id=\"zak_time_" +  zakid + "\">";
    cell_delete.innerHTML = svg;

    htmlrow.id = "zak_" + zakid;
    htmlrow.classList.add("zakazka_content_add");

  zakazkyJSON[document.getElementById("select_add").value].value = "";
  console.log("zakid: " + zakid);
  zakazkyJSON[document.getElementById("select_add").value].poradi = zakid;

  zakazkyarray.push(document.getElementById("select_add").value);

  if(insertstatus){ 
    if(insertstatus == "historyinsert"){
     document.getElementById("zak_time_" + zakid).value = historytime;
     zakazkyJSON[document.getElementById("select_add").value].value = historytime;
    }
   }

  document.getElementById("select_add").id = "zak_select_" + zakid;
  console.log(select);
  console.log(zakazkyJSON);
  console.log(zakazkyarray);

  for(i = zakid; i >= 0; i--){
    console.log("for");
    console.log(i);
  
 if(document.getElementById("zak_select_" + i)){ 
   document.getElementById("zak_select_" + i).value = zakazkyarray[i];
   if(document.getElementById("zak_time_" + i)){
     console.log("zaktime");
    document.getElementById("zak_time_" + i).value = zakazkyJSON[zakazkyarray[i]].value;

   }
  

 }
} 
timeLeft();
}else{
    alert("Další akce nelze přidat");
}
console.groupEnd();
}

function zakazky_select_delete(clicked_id){
    console.groupCollapsed("Function: zakazky_select_delete");
clicked_id = clicked_id.replace("zak_delete_", "");
document.getElementById("zak_" + clicked_id).remove();
zakazkypagepocet--;


zakazkyJSON[zakazkyarray[clicked_id]].value = "";
zakazkyJSON[zakazkyarray[clicked_id]].poradi = "";
console.log(zakazkyarray[clicked_id]);
//zakazkyarray.splice(clicked_id, 1);
console.log(zakazkyJSON);
console.log(zakazkyarray);


console.groupEnd();
timeLeft();
}





//je potřeba
function zak_input_duplicate_con(clicked_id){
    console.groupCollapsed("Function: zak_input_duplicate_con");
    console.log("Function: zak_input_duplicate_con");
    var JSONlenght = Object.keys(zakazkyJSON).length - 1;
clicked_id = clicked_id.replace("zak_select_", "");

if(zakazkyJSON[Object.keys(zakazkyJSON)[clicked_id]].poradi != ""){

    document.getElementById("zak_error_" + clicked_id).innerHTML = "Zakázka existuje!";
}
console.groupEnd();
}





function zak_input_insert(clicked_id){
    console.groupCollapsed("Function: zak_input_insert");
    console.log("clicked_id1: " + clicked_id);
clicked_id = clicked_id.replace("zak_select_", "");
var id = zakazkyarray[clicked_id];


console.log(id);
console.log(zakazkyJSON[id].jmeno);
console.log("clicked_id: " + clicked_id);
console.log(zakazkyJSON);
console.log("zakazkyarray[clicked_id]:" + zakazkyarray[clicked_id]);

if(zakazkyJSON[id].poradi !== ""){
  alert("Zakázka je již určena");

  var JSONlenght = Object.keys(zakazkyJSON).length - 1;
  var changestatus = false;
    if(zakazkypagepocet == Object.keys(zakazkyJSON).length){
        for(i = 0; i < Object.keys(zakazkyJSON).length; i++){
            if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi == clicked_id){
                document.getElementById("zak_select_" + clicked_id).value = Object.keys(zakazkyJSON)[i];
                zakazkyarray[clicked_id] = Object.keys(zakazkyJSON)[i];
            }
        }
    }else{
    for(i = JSONlenght; i >=0; i--){
      console.log(i);
      if(changestatus === false){
        if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi == ""){
          changestatus = true;
          console.log("poradi: " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
           //console.log(zakazkyJSON);
            document.getElementById("zak_select_" + clicked_id).value = Object.keys(zakazkyJSON)[i];   
              array_id_change(clicked_id);
                
            }
                }}
            }


}else{ 

zakazkyJSON[zakazkyarray[clicked_id]].poradi = parseInt(clicked_id, 10); 


var cas;
            
if(document.getElementById("zak_time_" + clicked_id).value == ""){
    cas = "";
}else{
    cas = document.getElementById("zak_time_" + clicked_id).value;
}
zakazkyJSON[zakazkyarray[clicked_id]].value = cas;

var JSONlenght = Object.keys(zakazkyJSON).length - 1;
for(i = JSONlenght; i >=0; i--){
  console.log("for: " + i);

  if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi == clicked_id){
    console.log("if 1a: " + Object.keys(zakazkyJSON)[i]);
    console.log("if 1b: " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
    //console.log(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
    console.log("if 1c: " + clicked_id);
    console.log("if 1d: " + id);
    //console.log(clicked_id);

    if(Object.keys(zakazkyJSON)[i] != id){
      console.log("vecere1"+Object.keys(zakazkyJSON)[i]);
      console.log("vecere2"+id);
      zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi = "";
      zakazkyJSON[Object.keys(zakazkyJSON)[i]].value = "";
    }
  }

}

}


console.log(zakazkyJSON);

console.groupEnd();
}


function array_id_change(clicked_id){
    console.groupCollapsed("Function: array_id_change");
   
  var clicked_poradi = clicked_id.replace("zak_select_", "");   

zakazkyarray[clicked_poradi] = document.getElementById("zak_select_" + clicked_poradi).value;
console.log(zakazkyarray);
zak_input_insert(clicked_id);
console.groupEnd();
}


function zak_input_insert_time(clicked_id){
    console.groupCollapsed("Function: zak_input_insert_time");
    clicked_id = clicked_id.replace("zak_time_", "");

    var cas = document.getElementById("zak_time_" + clicked_id).value;
    if(cas == ""){
        //cas = "00:00";
    }

    zakazkyJSON[zakazkyarray[clicked_id]].value = cas;

    console.log(cas);
    console.log(zakazkyJSON);
console.groupEnd();
}









function index_insert(){
    console.groupCollapsed("Function: index_insert");
 
  

  document.getElementById("ActionStatus").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>"  ;
    var datum = document.getElementById("datum").value;
   
    var cas_od = document.getElementById("cas_od").value;
    var cas_do = document.getElementById("cas_do").value;

    if(perms === "admin"){
      console.log("adminn");
       uzivatel_var = document.getElementById("uzivatel").value;
    }else{

    }
    console.log(perms)
    console.log(uzivatel_var);
    console.log(datum);
    console.log(cas_od);
    console.log(cas_do);


    var mysqlcommand1 = "INSERT INTO sessions (zakazka, cas, uzivatel, datum) VALUES "
    
    var JSONlenght = Object.keys(zakazkyJSON).length - 1;
    for(i = JSONlenght; i >= 0; i--){
console.log("insert" + i);
console.log(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
         if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi !== ""){ 
            console.log("insert if" + i)
mysqlcommand1 = mysqlcommand1 + "('" + Object.keys(zakazkyJSON)[i] + "','" + zakazkyJSON[Object.keys(zakazkyJSON)[i]].value + "','" + uzivatel_var + "','" + datum + "'),";

}
}
    var timeStart = new Date("2021-01-01T" + cas_od + ":00");
    var timeEnd = new Date("2021-01-01T" + cas_do + ":00");
    console.log(timeStart);
    console.log(timeEnd);
   
    var milliseconds = ((timeEnd) - (timeStart));
    var seconds = milliseconds / 1000 ;
    var cas_minutes = seconds / 60;
    cas_minutes = parseInt(cas_minutes, 10);
 
    if(cas_minutes > 360){    
    cas_minutes = cas_minutes - 30;
  }
    var mysqlcommand2 = "INSERT INTO cas (datum, cas_od, cas_do, jmeno_id, cas) VALUES ('" + datum + "','" + cas_od + "','" + cas_do + "','" + uzivatel_var + "','" + cas_minutes + "');";
   
    mysqlcommand1 = mysqlcommand1.slice(0, -1) + ";";



    var uzivatel = uzivatel_var;
    if(insert_status === "good"){
      
      console.log(mysqlcommand1);
      console.log(mysqlcommand2);
    $.ajax({
      type: "POST",
      url: 'actions/index_insert_admin.php',
      data: {mysqlcommand1: mysqlcommand1, 
              mysqlcommand2: mysqlcommand2,
              datum: datum,
              uzivatel: uzivatel
      },

success: function(result){
  if(result.startsWith("good")){
    document.getElementById("ActionStatus").classList = "ActionStatus good";
    document.getElementById("ActionStatus").innerHTML = "<b>Úspěšně Vloženo</b><br>Začátek práce: "+ cas_od + "<br>Konec práce: " + cas_do + "<br>Datum: " + datum;

  }else{
    document.getElementById("ActionStatus").classList = "ActionStatus bad";
    document.getElementById("ActionStatus").innerHTML = result;
  }
    
    console.log(result);
  LoadHistory();

},


error: function (xhr, ajaxOptions, thrownError) {
  alert(xhr.status);
  alert(thrownError);
}
}) 
}else{
 
  document.getElementById("ActionStatus").classList = "ActionStatus bad";
  document.getElementById("ActionStatus").innerHTML = "<b>" + insert_status_text + "</b>";
}

console.groupEnd();
}











function timeLeft(clickstatus) {
    console.groupCollapsed("Function: timeLeft");
    console.log("************** TimeLeft **************");
    var input_text_od = document.getElementById("cas_od");
    var input_text_do = document.getElementById("cas_do");
    var text_od = input_text_od.value;
    console.log(text_od);
    var text_do = input_text_do.value;
    console.log(text_do);
    var timeStart = new Date("2021-01-01T" + text_od + ":00");
    var timeEnd = new Date("2021-01-01T" + text_do + ":00");
    console.log(timeStart);
    console.log(timeEnd);
   
    var milliseconds = ((timeEnd) - (timeStart));
    var seconds = milliseconds / 1000 ;
    var cas_minutes = seconds / 60;
    cas_minutes = parseInt(cas_minutes, 10);
 
    if(cas_minutes > 360){    
      cas_minutes = cas_minutes - 30;
      document.getElementById("pauzanaobed").innerHTML = "odečtena pauza na oběd";
      document.getElementById("pauzanaobed").style.animationName = "pauzanaobed";
  }else{
      document.getElementById("pauzanaobed").innerHTML = "";
      document.getElementById("pauzanaobed").style.animationName = "";
  }
  if(cas_minutes > 720){
    cas_minutes = cas_minutes - 30;
  }

  console.log("minutes: " + cas_minutes);

    var mins_result = 0;


   var JSONlenght = Object.keys(zakazkyJSON).length - 1;
    for(i = JSONlenght; i >= 0; i--){

      var zak_value = zakazkyJSON[Object.keys(zakazkyJSON)[i]].value;
      if(zak_value != ""){
      var hodiny = zak_value.slice(0, 2); 
      hodiny = parseInt(hodiny, 10);
    var minuty = zak_value.slice(3, 5);
      minuty = parseInt(minuty, 10);
    var hodiny_min = hodiny * 60;
      mins_result = mins_result + minuty + hodiny_min;
      console.log("mins_result: " + mins_result);

    }
    }



    document.getElementById("result").innerHTML ="" ;
     if(cas_minutes === mins_result){
      document.getElementById("result").innerHTML ="<div class=\"cas_good\"> vše OK </div>" ;
      insert_status = "good";
      
     

    }
    else if(cas_minutes > mins_result){
     

      var rozdil = cas_minutes - mins_result;
      

      var odpracovano_row = rozdil;      
      var odpracovano_hrs = odpracovano_row / 60;    
      odpracovano_hrs = Math.floor(odpracovano_hrs);     
      var hod_poc = odpracovano_hrs * 60;  
      var odpracovano_minuty = odpracovano_row - hod_poc;
 
      if(odpracovano_minuty < 10){
          odpracovano_minuty = "0" + odpracovano_minuty;
      }
        
        document.getElementById("result").innerHTML ="<div class=\"cas_bad\">Zbývá vykázat " + odpracovano_hrs + ":" + odpracovano_minuty + "</div>"; ;
        insert_status = "bad";
        insert_status_text = "Zbývá vykázat " + odpracovano_hrs + ":" + odpracovano_minuty;

        console.log("odpracovano_hrs" + odpracovano_hrs);
        console.log("odpracovano_minuty" + odpracovano_minuty);

        if(clickstatus == "konecprace"){
          console.log("konecprace");

          if(zakazkypagepocet > 0){ 


            //zapsání zbylého časy do první zakázky
            console.log("zakazkypagepocet");
            var whileloopingnumber = 0;
            var whilelooping = true;
            var zakazkyJSONporadi;

            //hledání první zákazky v inputech
              while(whilelooping == true){ 
                console.log(whilelooping);
                console.log(whileloopingnumber);

                
                for(x = 0; x < Object.keys(zakazkyJSON).length; x++){ //loop přes JSON zakázek
                  console.log(x);
                  console.log(zakazkyJSON[Object.keys(zakazkyJSON)[x]].poradi + "=" + whileloopingnumber);
                  if(zakazkyJSON[Object.keys(zakazkyJSON)[x]].poradi === whileloopingnumber){
                    zakazkyJSONporadi = x;
                    console.warn("if");
                    whilelooping = false;
                    console.log(whilelooping);
                  }
                }
                whileloopingnumber ++;
                console.log("--------------");
              }
              
              whileloopingnumber = whileloopingnumber - 1;
              console.log(whileloopingnumber);
            
              if(odpracovano_hrs < 10){
                odpracovano_hrs = "0" + odpracovano_hrs;
              }

            console.log(odpracovano_hrs);
            console.log(odpracovano_minuty);

             
             var output_hrs_nmbr = cas_minutes / 60;
              console.log("1:" + output_hrs_nmbr);
             output_hrs_nmbr = Math.floor(output_hrs_nmbr);
              console.log("2:" + output_hrs_nmbr);
             var output_minutes = cas_minutes - output_hrs_nmbr * 60;
              console.log("3:" + output_minutes);

              if(output_hrs_nmbr < 10){
                output_hrs_nmbr = "0" + output_hrs_nmbr;
              }
              if(output_minutes < 10){
                output_minutes = "0" + output_minutes;
              }

            document.getElementById("zak_time_" + whileloopingnumber).value = output_hrs_nmbr + ":" + output_minutes;
            zakazkyJSON[Object.keys(zakazkyJSON)[zakazkyJSONporadi]].value = output_hrs_nmbr + ":" + output_minutes; 
            
            timeLeft();
          }
          
        
        }

    }else if(mins_result > cas_minutes){
      if(cas_minutes < 0){
        document.getElementById("result").innerHTML ="<div class=\"cas_bad\"> Špatně vloženo</div>";
        insert_status = "bad";
        insert_status_text = "Špatně vloženo";
      }else{  
      document.cookie = "error_zak=true";
      var rozdil = mins_result - cas_minutes ;
      var odpracovano_row = rozdil;      
      var odpracovano_hrs = odpracovano_row / 60;    
      odpracovano_hrs = Math.floor(odpracovano_hrs);     
      var hod_poc = odpracovano_hrs * 60;  
      var odpracovano_minuty = odpracovano_row - hod_poc;
 
      if(odpracovano_minuty < 10){
          odpracovano_minuty = "0" + odpracovano_minuty;
      }
      document.getElementById("result").innerHTML ="<div class=\"cas_bad\"> Vykázáno navíc " + odpracovano_hrs + ":" + odpracovano_minuty + "</div>";
      insert_status = "bad";
      insert_status_text = "Vykázáno navíc " + odpracovano_hrs + ":" + odpracovano_minuty;

      if(clickstatus == "konecprace"){
        console.log("konecprace");

        if(zakazkypagepocet > 0){ 


          //zapsání zbylého časy do první zakázky
          console.log("zakazkypagepocet");
          var whileloopingnumber = 0;
          var whilelooping = true;
          var zakazkyJSONporadi;

          //hledání první zákazky v inputech
            while(whilelooping == true){ 
              console.log(whilelooping);
              console.log(whileloopingnumber);

              
              for(x = 0; x < Object.keys(zakazkyJSON).length; x++){ //loop přes JSON zakázek
                console.log(x);
                console.log(zakazkyJSON[Object.keys(zakazkyJSON)[x]].poradi + "=" + whileloopingnumber);
                if(zakazkyJSON[Object.keys(zakazkyJSON)[x]].poradi === whileloopingnumber){
                  zakazkyJSONporadi = x;
                  console.warn("if");
                  whilelooping = false;
                  console.log(whilelooping);
                }
              }
              whileloopingnumber ++;
              console.log("--------------");
            }
            
            whileloopingnumber = whileloopingnumber - 1;
            console.log(whileloopingnumber);
          
            if(odpracovano_hrs < 10){
              odpracovano_hrs = "0" + odpracovano_hrs;
            }

          console.log(odpracovano_hrs);
          console.log(odpracovano_minuty);

           
           var output_hrs_nmbr = cas_minutes / 60;
            console.log("1:" + output_hrs_nmbr);
           output_hrs_nmbr = Math.floor(output_hrs_nmbr);
            console.log("2:" + output_hrs_nmbr);
           var output_minutes = cas_minutes - output_hrs_nmbr * 60;
            console.log("3:" + output_minutes);

            if(output_hrs_nmbr < 10){
              output_hrs_nmbr = "0" + output_hrs_nmbr;
            }
            if(output_minutes < 10){
              output_minutes = "0" + output_minutes;
            }

          document.getElementById("zak_time_" + whileloopingnumber).value = output_hrs_nmbr + ":" + output_minutes;
          zakazkyJSON[Object.keys(zakazkyJSON)[zakazkyJSONporadi]].value = output_hrs_nmbr + ":" + output_minutes; 
          
          timeLeft();
        }
        
      
      }
  
      
    }

     
    }  
     
    
    
console.groupEnd();
  }



function LoadHistory(runstatus){  //spouštené přes body onload

console.groupCollapsed("Function: LoadHistory");

  if(perms == "admin"){
      searchuzivatel = document.getElementById("uzivatel").value;
  }else if(perms == "user"){
      searchuzivatel = uzivatel_var;
  }
  document.getElementById("dochazka-history").innerHTML = "<img class=\"loadingimg\" src=\"files/loading.gif\">";


    $.ajax({
        type: "POST",
        url: 'actions/index_load_history.php',
        data: {searchuzivatel : searchuzivatel},
    
    success: function(result){
        var splittedresult = result.split("--split--");
        console.log(splittedresult);
        if(splittedresult[0] !== "success"){
            document.getElementById("dochazka-history").innerHTML = "Žádná historie";
        }else{
            document.getElementById("dochazka-history").innerHTML = "";
            var historydatumjson = JSON.parse(splittedresult[1]);
            var historycasodjson = JSON.parse(splittedresult[2]);
            var historycasdojson = JSON.parse(splittedresult[3]);

            console.log(historydatumjson);
            console.log(historycasodjson);
            console.log(historycasdojson);
          var status = "oncall";
            var editsvg = "<svg onclick=\"startupdatinghistory(status, this)\" class=\"editsvg\"  fill=\"#ffffff\"  viewBox=\"0 0 23 23\" width=\"20px\" height=\"20px\">    <path d=\"M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z\"/></svg>";

            var historytable = document.createElement('table');
            historytable.className = "historytable";
            historytable.id = "historytable";

            var titlerow = historytable.insertRow(-1);
            titlerow.className = "titlerow";
                var titlecell1 = titlerow.insertCell(0);
                var titlecell2 = titlerow.insertCell(1);
                var titlecell3 = titlerow.insertCell(2);
                var titlecell4 = titlerow.insertCell(3);

                titlecell1.innerHTML = "Datum";
                titlecell2.innerHTML = "Začátek práce";
                titlecell3.innerHTML = "Konec práce";
                titlecell4.innerHTML = "";

                
           

            for(i = historydatumjson.length -1; i >= 0; i--){
                var row = historytable.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                var datum = historydatumjson[i].substring(8, 10) + "." + historydatumjson[i].substring(5,7) + "." + historydatumjson[i].substring(0,4); //yyyy-mm-dd to dd.mm.yyyy
                cell1.innerHTML = datum;
                cell2.innerHTML = historycasodjson[i].substring(0,5);
                cell3.innerHTML = historycasdojson[i].substring(0,5);
                cell4.innerHTML = editsvg;

                cell1.id = "history_datum_" + i;
                cell2.id = "history_casod_" + i;
                cell3.id = "history_casdo_" + i;
                cell4.id = "history_svg_" + i;

               
               // document.getElementById("addedsvg").id = "history_svg_" + i;

            }




            document.getElementById("dochazka-history").appendChild(historytable);



        }

        if(runstatus == "editload"){
          var startstatus = "onload";
          startupdatinghistory(startstatus);
        }
        console.groupEnd();
    },
    
    
    error: function (xhr, ajaxOptions, thrownError) {
        document.getElementById("dochazka-history").innerHTML = xhr.status + "<br>" + thrownError;
        console.groupEnd();
    }
    })
    
  }








  function startupdatinghistory(startstatus, s){ 
      console.groupCollapsed("Function: startupdatinghistory");

      console.log(startstatus);
      inserting_status = "editing";
      console.log(inserting_status);
      var datum = "";

      if(startstatus != "onload"){ 
        console.log(s.parentNode.id);
      var clicked_id = s.parentNode.id.replace("history_svg_", ""); //id upravovaného řádku (svg ikonky upravit)

        document.getElementById("cas_od").value = document.getElementById("history_casod_" + clicked_id).innerHTML; 
        document.getElementById("cas_do").value = document.getElementById("history_casdo_" + clicked_id).innerHTML;
        var updatedatum = document.getElementById("history_datum_" + clicked_id).innerHTML;
        updatedatum = updatedatum.substring(6, 10) + "-" + updatedatum.substring(3,5) + "-" + updatedatum.substring(0,2);
        document.getElementById("datum").value = updatedatum;


 
          datum = document.getElementById("history_datum_" + clicked_id).innerHTML;
          datum = datum.substring(6, 10) + "-" + datum.substring(3,5) + "-" + datum.substring(0,2);
          console.log(datum);

    }else{
      datum = posteddatum;
      searchuzivatel = posteduzivatel;

    }

    console.log(datum);
    console.log(searchuzivatel);
    zakazkypagepocet = 0;
    zakazkyarray.length = 0;
      for(i = Object.keys(zakazkyJSON).length -1; i >= 0; i--){   //vymazání všech zakázek z tabulky a zakazkyJSON
          console.log(i);
        if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi !== ""){
            document.getElementById("zak_" + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi).remove();
            zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi = "";
            zakazkyJSON[Object.keys(zakazkyJSON)[i]].value = "";
        };
      }

     document.getElementById("result").innerHTML = "<img class=\"loadingimg\" src=\"files/loading.gif\">";
     document.getElementById("form_insert_button").value = "uložit";
     document.getElementById("form_insert_button").style.background = "grey";


   
     $.ajax({ //načítání sessions k tomuto dni
      type: "POST",
      url: 'actions/index_history_sessions_load.php',
      data: {searchuzivatel : searchuzivatel,
            datum : datum},
  
  success: function(result){



      var splittedresult = result.split("--split--");
      console.log(splittedresult);

      if(splittedresult[0] !== "success"){
          document.getElementById("result").innerHTML = "error";
      }else{


        document.getElementById("form_insert_button").style.background = "";
          document.getElementById("result").innerHTML = result;
          var insertstatus = "historyinsert";
          var historyzakazkyarray = JSON.parse(splittedresult[1]);
          var historytimearray = JSON.parse(splittedresult[2]);
          console.log(historyzakazkyarray);
          console.log(historytimearray);

          for(y = historyzakazkyarray.length -1; y >= 0; y--){
            console.log(y);
            var historyzakazka = historyzakazkyarray[y];
            var historytime = historytimearray[y].substring(0, 5);
            console.log(historyzakazka);
            console.log(historytime);
            
            zakazky_select_add(insertstatus, historyzakazka, historytime);
            //alert(insertstatus + "," + historyzakazka + "," + historytime);
          }
         

          }






      
  },
  
  
  error: function (xhr, ajaxOptions, thrownError) {
      document.getElementById("result").innerHTML = xhr.status + "<br>" + thrownError;

  }
  })




      console.groupEnd()
  }






  function StatusToInsert(){
    console.groupCollapsed("Function: StatusToInsert");

    inserting_status = "insert";

    document.getElementById("form_insert_button").value = "Uložit";

    zakazkypagepocet = 0;
    zakazkyarray.length = 0;


   
    document.getElementById("cas_od").value = "";
    document.getElementById("cas_do").value = "";

   

console.groupEnd();
  }







  function index_status_checker(){
    console.groupCollapsed("Function: index_status_checker");
     if(inserting_status == "insert"){
      index_insert();
     
    }else if(inserting_status == "editing"){
      index_edit();

     }else{
       alert("Error");
     }


    console.groupEnd();
  }







  function index_edit(){
    console.groupCollapsed("Function: index_edit");
    if(insert_status == "good"){ 
    var searchuzivatel;
    if(perms == "admin"){
      searchuzivatel = document.getElementById("uzivatel").value;
    }else if(perms == "user"){
      searchuzivatel = uzivatel_var;
    }
    var casod = document.getElementById("cas_od").value;
    var casdo = document.getElementById("cas_do").value;

    var timeStart = new Date("2021-01-01T" + casod + ":00");
      var timeEnd = new Date("2021-01-01T" + casdo + ":00");
      var milliseconds = ((timeEnd) - (timeStart));
      var seconds = milliseconds / 1000 ;
    var cas_minutes = seconds / 60;
      cas_minutes = parseInt(cas_minutes, 10);
  
      if(cas_minutes >= 360){    
      cas_minutes = cas_minutes - 30;
      }
    var datum = document.getElementById("datum").value;
     
    var sessionsinsert = "";
      for(i = Object.keys(zakazkyJSON).length -1; i >= 0; i--){ 

          if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi !== ""){
            sessionsinsert = sessionsinsert + "('" + Object.keys(zakazkyJSON)[i] + "', '" + zakazkyJSON[Object.keys(zakazkyJSON)[i]].value +"','" + searchuzivatel + "', '" + datum + "'),";

          }

       }
       sessionsinsert = sessionsinsert.slice(0, -1);

       console.log(searchuzivatel);
       console.log(casod);
       console.log(casdo);
       console.log(cas_minutes);
       console.log(datum);
       console.log(sessionsinsert);

  $.ajax({ 
      type: "POST",
      url: 'actions/index_edit.php',
      data: {searchuzivatel : searchuzivatel,
             casod : casod,
             casdo: casdo,
             cas_minutes: cas_minutes,
             datum: datum,
             sessionsinsert: sessionsinsert},
  
  success: function(result){

    var splittedresult = result.split("--split--");
    console.log(splittedresult);
    document.getElementById("ActionStatus").classList = "ActionStatus good";
    document.getElementById("ActionStatus").innerHTML = "<b>Úspěšně Upraveno</b><br>Začátek práce: "+ casod + "<br>Konec práce: " + casdo + "<br>Datum: " + datum;
    LoadHistory();
    
  },
  
  
  error: function (xhr, ajaxOptions, thrownError) {
      document.getElementById("result").innerHTML = xhr.status + "<br>" + thrownError;

  }
  })





      }else{
        document.getElementById("ajax_vysledek").innerHTML = insert_status_text;
      }
    console.groupEnd();
  }

  function fieldDelete(){
   
    console.groupCollapsed("Function: fieldDelete");

    for(i = Object.keys(zakazkyJSON).length -1; i >= 0; i--){   //vymazání všech zakázek z tabulky a zakazkyJSON
      console.log(i);
    if(zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi !== ""){
        console.log("Vymazána zakázka " + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi);
        document.getElementById("zak_" + zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi).remove();
        zakazkyJSON[Object.keys(zakazkyJSON)[i]].poradi = "";
        zakazkyJSON[Object.keys(zakazkyJSON)[i]].value = "";
    };
  }
  zakazky_select_add();
console.groupEnd();
  }

