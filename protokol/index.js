var adresa;
var coords;
var kraj;
var financni_kod;
var marker_size = '25';
var khs_jmeno = "indefined";
var khs_adresa = "undefined";
var khs_id = "undefined";
var khs_psc = "undefinec";
var mista_zprava = "";
var selected_khs;
var rekonf_string1 = "";
var rekonf_string2 = "";
var active_pasma_string = "";
var active_pasma_novinst_string = "";
var filename1;
var khs = [
    {
     "kraj": "Praha",
     "khs_id": "zpqai2i",
     "Identifikační číslo subjektu": 71009256,
     "khs_name": "Hygienická stanice hlavního města Prahy se sídlem v Praze",
     "khs_obec": "Praha 1",
     "khs_ulice": "Rytířská",
     "khs_cislo_orientacni": 12,
     "khs_cislo_popisne": 404,
     "khs_psc": 11000,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Jihočeský",
     "khs_id": "agzai3c",
     "Identifikační číslo subjektu": 71009345,
     "khs_name": "Krajská hygienická stanice Jihočeského kraje se sídlem v Českých Budějovicích",
     "khs_obec": "České Budějovice",
     "khs_ulice": "Na Sadech",
     "khs_cislo_orientacni": 25,
     "khs_cislo_popisne": 1858,
     "khs_psc": 37001,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Královehradecký",
     "khs_id": "dm5ai4r",
     "Identifikační číslo subjektu": 71009213,
     "khs_name": "Krajská hygienická stanice Královéhradeckého kraje se sídlem v Hradci Králové",
     "khs_obec": "Hradec Králové",
     "khs_ulice": "Habrmanova",
     "khs_cislo_orientacni": 1,
     "khs_cislo_popisne": 19,
     "khs_psc": 50002,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Středočeský",
     "khs_id": "hhcai8e",
     "Identifikační číslo subjektu": 71009159,
     "khs_name": "Krajská hygienická stanice Středočeského kraje se sídlem v Praze",
     "khs_obec": "Praha 2",
     "khs_ulice": "Dittrichova",
     "khs_cislo_orientacni": 17,
     "khs_cislo_popisne": 329,
     "khs_psc": 12000,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Jihomoravský",
     "khs_id": "jaaai36",
     "Identifikační číslo subjektu": 71009191,
     "khs_name": "Krajská hygienická stanice Jihomoravského kraje se sídlem v Brně",
     "khs_obec": "Brno",
     "khs_ulice": "Jeřábkova",
     "khs_cislo_orientacni": 4,
     "khs_cislo_popisne": 1847,
     "khs_psc": 60200,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Liberecký",
     "khs_id": "nfeai4j",
     "Identifikační číslo subjektu": 71009302,
     "khs_name": "Krajská hygienická stanice Libereckého kraje se sídlem v Liberci",
     "khs_obec": "Liberec",
     "khs_ulice": "Husova",
     "khs_cislo_orientacni": 64,
     "khs_cislo_popisne": 186,
     "khs_psc": 46005,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Plzeňský",
     "khs_id": "samai8a",
     "Identifikační číslo subjektu": 71009299,
     "khs_name": "Krajská hygienická stanice Plzeňského kraje se sídlem v Plzni",
     "khs_obec": "Plzeň",
     "khs_ulice": "Skrétova",
     "khs_cislo_orientacni": 15,
     "khs_cislo_popisne": 1188,
     "khs_psc": 30100,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Kralovarský",
     "khs_id": "t3jai32",
     "Identifikační číslo subjektu": 71009281,
     "khs_name": "Krajská hygienická stanice Karlovarského kraje se sídlem v Karlových Varech",
     "khs_obec": "Karlovy Vary",
     "khs_ulice": "Závodní",
     "khs_cislo_orientacni": 94,
     "khs_cislo_popisne": 360,
     "khs_psc": 36006,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Moravskoslezský",
     "khs_id": "w8pai4f",
     "Identifikační číslo subjektu": 71009167,
     "khs_name": "Krajská hygienická stanice Moravskoslezského kraje se sídlem v Ostravě",
     "khs_obec": "Ostrava",
     "khs_ulice": "Na Bělidle",
     "khs_cislo_orientacni": 7,
     "khs_cislo_popisne": 724,
     "khs_psc": 70200,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Zlínský",
     "khs_id": "xwsai7r",
     "Identifikační číslo subjektu": 71009221,
     "khs_name": "Krajská hygienická stanice Zlínského kraje se sídlem ve Zlíně",
     "khs_obec": "Zlín",
     "khs_ulice": "Havlíčkovo nábřeží",
     "khs_cislo_popisne": 600,
     "khs_psc": 76001,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Pardubický",
     "khs_id": "23wai86",
     "Identifikační číslo subjektu": 71009264,
     "khs_name": "Krajská hygienická stanice Pardubického kraje se sídlem v Pardubicích",
     "khs_obec": "Pardubice",
     "khs_ulice": "Mezi Mosty",
     "khs_cislo_popisne": 1793,
     "khs_psc": 53003,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Vysočina",
     "khs_id": "4uuai3w",
     "Identifikační číslo subjektu": 71009311,
     "khs_name": "Krajská hygienická stanice kraje Vysočina se sídlem v Jihlavě",
     "khs_obec": "Jihlava",
     "khs_ulice": "Tolstého",
     "khs_cislo_orientacni": 15,
     "khs_cislo_popisne": 1914,
     "khs_psc": 58601,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Olomoucký",
     "khs_id": "7zyai4b",
     "Identifikační číslo subjektu": 71009248,
     "khs_name": "Krajská hygienická stanice Olomouckého kraje se sídlem v Olomouci",
     "khs_obec": "Olomouc",
     "khs_ulice": "Wolkerova",
     "khs_cislo_orientacni": 6,
     "khs_cislo_popisne": 74,
     "khs_psc": 77900,
     "Sídlo - Stát": "CZ"
    },
    {
     "kraj": "Ústecký",
     "khs_id": "8p3ai7n",
     "Identifikační číslo subjektu": 71009183,
     "khs_name": "Krajská hygienická stanice Ústeckého kraje se sídlem v Ústí nad Labem",
     "khs_obec": "Ústí nad Labem",
     "khs_ulice": "Moskevská",
     "khs_cislo_orientacni": 15,
     "khs_cislo_popisne": 1531,
     "khs_psc": 40001,
     "Sídlo - Stát": "CZ"
    }
   ];
function generatedoc(status) {
    document.getElementById('loadingdiv').style.display = 'block';
    document.getElementById('loadingmessage').innerHTML = "Generování mapy";
    if(status == 0){
        screenshot();   
    }else if(status == 1){

    

    PizZipUtils.getBinaryContent("document.docx",
        function (error, content) {
            if (error) {
                throw error;
            }



                     //načtení mapy pro vložení
            var canvas = document.getElementsByTagName('canvas')[0];
                console.log(canvas);
            var img = canvas.toDataURL('image/png');
                console.log(img);

                     

            var opts = {}
            opts.centered = false;
            opts.getImage = function (tagValue, tagName) {
              return new Promise(function (resolve, reject) {
                JSZipUtils.getBinaryContent(tagValue, function (error, content) {
                  if (error) {
                    return reject(error);
                  }
                  return resolve(content);
                });
              });
            }
            opts.getSize = function (img, tagValue, tagName) {
              return [canvas.offsetWidth, canvas.offsetHeight];
            }


            var imageModule = new ImageModule(opts);
            var zip = new PizZip(content);
            var doc = new window.docxtemplater().loadZip(zip).attachModule(imageModule).compile();







            var value1;
            var value2;
            var value3;
            var value4;
            var value5;

            document.getElementById('loadingmessage').innerHTML = "Generování údajů";
            //základní udaje
            var cislo_dokumentu = document.getElementById("cislo_dokumentu").value;
                console.log(cislo_dokumentu);
            var datum_mereni = new Date(document.getElementById("datum_mereni").value);
                datum_mereni = datum_mereni.getDate() + "." + (datum_mereni.getMonth() + 1) + "." + datum_mereni.getFullYear();
                console.log(datum_mereni);
            var cas_mereni = document.getElementById("cas_mereni").value + " - " + document.getElementById("cas_mereni_do").value;
            var zkratka = document.getElementById("zkratka").value;
            var podminky = document.getElementById("podminky").value;
            var meril = document.querySelector('input[name="meril"]:checked').value;
            var rekonf = document.querySelector('input[name="rekonf"]:checked').value;
             rekonf_string1 = "";
             rekonf_string2 = "";
            if(rekonf == 1){
                rekonf_string1 = "rekonfiguraci";
                rekonf_string2 = "výstavbě nové";
            }else{
                rekonf_string1 = "Rekonfigurace";
                rekonf_string2 = "Výstavba nové";
            }

            if(meril == 1){
                value1 = "Ing. Tomáš Grygar";
                value2 = "P-0318";
                value3 = "0297";
                value4 = "29.6.2022";
                value5 = "ing. Tomáš Grygar, tel. 602 600 958, email: tomas.grygar@cetin.cz";

    
            }else if(meril == 2){
                value1 = "Marek Kaczor";
                value2 = "R-0236";
                value3 = "0571";
                value4 = "11.5.2021";
                value5 = "Marek Kaczor";
            }
           
            //vytvoření věty pro pásma
            var active_pasma = [];
            var active_pasma_novinst = [];
            var operatori = [false, false, false];
            var operatori_names = ["O2 Czech Republic a.s.", "T-Mobile Czech Republic a.s.", "Nordic Telecom s.r.o."] ;
            var pasma = [420, 900, 700, 800, 1800, 2100, 2600, 3700];
            var vyslednazprava = "Na základnové stanici jsou instalovány systémy "
            var vyslednazprava_VF = "V blízkosti (do 30m) anténního systému CETIN jsou i anténní systémy operátora Vodafone s instalovanými systémy ";
            var lte_or_nr = [];
            var VF_lte_or_nr = [];
            for(var i = 0; i < pasma.length; i++){
                var chck_O2 = document.getElementById(pasma[i] + "_O2").checked;
                var chck_TM = document.getElementById(pasma[i] + "_TM").checked;
                var chck_VF = document.getElementById(pasma[i] + "_VF").checked;
                var chck_NT = document.getElementById(pasma[i] + "_NT").checked;
                if(document.getElementById(pasma[i] + "_NovInst").checked){
                    active_pasma_novinst.push(pasma[i]);
                }
                if(chck_O2 == true || chck_TM == true || chck_NT == true){
                    console.log("true pro " + pasma[i]);
                    active_pasma.push(pasma[i]);
                    if(chck_O2 == true){
                        operatori[0] = true;
                        console.log("O2: " + chck_O2);
                    }
                    if(chck_TM == true){
                        operatori[1] = true;
                        console.log("TM: " + chck_TM);
                    }
                    if(chck_NT == true){
                        operatori[2] = true;
                        console.log("NT: " + chck_NT);
                    }


                    if(pasma[i] == 420){
                        vyslednazprava  = vyslednazprava + "ve frekvenčním pásmu 420-450MHz, ";
                    }
                    if(pasma[i] == 900){
                        vyslednazprava = vyslednazprava + "GSM ve frekvenčním pásmu 900MHz, ";
                    }
                    if( pasma[i] == 700 || pasma[i] == 800 || pasma[i] >= 1800){
                        lte_or_nr.push(pasma[i]);
                    }
                }
                if(chck_VF == true){
                    console.log("true vf pro " + pasma[i]);
                       
                        if(pasma[i] == 420){
                            vyslednazprava_VF  = vyslednazprava_VF + "ve frekvenčním pásmu 420-450MHz, ";
                        }
                        if(pasma[i] == 900){
                            vyslednazprava_VF = vyslednazprava_VF + "GSM ve vrekvenčním pásmu 900MHz, ";
                        }
                        if( pasma[i] == 700 || pasma[i] == 800 || pasma[i] >= 1800){
                            VF_lte_or_nr.push(pasma[i]);
                        }
            
                }
            }


            if(lte_or_nr.length > 0){
                if(lte_or_nr.length > 1){
                    vyslednazprava = vyslednazprava + "LTE(NR) ve frekvenčních pásmech ";
                    for(i = 0; i < lte_or_nr.length; i++){
                        vyslednazprava = vyslednazprava + lte_or_nr[i] + ", ";
                    }
                    vyslednazprava = vyslednazprava.slice(0, -2);
                    vyslednazprava = vyslednazprava + " MHz.";
                }else{
                    vyslednazprava = vyslednazprava + "LTE(NR) ve frekvenčním pásmu " + lte_or_nr[0] + " MHz."
                }
            }else{
                vyslednazprava = vyslednazprava.slice(0, -1);
                vyslednazprava = vyslednazprava + ".";
            }
            console.log("vf lte:" + VF_lte_or_nr);
            if(VF_lte_or_nr.length > 0){
                if(VF_lte_or_nr.length > 1){
                    vyslednazprava_VF = vyslednazprava_VF + "LTE(NR) ve frekvenčních pásmech ";
                    for(i = 0; i < VF_lte_or_nr.length; i++){
                        vyslednazprava_VF = vyslednazprava_VF + VF_lte_or_nr[i] + ", ";
                    }
                    vyslednazprava_VF.slice(0, -2);
                    vyslednazprava_VF = vyslednazprava_VF + " MHz.";
                }else{
                    vyslednazprava_VF = vyslednazprava_VF + "LTE(NR) ve frekvenčním pásmu " + VF_lte_or_nr[0] + " MHz."
                }
            }else{
                vyslednazprava_VF = vyslednazprava_VF.slice(0, -1);
                vyslednazprava_VF = vyslednazprava_VF + ".";
            }

            vyslednazprava = vyslednazprava + "Systémy jsou provozovány společností CETIN a.s. a je přes ně šířen signál ";

            var pocetoperatoru = 0;
            var operatori_string = "";
            console.log(operatori);
            for(i = 0; i < operatori.length; i++){
                if(operatori[i] == true){
                    pocetoperatoru++;
                    console.log("operatori true");
                    operatori_string = operatori_string + operatori_names[i] + ", ";
                }
            }

            if(pocetoperatoru <= 1){
                vyslednazprava = vyslednazprava + "operátora ";
            }else if(pocetoperatoru >= 2){
                vyslednazprava = vyslednazprava + "operátorů ";
            }
            operatori_string = operatori_string.slice(0, -2);
            operatori_string = operatori_string + ".";
            vyslednazprava = vyslednazprava + operatori_string;
            console.log(vyslednazprava_VF);
            if(VF_lte_or_nr.length > 0){
                vyslednazprava = vyslednazprava + vyslednazprava_VF;
            }
            console.log(vyslednazprava);


            active_pasma = active_pasma.sort(function(a, b){return a-b});
            active_pasma_novinst = active_pasma_novinst.sort(function(a, b){return a-b});


            active_pasma_string = "";
            active_pasma_novinst_string = "";
            for(i=0; i<active_pasma.length; i++){
                active_pasma_string = active_pasma_string + active_pasma[i] + ", ";
            }
            active_pasma_string = active_pasma_string.slice(0, -2);
            active_pasma_string = active_pasma_string + "MHz."
            for(i=0; i<active_pasma_novinst.length; i++){
                active_pasma_novinst_string = active_pasma_novinst_string + active_pasma_novinst[i] + ", ";
            }
            active_pasma_novinst_string = active_pasma_novinst_string.slice(0, -2);
            active_pasma_novinst_string = active_pasma_novinst_string + "MHz."




            var obrazky_string = "";
            var numberofimages = 3;
            for(i=1; i <= document.getElementById("img_nmbr").value; i++){
                numberofimages++;
                obrazky_string = obrazky_string + ("\n Obrázek " + numberofimages + " - měřící místo " + i);
            }

            var spektra_img_string = "";
            for(i=1; i<=document.getElementById("spektra_nmbr").value; i++){
                numberofimages++
                spektra_img_string = spektra_img_string + ("\n Obrázek " + numberofimages + " - spektrum měřícího místa " + i);
            }

         


            doc.resolveData({
                image: img, // vložení mapy
                Insert_Value_0: cislo_dokumentu,  
                Insert_Value_1: datum_mereni,
                Insert_Value_2: cas_mereni,
                Insert_Value_3: zkratka,
                Insert_Value_4: adresa,
                Insert_Value_5: coords,
                Insert_Value_6: podminky,
                Insert_Value_7: value1,
                Insert_Value_8: value2,
                Insert_Value_9: value3,
                Insert_Value_10: value4,
                Insert_Value_11: value5,
                Insert_Value_12: mista_zprava,
                Insert_Value_13: zkratka,
                Insert_Value_14: mista_zprava,
                Insert_Value_15: adresa,
                Insert_Value_16: vyslednazprava,
                Insert_Value_17: mista_zprava,
                Insert_Value_18: obrazky_string,
                Insert_Value_19: spektra_img_string


                
              }).then(function () {

                console.log('ready');
                console.log(cislo_dokumentu);
                doc.render();
                  document.getElementById('loadingmessage').innerHTML = "Generování protokolu";
                var out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

                });
                // Output the document using Data-URI
                  document.getElementById('loadingmessage').innerHTML = "Stahování dokumentu";

                  var cislo_projektu = document.getElementById('cislo_projektu').value;
                  if(cislo_dokumentu == ""){
                    cislo_dokumentu = "XXXXXX";
                  }
                  filename1 = zkratka + " " + financni_kod + " #11510-" + cislo_projektu + " 14.Protokol z měření EMP.docx";
                saveAs(out, filename1);
                    console.log(out);
                    document.getElementById("outputcanvas").remove();
                   document.getElementById('loadingmessage').innerHTML = "Dokument stažen";
                   document.getElementById('loadingdiv').style.display = 'none';
                    document.getElementById('loadingmessage').innerHTML = "...";
                    generatedoc(status=2);
                });

            
        }
        
    );
    }else if(status == 2){
        PizZipUtils.getBinaryContent("dopis.docx",
        function (error, content) {
            if (error) {
                throw error;
            }



         
                     

            var opts = {}
            opts.centered = false;
            opts.getImage = function (tagValue, tagName) {
              return new Promise(function (resolve, reject) {
                JSZipUtils.getBinaryContent(tagValue, function (error, content) {
                  if (error) {
                    return reject(error);
                  }
                  return resolve(content);
                });
              });
            }
            opts.getSize = function (img, tagValue, tagName) {
              return [canvas.offsetWidth, canvas.offsetHeight];
            }


            var imageModule = new ImageModule(opts);
            var zip = new PizZip(content);
            var doc = new window.docxtemplater().loadZip(zip).attachModule(imageModule).compile();


            var zkratka = document.getElementById("zkratka").value;


 



            doc.resolveData({
        
                Insert_Value_0: khs_jmeno,  
                Insert_Value_1: khs_id,
                Insert_Value_2: khs_adresa,
                Insert_Value_3: khs_psc,
                Insert_Value_4: zkratka,
                Insert_Value_5: rekonf_string1,
                Insert_Value_6: zkratka,
                Insert_Value_7: adresa,
                Insert_Value_8: active_pasma_string,
                Insert_Value_9: active_pasma_novinst_string,
                Insert_Value_10: rekonf_string2,
                Insert_Value_11: filename1,
               

                
              }).then(function () {

                console.log('ready');
                console.log(cislo_dokumentu);
                doc.render();
                  document.getElementById('loadingmessage').innerHTML = "Generování průdovního dopisu";
                var out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

                });
                // Output the document using Data-URI
                  document.getElementById('loadingmessage').innerHTML = "Stahování dokumentu";

                  var cislo_projektu = document.getElementById('cislo_projektu').value;
                  if(cislo_dokumentu == ""){
                    cislo_dokumentu = "XXXXXX";
                  }
                  var filename2 = zkratka + "_pruvodni_dopis.docx";
                saveAs(out, filename2);
                    console.log(out);
  
                   document.getElementById('loadingmessage').innerHTML = "Dokument stažen";
                   document.getElementById('loadingdiv').style.display = 'none';
                    document.getElementById('loadingmessage').innerHTML = "...";
                });

            
        }
        
    );
    }
};


//změna udaje zkratky
function zkratkainputchange(){
    document.getElementById("zkratka").value = document.getElementById("zkratka").value.toUpperCase();
    var zkratka = document.getElementById("zkratka").value;
    if(zkratka.length >= 5){ 
        $.ajax({   
            type: "GET",
            url: 'https://info.celcnkp202.cetin.cz/android_php/TTLES.php',
            data: {
                value1: zkratka,
                value2: 'JANGRYGAR',
                value3: 'Xkq9Aj2g'

            },
        
        success: function(result){
            var resultarray = result.split("JSON_array: <BR>");
            console.log(resultarray)
            console.log(resultarray[1]);
            console.log(JSON.parse(resultarray[1]));
            
            var vypisTabulka = JSON.parse(resultarray[1]).vypisTabulka;
            document.getElementById("info_nazev").innerHTML = vypisTabulka[2].hodnota;
            //document.getElementById("info_popis").innerHTML = vypisTabulka[3].hodnota;
            var souradnice = vypisTabulka[13].hodnota + ", " + vypisTabulka[14].hodnota;
            document.getElementById("info_souradnice").innerHTML = souradnice;
            document.getElementById("info_adresa").value = vypisTabulka[16].hodnota;

            document.getElementById("info_financni_kod").innerHTML = vypisTabulka[1].hodnota;
            financni_kod = vypisTabulka[1].hodnota;
            adresa = vypisTabulka[16].hodnota;
            kraj = vypisTabulka[5].hodnota;

            var coordsN = vypisTabulka[13].hodnota.toString();
            var coordsE = vypisTabulka[14].hodnota.toString();
            var coordsNarray = coordsN.split(".");
            var coordsEarray = coordsE.split(".");
                function dectodeg(dec){
                    var delitel = dec.toString().length ;
                    delitel = 10 ** delitel;
                  //  console.log(delitel);
                    var deg = dec/delitel*60;
                    deg = Math.floor(deg * 100000) / 100000;
                    return deg;
                }
            var coordsNdegrees = dectodeg(coordsNarray[1]);
            var coordsEdegrees = dectodeg(coordsEarray[1]);
                coordsN = "N " + coordsNarray[0] + "˚" + coordsNdegrees + "'";
                coordsE = "E " + coordsEarray[0] + "˚" + coordsEdegrees + "'";
            coords = coordsN + ", " + coordsE;


            console.log(coordsN, coordsE);
            console.log(coordsNarray, coordsEarray);
            console.log(coords);

           
            //coords = souradnice;
    
            var sour_x = vypisTabulka[13].hodnota;
            var sour_y = vypisTabulka[14].hodnota;
            generateMap(sour_x, sour_y);

            khs_jmeno = "indefined";
            khs_adresa = "undefined";
            khs_id = "undefined";
            khs_psc = "undefinec";
            for(i = 0; i < khs.length; i++){  
                if (kraj == khs[i].kraj){
                    selected_khs = i;
                    khs_jmeno = khs[i].khs_name;
                    khs_adresa = khs[i].khs_ulice + " " + khs[i].khs_cislo_popisne + "/" + khs[i].khs_cislo_orientacni;
                    khs_id = "ID: " + khs[i].khs_id;
                    khs_psc = khs[i].khs_psc + " " + khs[i].khs_obec;
                }
            }
            document.getElementById('info_khs_jmeno').innerHTML = khs_jmeno;
            document.getElementById('info_khs_id').innerHTML = khs_id;
            document.getElementById('info_khs_adresa').innerHTML = khs_adresa;
            document.getElementById('info_khs_psc').innerHTML = khs_psc;

            var pasma = [420, 900, 700, 800, 1800, 2100, 2600, 3700];
            for(var x = 0; x < pasma.length; x++){
                document.getElementById(pasma[x] + "_O2").checked = false;
                document.getElementById(pasma[x] + "_TM").checked = false;
                document.getElementById(pasma[x] + "_VF").checked = false;
                document.getElementById(pasma[x] + "_NT").checked = false;
            }
            for(i=0; i < vypisTabulka[0].hodnota.length; i++){
                var vypisforvalue = vypisTabulka[0].hodnota[i];
                if(vypisforvalue.State === "Working"){
                    var operator = vypisforvalue.Kdo_ProKoho.replace('CETIN_', '');
                    console.log(vypisforvalue.Pasmo + " " + operator);
                    if(operator == "O2" || operator == "TM" || operator == "VF" || operator == "NT"){
                        if(pasma.includes(vypisforvalue.Pasmo)){
                            console.log(vypisforvalue.Pasmo + "_" + operator);
                            document.getElementById(vypisforvalue.Pasmo + "_" + operator).checked = true;
                        }
                    }
                   

                  
                }
               // console.log(vypisTabulka[0].hodnota[i].Pasmo);
            }
        }, 
            error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
        })
    }
}






var Smap;
var SmapDefaultLayer;
var nmbrofmarkers = 0;
function generateMap(N, E){
 

    var center = SMap.Coords.fromWGS84(E, N);
    Smap = new SMap(JAK.gel("Smap"), center, 20);
        Smap.addDefaultLayer(SMap.DEF_OPHOTO).enable();
        Smap.addControl(new SMap.Control.Sync()); 
    var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
        Smap.addControl(mouse);
        SmapDefaultLayer = new SMap.Layer.Marker();
        Smap.addLayer(SmapDefaultLayer);
        SmapDefaultLayer.enable();
   
 /*    var options = {url:"resources/pointer_1.svg",anchor:{left:25,top:25}};
    var newmarker = new SMap.Marker(center, "myMarker2", options);
        newmarker.decorate(SMap.Marker.Feature.Draggable);
        SmapDefaultLayer.addMarker(newmarker); */
    Smap.getSignals().addListener(window, "map-click", SmapClick);
    Smap.getSignals().addListener(window, "control-mouse-move", refreshSMap)
    Smap.setZoomRange(2, 20);

}
function refreshSMap(){
    console.log(Smap.getZoomRange());
}
function SmapClick(e, elm){
    var coords = SMap.Coords.fromEvent(e.data.event, Smap);
    console.log(coords);

    nmbrofmarkers++;

    var options = {url:"resources/pointer_" + nmbrofmarkers + "_" + marker_size + ".svg",anchor:{left:25,top:25}};
    var newmarker = new SMap.Marker(coords, "marker_" + nmbrofmarkers, options);
        newmarker.decorate(SMap.Marker.Feature.Draggable);
        SmapDefaultLayer.addMarker(newmarker); 
}
function Smapfullscreen(){
    var mapa = document.getElementById("SmapContainer")
    mapa.style.width = "90vw";
    mapa.style.height = "90vh"
}

function SmapRemoveMarker(){
    console.log(SmapDefaultLayer.getId());
    SmapDefaultLayer.removeAll();
    nmbrofmarkers = 0;
}
function screenshot(){
   /*  document.getElementById("printmap").appendChild(document.getElementById("Smap"));
    document.getElementById("Smap").style.height= "100vh"; */
    var imagesarray = document.getElementById("Smap").children[1].children[0].children[0].children[0].children;
    for(var i=0; i<imagesarray.length; i++){
        var child = imagesarray[i];
        var childleft = child.style.left;
            childleft =  childleft.slice(0, -2);
        var childtop = child.style.top;
            childtop =  childtop.slice(0, -2);
        console.log(childleft + " " + Math.floor(childleft));
        console.log(childtop + " " + Math.floor(childtop))
        child.style.left = Math.floor(childleft);
        child.style.top = Math.floor(childtop);

    }
    var SmapWidth = document.getElementById("Smap").offsetWidth;
    var SmapXValue = SmapWidth / 100 * 15;
    var SmapHeight = document.getElementById("Smap").offsetHeight;
    var SmapYValue = SmapHeight / 100 * 15;
    var SmapNewWidth = SmapWidth - (SmapWidth / 100 * 30) + 4;
    var SmapNewHeight = SmapHeight - (SmapHeight / 100 * 30) + 4;
    html2canvas(document.getElementById("Smap"), {allowTaint:true, useCORS:true,  scale: 2, x:SmapXValue, y:SmapYValue, width: SmapNewWidth, height: SmapNewHeight}).then(canvas => {
      canvas.id = "outputcanvas";
       // canvas.width = canvas.width - 200;
        document.body.appendChild(canvas);3
        generatedoc(status = 1);
        
    });


}


function mapyredirect(){
   // https://mapy.cz/turisticka?q=49.76280833%2C 18.23677139&source=coor

   var redcoords = coords.replace(',', '%2C');
   window.open('https://mapy.cz/turisticka?q=' + redcoords + '&source=coor', '_blank');
  
}
function mapsredirect(){
    console.log('https://www.google.com/maps/@' + coords +',18z');
    window.open('https://www.google.com/maps/@' + coords +',18z', '_blank');
}

function markersizechange(size){
    var size = size;
    var sizes = [25,50,75,100];
    for( i=0; i<sizes.length; i++){
        document.getElementById("marker_size_" + sizes[i]).classList.remove("markerbttn_active");  
    }
    document.getElementById("marker_size_" + size).classList.add("markerbttn_active");
    marker_size = size;
}
function adresaChange(){
    adresa = document.getElementById('info_adresa').value;
}
function mistaChange(){
    var mistaarray = ["strecha", "puda", "terasa", "prostory", "byt", "okoli"];
    var mistaarrayzprava = ["na střeše", "na půdě", "na terase", "ve společných prostorách budovy pod základnovou stanicí", "v bytě pod základnovou stanicí", "v prostorách okolí budovy"];
    mista_zprava = "";
    for(i=0; i<5; i++){
        if(document.getElementById("misto_" + mistaarray[i]).checked === true){
            
            mista_zprava = mista_zprava + mistaarrayzprava[i] + ", ";
        }
    }
    mista_zprava = mista_zprava.slice(0, -2);
    document.getElementById('mista_zprava').value = mista_zprava;
}
function khs_change_open(){
    document.getElementById('modal').style.display = "block";
    document.getElementById('khs_content').innerHTML = "";
    for(x=0; x<khs.length; x++){
        
        var container = document.createElement('div');
            container.className = "khs_content_container";
            if(x == selected_khs){
                container.classList.add("active");
            }
            container.id = "khs_" + x;
            container.onclick = function() { khs_select(this.id) };
        var kraj_element = document.createElement('div');
            kraj_element.className = "khs_content_kraj";
        var id_element = document.createElement('div');
            id_element.className = "khs_content_id";
        var obec_element =  document.createElement('div');
            obec_element.className = "khs_content_obec";
        var ulice_element = document.createElement('div');
            ulice_element.className = "khs_content_ulice";


        kraj_element.innerHTML = khs[x].kraj;
        id_element.innerHTML = khs[x].khs_id;
        obec_element.innerHTML = khs[x].khs_obec;
        ulice_element.innerHTML = khs[x].khs_ulice + " " + khs[x].khs_cislo_popisne + "/" + khs[x].khs_cislo_orientacni;

        container.appendChild(kraj_element);
        container.appendChild(id_element);
        container.appendChild(obec_element);
        container.appendChild(ulice_element);
       
        document.getElementById('khs_content').appendChild(container);


    }
    var center = document.createElement('center');
    var savebttn = document.createElement('input');
        savebttn.className = "savebttn";
        savebttn.onclick = function(){ khs_change_close(save=true) }
        savebttn.value = "OK";
    center.appendChild(savebttn);
    document.getElementById('khs_content').appendChild(center);
}
function khs_select(clicked_id){
    clicked_id = clicked_id.replace("khs_", "");
    selected_khs = clicked_id;
    for(y=0; y<khs.length; y++){
        document.getElementById('khs_' + y).className = "khs_content_container";     
    }
    document.getElementById('khs_' + clicked_id).classList.add('active');

}
function khs_change_close(save){
    if(save = true){ 
        khs_jmeno = khs[selected_khs].khs_name;
        khs_adresa = khs[selected_khs].khs_ulice + " " + khs[selected_khs].khs_cislo_popisne + "/" + khs[selected_khs].khs_cislo_orientacni;
        khs_id = khs[selected_khs].khs_id;
        khs_psc = khs[selected_khs].khs_psc + " " + khs[selected_khs].khs_obec;

        document.getElementById('info_khs_jmeno').innerHTML = khs_jmeno;
        document.getElementById('info_khs_id').innerHTML = "ID: " + khs_id;
        document.getElementById('info_khs_adresa').innerHTML = khs_adresa;
        document.getElementById('info_khs_psc').innerHTML = khs_psc;
    }
    document.getElementById('modal').style.display = "none";
}