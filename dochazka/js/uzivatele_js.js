
    function updatejs(clicked_id){
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>"  ;
       
        var button_id = clicked_id.replace("uzi_name_", "");
        button_id = parseInt(button_id, 10);
        console.log(button_id);
        
        var uzi_id = uzivatele_array[button_id];
        console.log(uzi_id);
        var uzivatele_titul = document.getElementById("input_uzi_titul_" + button_id).value;
        console.log(uzivatele_titul);
        var uzivatele_jmeno = document.getElementById("input_uzi_jmeno_" + button_id).value;
        console.log(uzivatele_jmeno);
        var uzivatele_prijmeni = document.getElementById("input_uzi_prijmeni_" + button_id).value;
        console.log(uzivatele_prijmeni);
        var uzivatele_titul_za = document.getElementById("input_uzi_titul_za_" + button_id).value;
        console.log(uzivatele_titul_za);
        var uzivatele_heslo = document.getElementById("input_uzi_heslo_" + button_id).value;
        console.log(uzivatele_heslo);
        var uzivatele_perms = document.getElementById("input_uzi_perms_" + button_id).value;
        console.log(uzivatele_perms);

  
        
        $.ajax({
            type: "POST",
            url: 'actions/uzivatele_update.php',
            data: {uzi_id: uzi_id, 
                uzivatele_titul: uzivatele_titul,
                uzivatele_jmeno: uzivatele_jmeno,
                uzivatele_prijmeni: uzivatele_prijmeni,
                uzivatele_titul_za: uzivatele_titul_za,
                uzivatele_heslo: uzivatele_heslo,
                uzivatele_perms: uzivatele_perms
                },
   
    success: function(result){
       console.log("success");
       console.log(result);
        document.getElementById("ajax_vysledek").innerHTML = result  ;
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
  
    function deletejs(clicked_id){
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Odstraňování</div>"  ;
  
        var button_id = clicked_id.replace("uzi_delete_", "");
        button_id = parseInt(button_id, 10);
       
        var uzi_id = uzivatele_array[button_id];

       
       
  
  
        $.ajax({
            type: "POST",
            url: 'actions/uzivatele_delete.php',
            data: {uzi_id: uzi_id   },
   
    success: function(result){
   
       var name = "ajax_uzivatele_delete";
       ajax_status = getCookie(name);
       console.log(ajax_status);
   
  
        document.getElementById("ajax_vysledek").innerHTML = result ;
        if (ajax_status == "success"){
              
           document.getElementById("tr_" + button_id).innerHTML ="" ;
        }else{
          
        
  
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
  
    function insertjs(clicked_id){
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>"  ;
     
        var uzivatele_titul = document.getElementById("input_uzi_vlozeni_titul").value;
        console.log(uzivatele_titul);
        var uzivatele_jmeno = document.getElementById("input_uzi_vlozeni_name").value;
        console.log(uzivatele_jmeno);
        var uzivatele_prijmeni = document.getElementById("input_uzi_vlozeni_prijmeni").value;
        console.log(uzivatele_prijmeni);
        var uzivatele_titul_za = document.getElementById("input_uzi_vlozeni_titul_za").value;
        console.log(uzivatele_titul_za);
        var uzivatele_heslo = document.getElementById("input_uzi_vlozeni_heslo").value;
        console.log(uzivatele_heslo);
        var uzivatele_perms = document.getElementById("input_uzi_vlozeni_perms").value;
        console.log(uzivatele_perms);
        var tbody = document.getElementById("uzivatele_tbody").innerHTML;
        console.log(tbody);
        var top = document.getElementById("uzivatele_top").innerHTML;
        top = "<tr id=\"uzivatele_top\" class=\"dochazka_tr\">" + top + "</tr>"; 
  
        $.ajax({
            type: "POST",
            url: 'actions/uzivatele_insert.php',
            data: {uzivatele_titul: uzivatele_titul,
              uzivatele_jmeno: uzivatele_jmeno,
              uzivatele_prijmeni: uzivatele_prijmeni,
              uzivatele_titul_za: uzivatele_titul_za,
              uzivatele_heslo: uzivatele_heslo,
              uzivatele_perms: uzivatele_perms
               },
   
    success: function(result){
      
   
  
        document.getElementById("ajax_vysledek").innerHTML = result ;
      
        var name = "ajax_uzivatele_insert";
        var ajax_status = getCookie(name);
       console.log(ajax_status);
     
        if (ajax_status == "success"){
          var insertHTML = "<tr id=\"tr_1\"> <td class=\"dochazka_td\">" + uzivatele_titul + "</td><td class=\"dochazka_td\">" + uzivatele_jmeno + "</td><td class=\"dochazka_td\">" + uzivatele_prijmeni + "</td><td class=\"dochazka_td\">" + uzivatele_titul_za + "</td><td class=\"dochazka_td\"> " + uzivatele_heslo + "</td><td class=\"dochazka_td\"> " + uzivatele_perms + "</td><td class=\"dochazka_td\">     <input type=\"submit\"  onclick=\"update_zak()\" value=\"Obnovit Pro Úpravu\"></td></tr>";
           tbody = tbody.replace(top, ""); 
          
              console.log(top);
              console.log(tbody);
              console.log(insertHTML);
              document.getElementById("uzivatele_tbody").innerHTML = top + insertHTML + tbody  ;
           }else{
             
           
   
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
   
  
    function update_zak(){
  
      window.location.reload(); 
      
    }
  
  
    
  
  