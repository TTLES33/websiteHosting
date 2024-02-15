
function vykpraceAdmin(){
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Načítání</div>"  ;
var uzivatel = document.getElementById("uzivatele_vyber").value;
var datum = document.getElementById("bdaymonth").value;


    $.ajax({
        type: "POST",
        url: 'actions/vyk-prace-admin.php',
        data: {uzivatel: uzivatel, 
            datum: datum

        },
  



        
  success: function(result){

    var name = "ajax_vyk_prace_load";
ajax_status = getCookie(name);
var name = "ajax_error_code";
ajax_error = getCookie(name);
console.log(ajax_status);


if (ajax_status == "good"){
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\">Úspěšně načteno</div>" ; 
    document.getElementById("vystup").innerHTML = result ;
    $('#vykpracetable').DataTable({
        "paging": false,
        "searching": false,
        "bInfo" : false
    });

}else if(ajax_status == "error"){
    if(ajax_error == "no_vysledky"){
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">0 Výsledků</div>" ; 
    }else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">" + ajax_error + "</div>" ; 
    }
}else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">Error</div>" ; 
}
  
    
    setTimeout(function(){
        
          document.getElementById("ajax_vysledek").innerHTML = "" ; 
        
        }, 5000);
  
  },
  
  
  error: function (xhr, ajaxOptions, thrownError) {
    alert(xhr.status);
    alert(thrownError);
  }
  })


}
function vykpraceUser(){

    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Načítání</div>"  ;
    var datum = document.getElementById("bdaymonth").value;
    
    
        $.ajax({
            type: "POST",
            url: 'actions/vyk-prace-user.php',
            data: {uzivatel: uzivatel, 
                datum: datum
    
            },
      
      success: function(result){
      
        document.getElementById("vystup").innerHTML = result ;

var name = "ajax_vyk_prace_load";
ajax_status = getCookie(name);
var name = "ajax_error_code";
ajax_error = getCookie(name);
console.log(ajax_status);


if (ajax_status == "good"){
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\">Úspěšně načteno</div>" ; 

}else if(ajax_status == "error"){
    if(ajax_error == "no_vysledky"){
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">0 Výsledků</div>" ; 
    }else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">" + ajax_error + "</div>" ; 
}

}else{
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">Error</div>" ; 
}

       
        setTimeout(function(){
           
              document.getElementById("ajax_vysledek").innerHTML = "" ; 
            
            }, 5000);
      
      },
      
      
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
      })
    
    
    }