var loadedUzivatel = "";



function adminLoad(){
  

    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Načítání</div>"  ;

    var month = document.getElementById("bdaymonth").value;
    var uzivatel = document.getElementById("uzivatele_vyber").value;
    loadedUzivatel = uzivatel;


console.log(month);
console.log(uzivatel);

$.ajax({
  type: "POST",
  url: 'actions/dochazka_load_admin.php',
  data: {month: month,
    uzivatel: uzivatel },

success: function(result){
console.log(result);
var splittedresult = result.split("--split--");
console.log(splittedresult);
if(splittedresult[0] == "success"){
  document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\"> úspěšně načteno</div>" ;
  document.getElementById("vystup").innerHTML = splittedresult[2] ;
 

}else if(splittedresult[0] == "error"){ 
  if(splittedresult[1] == "no_vysledky"){
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">0 Výsledků</div>" ;
    document.getElementById("vystup").innerHTML = "" ;

  }else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">"+ splittedresult[0] +"</div>" ;
    
    document.getElementById("vystup").innerHTML = "" ;

  }
}else{
  document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">JS Error</div>" ;
  document.getElementById("vystup").innerHTML = "" ;

}
setTimeout(function(){
  
    document.getElementById("ajax_vysledek").innerHTML = "" ; 
  
  }, 5000);
},
error: function (xhr, ajaxOptions, thrownError) {
alert(xhr.status);
alert(thrownError);
}
});


  }



  function userLoad(){
  

    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Načítání</div>"  ;

    var month = document.getElementById("bdaymonth").value;
   




$.ajax({
  type: "POST",
  url: 'actions/dochazka_load_user.php',
  data: {month: month
     },

success: function(result){

  console.log(result);
  var splittedresult = result.split("--split--");
  console.log(splittedresult);
  if(splittedresult[0] == "success"){
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\"> úspěšně načteno</div>" ;
    document.getElementById("vystup").innerHTML = splittedresult[2] ;
  }else if(splittedresult[0] == "error"){ 
    if(splittedresult[1] == "no_vysledky"){
      document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">0 Výsledků</div>" ;
      document.getElementById("vystup").innerHTML = "" ;
    }else{
      document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">"+ splittedresult[0] +"</div>" ;
      document.getElementById("vystup").innerHTML = "" ;
    }
  }else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">JS Error</div>" ;
    document.getElementById("vystup").innerHTML = "" ;
  }
setTimeout(function(){
  
    document.getElementById("ajax_vysledek").innerHTML = "" ; 
  
  }, 5000);
},
error: function (xhr, ajaxOptions, thrownError) {
alert(xhr.status);
alert(thrownError);
}
});


  }


function dateupdate(clicked_id){
  console.groupCollapsed("dateupdate");

  clicked_id = clicked_id.replace("update_", "");
  console.log(clicked_id);
  console.log(loadedUzivatel);

  
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "index.php");

  var datum = document.createElement("input");
    datum.type = "date";
    datum.value = clicked_id;
    datum.name = "datum";

  var updatestatus = document.createElement("input");
    updatestatus.type = "text";
    updatestatus.value = "updatestatus";
    updatestatus.name = "updatestatus";

  var uzivatel = document.createElement("input");
    uzivatel.type = "text";
    uzivatel.value = loadedUzivatel;
    uzivatel.name = "uzivatel";

  var cas_od = document.createElement("input");
    cas_od.type = "time";
    cas_od.value = document.getElementById("cas_od_" + clicked_id).innerHTML;
    cas_od.name = "cas_od";

  var cas_do = document.createElement("input");
    cas_do.type = "time";
    cas_do.value =  document.getElementById("cas_do_" + clicked_id).innerHTML;
    cas_do.name = "cas_do";

  form.appendChild(datum);
  form.appendChild(uzivatel);
  form.appendChild(updatestatus);
  form.appendChild(cas_od);
  form.appendChild(cas_do);
  document.getElementsByTagName("body")[0].appendChild(form);
  form.submit();

  console.groupEnd();
}