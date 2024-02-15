function checkpasswd(){
    if(document.getElementById("uzivatele_vyber_login").value == "none"){
        document.getElementById("status").className = "status_error";
        document.getElementById("status").innerHTML = "Vyberte uživatele";
    }else{ 
        var uzivatel_id = document.getElementById("uzivatele_vyber_login").value;
        var passwd = document.getElementById("input_passwd").value;
    
    document.getElementById("login_submit").innerHTML = "<img class=\"loadingimg\" src=\"../files/loading.gif\">";
        document.getElementById("status").className = "";
        document.getElementById("status").innerHTML = "";
        
        $.ajax({
            type: "POST",
            url: 'logincheck.php',
            data: {uzivatel_id: uzivatel_id,
                    passwd: passwd},
        
        success: function(result){
            console.log(result);
            document.getElementById("login_submit").innerHTML = "Přihlásit Se";
            if(result == "success"){
                document.getElementById("status").className = "status_success";
                document.getElementById("status").innerHTML = "<b>Úspěšně Přihlášen </b><br> Přesměrovávání...";
                window.location.replace("../" + page + ".php");
            }else if(result == "error"){
                document.getElementById("status").className = "status_error";
                document.getElementById("status").innerHTML = "Špatné Heslo";
            }else{
                document.getElementById("status").className = "status_error";
                document.getElementById("status").innerHTML = "Error: <br>" + result;
            }
        
        },
        
        
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
        })
}
}