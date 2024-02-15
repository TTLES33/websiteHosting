var nickname = "";
var submitted_cell = "none";
var gamenumber = 0;
var seznamLidi = ["Adam Strážnický","Adam Zárybnický","Barbora Havlíková","Daniel Chmel","Eli Adámková","Emma Vrublová","Eva Knápková","Filip Novotný","Franta Dlouhý","Honza Leikep","Jakub Jasiok","Jakub Ogurek","Jan Grygar","Jitka Zapletalová","Kája Nováková","Kája Šrubařová","Káťa Lacná","Klári Baštinská","Lucie Pasečná","Lukáš Hurník","Marcela Žebráčková","Martin Doležal","Miša Pastorková","Nikol Milíčková","Ondřej Pastorek","Ondřej Tabášek","Radim Gabriel","Taťána Kellnerová","Vendula Filipská","Viola Vojvodíková", "Ten jehož jméno se nesmí vyslovit"];
var hlasovanigridstatus = "";
function showGrid(){
    var griddiv = document.getElementById("griddiv");
     griddiv.innerHTML = "";
     griddiv.style.display = "block";
    var gridtable = document.createElement("table");
        gridtable.className = "gridtable";
    

    var cellnbr = 0;
    for(i=0; i<5; i++){
        var row = gridtable.insertRow(-1);
        for(x=0; x<5; x++){
            
            console.log(cellnbr);
            var cell = row.insertCell(-1);
                cell.id = "gridcell_" + cellnbr;
                cell.onclick = function() { cellsubmit(this.id) };
                cellnbr++;
        }
        
    }
    document.getElementById("loadinggif").style.display = "none";
    griddiv.appendChild(gridtable);

    hlasovaniGrid();
}
function cellsubmit(clicked_id){
    submitted_cell = clicked_id.replace("gridcell_", "");
    document.getElementById(clicked_id).classList.add("selected");
}
function submitNickname(){
    if(document.getElementById("nickanmeinsert").value == ""){
        alert("Error žádné nick");
    }else{
        nickname = document.getElementById("nickanmeinsert").value;
            console.log(nickname);
        

        $.ajax({
            type: "POST",
            url: "http://nolifeserver.space:8181/loginme?nickname=" + nickname + "&game=" + gamenumber,
    
            success: function(result) {
                console.log("success");
                if(result == "gamesarted"){
                    document.getElementById("errormessge").style.display = "block";
                    document.getElementById("errormessge").innerHTML = "prezentace již začala";
                    setTimeout(function(){
                        document.getElementById("errormessge").style.display = "none";
                    }, 1500);
                }
                else if(result == "success"){
                    document.getElementById("nicknameinsert").style.display = "none";  
                    //showGrid();
                    waitforshow();
                }else if(result == "userexst"){
                    document.getElementById("errormessge").style.display = "block";
                    document.getElementById("errormessge").innerHTML = "Nickname už existruje";
                    setTimeout(function(){
                        document.getElementById("errormessge").style.display = "none";
                    }, 1500);
                }
               
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
       
    }
}

function hlasovanishow(numbe){
    console.log("hlasovani1show");
    document.getElementById("loadinggif").style.display = "none";

    var divtoinsert = document.getElementById("hlasdiv");
    divtoinsert.style.display = "block";
    divtoinsert.innerHTML = "";
    for(x=0; x<seznamLidi.length; x++) {
        var hlasdiv = document.createElement("div");
            hlasdiv.innerHTML = seznamLidi[x];
            hlasdiv.id = "hlasdiv_" + x;
            hlasdiv.onclick = function() { hlasovani1post(this.id, numbe) };
         divtoinsert.appendChild(hlasdiv);   
    }
    

    hlasovani(numbe);
}
function hlasovani(){
    $.ajax({
        type: "GET",
        url: "http://nolifeserver.space:8181/hlas",
     
        success: function(result) {
            if(result.status.startsWith("hlas_")){
                setTimeout(hlasovani, 400);
                document.getElementById("time").innerHTML = result.time;
            }else if(result.status == "wait"){
                waitforshow();
                document.getElementById("hlasdiv").style.display = "none";
            }
           
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });  
console.groupEnd();
    
}
function hlasovani1post(clicked_id, numbe){
    var odpoved = clicked_id.replace("hlasdiv_", "");
    var nmbr = numbe.replace("hlas_", "");
    $.ajax({
        type: "POST",
        url: "http://nolifeserver.space:8181/hlasinsert?nmbr=" + nmbr + "&nick=" + nickname + "&odpoved=" + odpoved,

        success: function(result) {
            document.getElementById("hlasdiv").style.display = "none";
            document.getElementById("loadinggif").style.display = "block";
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

}
function waitforshow(){
    document.getElementById("loadinggif").style.display = "block";
    function swhile(){
        console.log("swhile");
        var statusresult;
        console.log("idfy");
        $.ajax({
            type: "GET",
            url: "http://nolifeserver.space:8181/ppstatus",
    
            success: function(result) {
                console.log(result);
                statusresult = result;
                console.log(statusresult);
                if(statusresult == "wait"){
                    console.log("znovu");
                    setTimeout(swhile, 500);
                }else if(statusresult == "hlas_1"){
                    hlasovanishow("hlas_1");
                }
                else if(statusresult == "hlas_2"){
                    hlasovanishow("hlas_2");
                }
                else if(statusresult == "hlas_3"){
                    hlasovanishow("hlas_3");
                }
                else if(statusresult == "hlas_4"){
                    hlasovanishow("hlas_4");
                }
                else if(statusresult == "hlas_5"){
                    hlasovanishow("hlas_5");
                }
                else if(statusresult == "hlas_6" || statusresult == "hlas_7" || statusresult == "hlas_8" || statusresult == "hlas_9"){
                    hlasovanigridstatus = "hlas";
                    showGrid()
                }
 
               
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

    }

    swhile();
}

function contactserver(type){
    $.ajax({
        type: "POST",
        url: "http://nolifeserver.space:8181/changestatus?type=" + type,

        success: function(result) {
            console.log("success");

           
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}


function hlasovaniGrid(){
    console.group("Function: hlasovaniGrid");
    if(hlasovanigridstatus != "wait"){ 
    
     $.ajax({
        type: "POST",
        url: "http://nolifeserver.space:8181/userset?positition=" + submitted_cell +"&nickname=" + nickname + "&game=" + gamenumber,
     
        success: function(result) {
           var resultedjson = result;
           if(gamenumber != resultedjson.hlasovaninmbr){
            submitted_cell = "none";
            for(i=0; i<25; i++){
                document.getElementById("gridcell_"+i).innerHTML = "";
                gamenumber = resultedjson.hlasovaninmbr;
                document.getElementById("gridcell_"+i).className = "";
            }
           }
            document.getElementById("time").innerHTML = resultedjson.time;
            for(i=0; i<25; i++){
                if(resultedjson.activeTiles.some(e => e == i)){
                    document.getElementById("gridcell_"+i).classList.add("inactive");
                }
                for(x=0; x < resultedjson.hlasovani.length; x++){
                    if(resultedjson.hlasovani[x].pos == i){
                        document.getElementById("gridcell_"+i).innerHTML = resultedjson.hlasovani[x].value;
                    }
                }
            }

           hlasovanigridstatus = resultedjson.hlasovanistatus;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });  
console.groupEnd();
    setTimeout(hlasovaniGrid, 200);
    }else{
       
                document.getElementById("griddiv").style.display = "none";
                waitforshow();
    }
}

function ppwhile(){
    $.ajax({
        type: "GET",
        url: "http://nolifeserver.space:8181/ppdowhile",

        success: function(result) {
            console.log("success");

           
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

}

function requsers(){
    $.ajax({
        type: "GET",
        url: "http://nolifeserver.space:8181/requsers",
     
        success: function(result) {
            document.getElementById("users").innerHTML = "";
            result = JSON.parse(result);
            for(i=0; i<result.length; i++){
                var user = document.createElement("div");
                user.innerHTML = result[i];

                var plus = document.createElement("input");
                    plus.type = "button";
                    plus.value = "+";
                    plus.id = "plus_" + i;
                    plus.onclick = function() { pointsadd(this.id) };
                var minus = document.createElement("input");
                    minus.type = "button";
                    minus.value = "-";
                    minus.id = "minus_" + i;
                    minus.onclick = function() { pointsremove(this.id) };
                user.appendChild(plus);
                user.appendChild(minus);
                document.getElementById("users").appendChild(user);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });  
}

function pointsadd(clicked_id){
    var idbttn = clicked_id.replace("plus_", "");
    $.ajax({
        type: "POST",
        url: "http://nolifeserver.space:8181/pointsadd?idbttn=" + idbttn,
     
        success: function(result) {
            console.log("success")
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });  
}
function pointsremove(clicked_id){
    var idbttn = clicked_id.replace("minus_", "");
    $.ajax({
        type: "POST",
        url: "http://nolifeserver.space:8181/pointsremove?idbttn=" + idbttn,
     
        success: function(result) {
            console.log("success")
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });  
}