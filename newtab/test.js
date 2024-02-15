
//Nastavení random pozadí
    var random_background = Math.floor(Math.random() * 7);
        document.getElementById("body").className = document.getElementById("body").className + " bac" + random_background;
        console.log("bac" + random_background);




startTime();
crypto();


//Hodiny
function startTime() {
    const today = new Date();
    var hod = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    if(hod < 10){
        hod = "0" + hod;
    }
    if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }

    var day = today.getDate();
    var day_poradi = today.getDay();
    var daynames = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    var day_name = daynames[day_poradi];
    var mon = today.getMonth() + 1;
    var yer = today.getFullYear();

    document.getElementById('date').innerHTML = day_name + " " + day + "." + mon + "." + yer;
    document.getElementById('hod').innerHTML = hod;
    document.getElementById('min').innerHTML = min;
    document.getElementById('sec').innerHTML = sec;
    setTimeout(startTime, 1000);
  }

//search 
  function searchredirect(){
    var selectedengine = document.getElementById("searchengine").value;
    var search = document.getElementById("searchbar").value;
    window.location.href = "http://ttles.eu/newtab/redirect.php?engine=" + selectedengine + "&query=" + search;
  }
  
  function search(){
    var engine = document.getElementById("searchengine").value;
    var query = document.getElementById("searchbar").value;
   // document.getElementById("log").innerHTML += "<br>[JS] Loaded Variables";
    var searchenginesJSON = {
        "google":{"location": "https://www.google.com/search?q="},
        "duckduckgo":{"location": "https://duckduckgo.com/?q="},
        "seznam":{"location": "https://search.seznam.cz/?q="},
        "brave":{"location": "https://search.brave.com/search?q="}
        };
   
        console.log(searchenginesJSON);
        var path = searchenginesJSON[engine].location + query;
        //document.getElementById("log").innerHTML += "<br>[Redirect Path] " +path;
       //document.getElementById("log").innerHTML += "<br>Redirecting...";

        //window.location.href = path;
    window.open(path);
    setTimeout(window.close, 10);  
  }
  
    var cryptos = {
        "etherium":{},
        "dogecoin":{},
        "litecoin":{},
        "bitcoin":{},
        "monero":{}
    };



function crypto(){
    //get Etherium
    $.ajax({
        type: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/ethereum?market_data=true',
  
    
        success: function (result) {
          console.log("success");
        
            cryptos.etherium.priceusd = result.market_data.current_price.usd;
            cryptos.etherium.priceczk = result.market_data.current_price.czk;
            cryptos.etherium.change = result.market_data.price_change_percentage_24h;
            cryptos.etherium.name = "ETH";

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status);
            console.error(thrownError);
        }
      });


      //get DOGE
      $.ajax({
        type: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/dogecoin?market_data=true',
  
    
        success: function (result) {
          console.log("success");
          //result = JSON.parse(result);
            cryptos.dogecoin.priceusd = result.market_data.current_price.usd;
            cryptos.dogecoin.priceczk = result.market_data.current_price.czk;
            cryptos.dogecoin.change = result.market_data.price_change_percentage_24h;
            cryptos.dogecoin.name = "DOGE";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status);
            console.error(thrownError);
        }
      });


      //GET LITECOIN
      $.ajax({
        type: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/litecoin?market_data=true',
  
    
        success: function (result) {
          console.log("success");
          //result = JSON.parse(result);
            cryptos.litecoin.priceusd = result.market_data.current_price.usd;
            cryptos.litecoin.priceczk = result.market_data.current_price.czk;
            cryptos.litecoin.change = result.market_data.price_change_percentage_24h;
            cryptos.litecoin.name = "LTC";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status);
            console.error(thrownError);
        }
      });


      //GET BITCOIN
      $.ajax({
        type: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true',
  
    
        success: function (result) {
          console.log("success");
          //result = JSON.parse(result);
            cryptos.bitcoin.priceusd = result.market_data.current_price.usd;
            cryptos.bitcoin.priceczk = result.market_data.current_price.czk;
            cryptos.bitcoin.change = result.market_data.price_change_percentage_24h;
            cryptos.bitcoin.name = "BTC";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status);
            console.error(thrownError);
        }
      });


      //GET MONERO
      $.ajax({
        type: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/monero?market_data=true',
  
    
        success: function (result) {
          console.log("success");
          //result = JSON.parse(result);
            cryptos.monero.priceusd = result.market_data.current_price.usd;
            cryptos.monero.priceczk = result.market_data.current_price.czk;
            cryptos.monero.change = result.market_data.price_change_percentage_24h;
            cryptos.monero.name = "XMR";

            

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status);
            console.error(thrownError);
        }
      });
     
     

   
}

controlcrypto();

function controlcrypto(){
    console.log("controlcrypto");

    if(cryptos.etherium.name){
        crypto_change();
    }else{  

        setTimeout(controlcrypto, 1000);
}
}

var displayedporadi = 0;


function crypto_change(){ 
    console.log("crypto_change");

  document.getElementById("crypto").innerHTML = "<div class=\"crypto_name\">" 
  + "<img class=\"cryptoimg\" src=\"img/" + cryptos[Object.keys(cryptos)[displayedporadi]].name + ".png\">"
  + cryptos[Object.keys(cryptos)[displayedporadi]].name 
  +"</div>";
  document.getElementById("crypto").innerHTML = document.getElementById("crypto").innerHTML + " " + cryptos[Object.keys(cryptos)[displayedporadi]].priceusd + "$";

  var change_status = "";
  if(cryptos[Object.keys(cryptos)[displayedporadi]].change >= 0){
      change_status = "priceup";
  }else{
      change_status = "pricedown"; 
  }

  document.getElementById("crypto").innerHTML = document.getElementById("crypto").innerHTML + " <div class=" + change_status + ">" + cryptos[Object.keys(cryptos)[displayedporadi]].change.toFixed(2) + "</div>%";
  displayedporadi++;
  if(displayedporadi > 4){
      displayedporadi = 0;
  }

  setTimeout(function(){ crypto_change(); }, 3000);
}
  

getWeather();
function getWeather(){
  //api.openweathermap.org/data/2.5/weather?q=Stara%20Bela&appid=f9e4dd984949ce11db09b026d6750d5f&units=metric


  $.ajax({
    type: "GET",
    url: 'https://api.openweathermap.org/data/2.5/weather?q=Stara%20Bela&appid=f9e4dd984949ce11db09b026d6750d5f&units=metric',


    success: function (result) {
      console.log("success");
      //result = JSON.parse(result);
console.log(result);
      var weatherjson = result;
     
      temptext = weatherjson.name;
      temptext = temptext + " <div class=\"temprature\">";
      temptext = temptext + weatherjson.main.temp;
      temptext = temptext + "°c </div> ";

      var element = document.getElementById("weather");
      element.innerHTML = temptext;
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.error(xhr.status);
        console.error(thrownError);
    }
  });

}




    var bazarwindow0 ;
    var bazarwindow1 ;
    var bazarwindow2 ;
    var bazarwindow3 ;
    var bazarwindow4;
    var bazarwindow5;
    var bazarwindow6;
    var bazarwindow7;
    var bazarwindow8;
    var bazarwindow9;
    var bazarwindow10;
    var bazarwindow11;


function bazaropen(){
    var urls = ["https://www.bazos.cz/search.php?hledat=G29&hlokalita=&humkreis=25&cenaod=&cenado=&order=1",
    "https://www.bazos.cz/search.php?hledat=t150&hlokalita=&humkreis=25&cenaod=&cenado=&order=1",
    "https://www.bazos.cz/search.php?hledat=tmx&hlokalita=&humkreis=25&cenaod=&cenado=&order=1",
    "https://aukro.cz/vysledky-vyhledavani?levne=true&text=g29&categoryId=100732",
    "https://aukro.cz/vysledky-vyhledavani?levne=true&text=T150&categoryId=100732",
    "https://aukro.cz/vysledky-vyhledavani?levne=true&text=TMX&categoryId=100732",
    "https://www.sbazar.cz/hledej/g29/0-vsechny-kategorie/cela-cr/cena-od-1000-kc/nejlevnejsi",
    "https://www.sbazar.cz/hledej/t150/0-vsechny-kategorie/cela-cr/cena-od-1000-kc/nejlevnejsi",
    "https://www.sbazar.cz/hledej/tmx/0-vsechny-kategorie/cela-cr/cena-od-1000-kc/nejlevnejsi",
    "https://www.facebook.com/marketplace/115991601744422/search?sortBy=price_ascend&query=g29&exact=false",
    "https://www.facebook.com/marketplace/115991601744422/search?sortBy=price_ascend&query=t150&exact=false",
    "https://www.facebook.com/marketplace/115991601744422/search?sortBy=price_ascend&query=tmx&exact=false"];

     bazarwindow0 = window.open(urls[0]);
     bazarwindow1 = window.open(urls[1]);
     bazarwindow2 = window.open(urls[2]);
     bazarwindow3 = window.open(urls[3]);
     bazarwindow4 = window.open(urls[4]);
     bazarwindow5 = window.open(urls[5]);
     bazarwindow6 = window.open(urls[6]);
     bazarwindow7 = window.open(urls[7]);
     bazarwindow8 = window.open(urls[8]);
     bazarwindow9 = window.open(urls[9]);
     bazarwindow10 = window.open(urls[10]);
     bazarwindow11 = window.open(urls[11]);

     var closebttn = document.createElement("div")
        closebttn.innerHTML = "x";
        closebttn.className = "closebazarbttn";
        closebttn.onclick = function() { bazarclose() };
        closebttn.id = "closebazarbtn";
    document.getElementById("bazar").appendChild(closebttn);
}

function bazarclose(){

     bazarwindow0.close();
     bazarwindow1.close();
     bazarwindow2.close();
     bazarwindow3.close();
     bazarwindow4.close();
     bazarwindow5.close();
     bazarwindow6.close();
     bazarwindow7.close();
     bazarwindow8.close();
     console.log(bazarwindow9);
     bazarwindow9.close();
     bazarwindow10.close();
     bazarwindow11.close();
     document.getElementById("closebazarbtn").remove();
}