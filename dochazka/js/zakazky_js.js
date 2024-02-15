var kooperacezakazka;
var kooperacebutton;
var zakazkyJSONarray = {};
var updatingJSON = {};
var odpracovano_poradi = -1;

var odpracovanozakazka;
var adding_radek = false;
var zakazkaarray;
var edit_uzivatele_number = 0;
var edit_uzivatele_array = [];
var edit_uzivatele_id;



function datatablesinsert() {
    console.group("function: datablesinsert");

    $.fn.dataTable.ext.order['dom-text'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('input', td).val();
        });
    }

    $.fn.dataTable.ext.order['dom-text-numeric'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            //console.log("halooo:" + numbercreator2($('input', td).val() * 1));  
            return numbercreator($('input', td).val());
            //return numbercreator2($('input', td).val());
        });
    }
    $.fn.dataTable.ext.order['dom-select'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('select', td).val();
        });
    }


    $('#zakazkytable').DataTable({
        "paging": true,
        "searching": true,
        "bInfo": false,
        "columns": [
            { "orderDataType": "dom-text", type: 'string' },
            { "orderDataType": "dom-select", "searchable": false },
            { "searchable": false },
            { "searchable": false },
            { "orderDataType": "dom-text-numeric", "searchable": false },
            { "orderDataType": "dom-text-numeric", "searchable": false },
            { "orderDataType": "dom-text-numeric", "searchable": false },
            { "orderDataType": "dom-text-numeric", "searchable": false },
            { "orderDataType": "dom-select", "searchable": false },
            { "searchable": false, orderable: false },
            { "searchable": false, orderable: false },
            { "searchable": false, orderable: false }

        ],
        "pageLength": 20,
        "lengthMenu": [
            [20, 25, 50, -1],
            [20, 25, 50, "All"]
        ],
        "order": [
            [8, "desc"]
        ],
        "language": {
            "info": "Zobrazeno _START_ to _END_ of _TOTAL_ zakázek",
            "infoEmpty": "Zobrazeno 0 to 0 of 0 zakázek",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Zobrazit _MENU_",
            "search": "",
            "zeroRecords": "Žádné Výsledky",
            "paginate": {
                "first": "First",
                "last": "Last",
                "next": "Další",
                "previous": "Předešlé"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            searchPlaceholder: "Vyhledat"
        }

    });

    console.groupEnd();
}
//Pokud je reload po vložení zakázky
function ZakazkyInsertCheck() {
    if (localStorage.getItem("ZakazkyInsertSuccess") == "true") {
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\">Úspěšně vloženo</div>";
        localStorage.setItem("ZakazkyInsertSuccess", "false");

        setTimeout(function() {

            document.getElementById("ajax_vysledek").innerHTML = "";


        }, 5000);
    }
}

function uzavreno_check() {
    console.group("function: uzavreno_check");
    for (i = 1; i < zakazky_array.length; i++) {
        var value = document.getElementById("input_zak_stav_" + i).value;
        console.log(value);

        if (value == "false") {
            console.log("input_zak_stav_" + i);
            document.getElementById("tr_" + i).className = "tr_uzavreno";
        } else {

            console.log("n");
            document.getElementById("tr_" + i).className = "";
        }

        if (document.getElementById("input_zak_ukonceni_" + i).value == "") {
            document.getElementById("input_zak_ukonceni_" + i).className = "datenotdefined";
        } else {
            document.getElementById("input_zak_ukonceni_" + i).className = "";
        }
        if (document.getElementById("input_zak_zahajeni_" + i).value == "") {
            document.getElementById("input_zak_zahajeni_" + i).className = "datenotdefined";
        } else {
            document.getElementById("input_zak_zahajeni_" + i).className = "";
        }

    }



    console.groupEnd();
}

function updatejs(clicked_id) {
    //update zalázky do mysql

    console.group("Function: updatejs");
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>";

    var button_id = clicked_id.replace("zak_name_", "");
    button_id = parseInt(button_id, 10);
    console.log(button_id);

    var zak_id = zakazky_array[button_id];
    console.log(zak_id);
    var zakazka_nazev = document.getElementById("input_zak_name_" + button_id).value;
    console.log(zakazka_nazev);
    var zakazka_osoba = document.getElementById("input_zak_osoba_" + button_id).value;
    console.log(zakazka_osoba);
    var zakazka_zahajeni = document.getElementById("input_zak_zahajeni_" + button_id).value;
    console.log(zakazka_zahajeni);
    var zakazka_ukonceni = document.getElementById("input_zak_ukonceni_" + button_id).value;
    console.log(zakazka_ukonceni);
    var zakazka_stav = document.getElementById("input_zak_stav_" + button_id).value;
    console.log(zakazka_stav);
    var faktura = numbercreator(document.getElementById("input_zak_faktura_" + button_id).value).toFixed(2);
    console.log(zakazka_stav);

    $.ajax({
        type: "POST",
        url: 'actions/zakazky_update.php',
        data: {
            databasetable: databasetable,
            zak_id: zak_id,
            zakazka_nazev: zakazka_nazev,
            zakazka_osoba: zakazka_osoba,
            zakazka_zahajeni: zakazka_zahajeni,
            zakazka_ukonceni: zakazka_ukonceni,
            zakazka_stav: zakazka_stav,
            faktura: faktura
        },

        success: function(result) {
            console.log("success");
            document.getElementById("ajax_vysledek").innerHTML = result;
            setTimeout(function() {
                document.getElementById("ajax_vysledek").innerHTML = "";

            }, 5000);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    console.groupEnd();
}

function delete_confirm(clicked_id) {
    console.group("Function: delete_confirm");
    var modal = document.getElementById("savemodal");
    var modalcontent = document.getElementById("save_content");
    modal.style.display = "block";
    modalcontent.innerHTML = "Opravdu chcete smazat<br>";


    var closebttn = document.createElement("button");
    closebttn.type = "button";
    closebttn.className = "prompt_close_bttn";
    closebttn.innerHTML = "Smazat";
    closebttn.onclick = function() { deletejs(clicked_id) };

    var cancelbttn = document.createElement("button");
    cancelbttn.type = "button";
    cancelbttn.className = "prompt_reset_bttn";
    cancelbttn.innerHTML = "Zrušit";
    cancelbttn.onclick = function() { modal.style.display = "none"; };


    modalcontent.appendChild(closebttn);
    modalcontent.appendChild(cancelbttn);
    console.groupEnd();
}

function deletejs(clicked_id) {
    // mazaní zakázky z mysql
    modal.style.display = "none";
    console.group("Function: deletejs");
    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>";

    var button_id = clicked_id.replace("zak_delete_", "");
    button_id = parseInt(button_id, 10);

    var zak_id = zakazky_array[button_id];

    $.ajax({
        type: "POST",
        url: 'actions/zakazky_delete.php',
        data: {
            databasetable: databasetable,
            zak_id: zak_id
        },

        success: function(result) {

            var name = "ajax_zakazky_delete";
            ajax_status = getCookie(name);
            console.log(ajax_status);


            document.getElementById("ajax_vysledek").innerHTML = result;
            if (ajax_status == "success") {

                document.getElementById("tr_" + button_id).innerHTML = "";
            } else {



            }
            setTimeout(function() {

                document.getElementById("ajax_vysledek").innerHTML = "";

            }, 5000);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);


        }
    });
    console.groupEnd();
}

function insertjs(clicked_id) {
    //vkládání zakázky do mysql 
    console.group("Function: insertjs");
    if (document.getElementById("input_zak_vlozeni_uzivatel").value == "none") {
        alert("Není vybraná zodpovědná osoba!");
    } else {
        document.getElementById("ajax_vysledek").innerHTML = "<div class=\"loading\"> <img class=\"loadingimg\" src=\"files/loading.gif\">Vkládání</div>";
        var nazev = document.getElementById("input_zak_vlozeni_name").value;
        var uzivatel = document.getElementById("input_zak_vlozeni_uzivatel").value;
        var zahajeni = document.getElementById("input_zak_vlozeni_zahajeni").value;
        var ukonceni = document.getElementById("input_zak_vlozeni_ukonceni").value;
        var faktura = numbercreator(document.getElementById("input_zak_vlozeni_faktura").value).toFixed(2);
        var stav = document.getElementById("input_zak_vlozeni_stav").value;
        var tbody = document.getElementById("zakazky_tbody").innerHTML;
        var top = document.getElementById("zakazky_top").innerHTML;
        top = "<tr id=\"zakazky_top\" class=\"dochazka_tr\">" + top + "</tr>";

        var insJSON = "{\"uzivatele\":[{\"cena\":\"800\", \"uzivatel\":\"other\"}]}";

        var kooperace = "[]";

        $.ajax({
            type: "POST",
            url: 'actions/zakazky_insert.php',
            data: {
                databasetable: databasetable,
                nazev: nazev,
                uzivatel: uzivatel,
                zahajeni: zahajeni,
                ukonceni: ukonceni,
                faktura: faktura,
                stav: stav,
                insJSON: insJSON,
                kooperace: kooperace
            },

            success: function(result) {



                //document.getElementById("ajax_vysledek").innerHTML = result;

                var name = "ajax_zakazky_insert";
                var ajax_status = getCookie(name);
                console.log(ajax_status);
                console.log("result: " + result);

                if (ajax_status == "success") {
                    localStorage.setItem("ZakazkyInsertSuccess", "true");
                    window.location.reload();
                    /*   var insertHTML = "<tr id=\"tr_1\"> <td class=\"dochazka_td\"><input type=\"text\" readonly value=" + nazev + "></td><td class=\"dochazka_td\"><input type=\"text\" readonly value=" + uzivatel + "></td><td class=\"dochazka_td\"><input type=\"date\" readonly value=" + zahajeni + "></td><td class=\"dochazka_td\"><input type=\"date\" readonly value=" + ukonceni + "></td><td class=\"dochazka_td\"><input type=\"number\" readonly value=" + faktura + "></td><td class=\"dochazka_td\"></td><td class=\"dochazka_td\"></td><td class=\"dochazka_td\"></td><td class=\"dochazka_td\"> " + stav + "</td><td class=\"dochazka_td\">     <input type=\"submit\"  onclick=\"update_zak()\" value=\"Obnovit Pro Úpravu\"></td></tr>";
          tbody = tbody.replace(top, "");

          console.log(top);
          console.log(tbody);
          console.log(insertHTML); 
          var tabulka = document.getElementById("zakazky_tbody");
          var row = tabulka.insertRow(-1);
        
          var cell_nazev = row.insertCell(0);
          var cell_osoba = row.insertCell(1);
          var cell_zahajeni = row.insertCell(2);
          var cell_ukonceni = row.insertCell(3);
          var cell_faktura = row.insertCell(4);
          var cell_kooperace = row.insertCell(5);
          var cell_vydajeRT = row.insertCell(6);
          var cell_zisk = row.insertCell(7);
          var cell_stav = row.insertCell(8);
          var cell_bttns = row.insertCell(9);
          var poradi = zakazky_array.length - 1;
          cell_nazev.innerHTML = "<input class=\"input_name\" type=\"text\" id=\"input_zak_name_" + poradi + "\" value=\"" + nazev + "\">";
          cell_osoba.innerHTML = uzivatel;
          cell_zahajeni.innerHTML = zahajeni;
          cell_ukonceni.innerHTML = ukonceni;
          cell_faktura.innerHTML = faktura;
          cell_kooperace.innerHTML = "";
          cell_vydajeRT.innerHTML = ""
          cell_zisk.innerHTML = "";
          cell_stav.innerHTML = stav;
          cell_bttns.innerHTML = "";

  */

                } else {



                }

                setTimeout(function() {

                    document.getElementById("ajax_vysledek").innerHTML = "";


                }, 5000);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
    console.groupEnd();
}

function update_zak() {
    //f5
    console.group("Function: update_zak");

    window.location.reload();

    console.groupEnd();
}









function odpracovano_block_add() {
    //vydajeRT -> přidání uživatele
    console.group("Function: odpracovano_block_add");
    var content = document.getElementById("vydajert_content_top");

    if (adding_radek == false) {
        var urcenych_uzivatelu_pocet = 0;
        for (i = 0; i < updatingJSON.uzivatele.length; i++) {
            if (updatingJSON.uzivatele[i]) {
                urcenych_uzivatelu_pocet++;
            }
        }

        // updatingJSON.uzivatele[i].poradi = odpracovano_poradi;
        console.log("urcenych_uzivatelu_pocet: " + urcenych_uzivatelu_pocet);

        if (urcenych_uzivatelu_pocet < uzivatele_array_id.length - 1) {
            adding_radek = true;


            odpracovano_poradi++;

            var select = "<select oninput=\"vydajeRT_user_change(this.id)\" id=\"odpracovano_select_" + odpracovano_poradi + "\">";

            var selectedpocet = 0;
            for (x = uzivatele_array_id.length - 1; x > 0; x--) {
                var userinjson = false;
                var selecteduzivatel;

                for (y = updatingJSON.uzivatele.length - 1; y >= 0; y--) {
                    if (updatingJSON.uzivatele[y]) {
                        if (updatingJSON.uzivatele[y].uzivatel != uzivatele_array_id[x]) {

                            console.log("userinjson: false při " + updatingJSON.uzivatele[y].uzivatel + " != " + uzivatele_array_id[x]);
                        } else {
                            userinjson = true;
                        }
                    }
                }
                if (userinjson == false && selectedpocet < 1) {
                    selectedpocet++;
                    console.log("selected při uzivatel: " + uzivatele_array_id[x]);
                    select = select + "<option selected value=\"" + uzivatele_array_id[x] + "\">" + uzivatele_array_name[x] + "</option>";
                    selecteduzivatel = uzivatele_array_id[x];
                } else {
                    select = select + "<option  value=\"" + uzivatele_array_id[x] + "\">" + uzivatele_array_name[x] + "</option>";
                }


            }
            console.log("selecteduzivatel: " + selecteduzivatel);
            var added_cena = 0;
            var added_odhodiny = "00:00";

            var searching_uzivatel = selecteduzivatel;
            var searching_zakazka = odpracovanozakazka;
            //alert(searching_zakazka);


            var table = document.getElementById("odpracovano_table");
            var td = table.insertRow(-1);
            td.id = "odpracovano_block_" + odpracovano_poradi;

            var cell_name = td.insertCell(0);
            var cell_cena = td.insertCell(1);
            var cell_odhodiny = td.insertCell(2);
            var cell_value = td.insertCell(3);
            var cell_delete = td.insertCell(4);

            cell_name.innerHTML = select;
            cell_cena.innerHTML = "<input style=\"text-align:center\" readonly type=\"image\" width=\"14\" height=\"14\" src=\"files/loading.gif\">";
            cell_odhodiny.innerHTML = "<input style=\"text-align:center\" readonly type=\"image\" width=\"14\" height=\"14\" src=\"files/loading.gif\">";
            cell_value.innerHTML = "<input style=\"text-align:center\" readonly type=\"image\" width=\"14\" height=\"14\" src=\"files/loading.gif\">";
            cell_delete.innerHTML = "<svg class=\"dochazka_delete_buttn\" onclick=\"odpracovano_block_delete(this.id)\" id=\"odpracovano_delete_" + odpracovano_poradi + "\" fill=\"#ffffff\"  viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"/></svg>";



            console.group("searching for time and JSON of user " + searching_uzivatel);
            $.ajax({
                type: "POST",
                url: 'actions/zakazky_odpracovano_search.php',
                data: {
                    databasetable: databasetable,
                    searching_uzivatel: searching_uzivatel,
                    searching_zakazka: searching_zakazka


                },

                success: function(result) {

                    console.log(result);


                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                },
                complete: function(result, xhr, settings) {


                    result = result.responseText;
                    /*     result = JSON.stringify(result);
                        console.log(result); */

                    var outputarray = result.split("--split--");
                    console.log(outputarray);

                    var loadedJSON = JSON.parse(outputarray[0]);
                    console.log(loadedJSON);



                    for (i = loadedJSON.uzivatele.length - 1; i >= 0; i--) {
                        if (loadedJSON.uzivatele[i]) {
                            if (loadedJSON.uzivatele[i].uzivatel == selecteduzivatel) {

                                added_cena = loadedJSON.uzivatele[i].cena;

                            }
                        }
                    }




                    var loadedsessions = JSON.parse(outputarray[1]);
                    console.log(loadedsessions);
                    if (loadedsessions[0] == "error") {

                        console.warn("no sessions found");
                    } else {

                        var added_odhodiny_hrs = 0;
                        var added_odhodiny_min = 0;
                        for (x = loadedsessions.length - 1; x >= 0; x--) {
                            console.log("for");
                            added_odhodiny_hrs = added_odhodiny_hrs + parseInt(loadedsessions[x].substring(0, 2));
                            added_odhodiny_min = added_odhodiny_min + parseInt(loadedsessions[x].substring(3, 5));
                        }
                        console.log("added_odhodiny_hrs: " + added_odhodiny_hrs);
                        console.log("added_odhodiny_min: " + added_odhodiny_min);
                        if (added_cena > 59) {
                            var hrs_in_min = parseInt(added_odhodiny_min / 60, 10);
                            added_odhodiny_hrs = added_odhodiny_hrs + hrs_in_min;
                            added_odhodiny_min = added_odhodiny_min - added_odhodiny_min * hrs_in_min;


                        }


                        if (added_odhodiny_hrs < 10) {
                            added_odhodiny_hrs = "0" + added_odhodiny_hrs;
                        }
                        if (added_odhodiny_min < 10) {
                            added_odhodiny_min = "0" + added_odhodiny_min;
                        }

                        while (added_odhodiny_min > 60) {
                            added_odhodiny_min = added_odhodiny_min - 60;
                            added_odhodiny_hrs = added_odhodiny_hrs + 1;
                        }

                        added_odhodiny = added_odhodiny_hrs + ":" + added_odhodiny_min;

                    }

                    console.log(added_odhodiny);
                    var added_celkem = parseInt(added_odhodiny.substring(0, 2)) + parseInt(added_odhodiny.substring(3, 5) / 60);
                    added_celkem = added_celkem * added_cena;
                    added_celkem.toFixed(2);

                    updatingJSON.uzivatele.push({ "cena": added_cena, "uzivatel": selecteduzivatel, "poradi": odpracovano_poradi, "odhodiny": added_odhodiny, "celkem": added_celkem });
                    console.log(updatingJSON);
                    select = select + "</select>";


                    cell_cena.innerHTML = "<input id=\"odpracovano_cena_" + odpracovano_poradi + "\" oninput=\"numberformatterevent(event);vydajeRT_cena_change(this.id)\" type=\"text\" value=\"" + added_cena + "\">";
                    cell_odhodiny.innerHTML = "<input id=\"odpracovano_odhodiny_" + odpracovano_poradi + "\" readonly type=\"text\" value=\"" + added_odhodiny + "\">";
                    cell_value.innerHTML = "<input id=\"odpracovano_celkem_" + odpracovano_poradi + "\" readonly type=\"number\" value=\"" + added_celkem + "\">";

                    // content.innerHTML = content.innerHTML + "<input onclick=\"odpracovano_block_add()\" type=\"submit\" value=\"+\">" + select + "<input id=\"odpracovano_cena_" + odpracovano_poradi + "\" type=\"number\" value=\"0\"> <input id=\"odpracovano_delete_" + odpracovano_poradi + "\" onclick=\"odpracovano_block_delete(this.id)\" type=\"submit\" value=\"-\" ></div>"

                    console.groupEnd();









                    adding_radek = false;

                }
            });

        } else {
            console.log("maximální počet uživatelů dosažen");
        }
    }
    console.groupEnd();

}


function odpracovano_block_delete(clicked_id) {
    //vydajeRT -> odebrání uživatele
    console.group("Function: odpracovano_block_delete");
    var id = clicked_id.replace("odpracovano_delete_", "");
    for (i = updatingJSON.uzivatele.length - 1; i >= 0; i--) {
        if (updatingJSON.uzivatele[i]) {
            if (updatingJSON.uzivatele[i].poradi == id) {

                delete updatingJSON.uzivatele[i];
            }
        }
    }
    console.log(updatingJSON);
    document.getElementById("odpracovano_block_" + id).remove();
    console.groupEnd();
}

function odpracovanoopen(clicked_id) {
    console.group("Function: odpracovanoopen");
    console.log(clicked_id);

    var button_id = clicked_id.replace("input_zak_odpracovano_", "");
    var zak_id = zakazky_array[button_id];
    odpracovanozakazka = zak_id;
    console.log(button_id);
    console.log("opened id: " + zak_id);
    updatingJSON = JSON.parse(JSON.stringify(zakazkyJSONarray[zak_id]));
    var modal = document.getElementById("vydajertmodal");
    var modalcontent = document.getElementById("vydajert_content");
    var content = "<tr class=\"popisky\"><td>Jméno</td><td>Hodinová sazba</td><td>Odpracované hodiny</td><td>Mzda</td><td></td></tr>";
    var contentother = "<table class=\"odpracovano_table\" id=\"odpracovano_table_other\">";

    for (i = 0; i != updatingJSON.uzivatele.length; i++) {
        if (updatingJSON.uzivatele[i]) {
            console.group("User: " + updatingJSON.uzivatele[i].uzivatel);



            console.log("uzivatele select");




            // other (ostatní uživatelé)
            if (updatingJSON.uzivatele[i].uzivatel == "other") {
                updatingJSON.uzivatele[i].poradi = "other";
                var odhodiny = "00:00";
                var celkem = 0;
                var cena = 0;

                if (updatingJSON.uzivatele[i].odhodiny != "") {
                    var splitted_odhodiny = updatingJSON.uzivatele[i].odhodiny.split(":");
                    odhodiny = splitted_odhodiny[0] + ":" + splitted_odhodiny[1];

                }

                if (updatingJSON.uzivatele[i].celkem != "") {
                    celkem = updatingJSON.uzivatele[i].celkem;
                    celkem = parseFloat(celkem);
                }
                celkem = celkem.toFixed(2);

                if (updatingJSON.uzivatele[i].cena != "") {
                    cena = updatingJSON.uzivatele[i].cena;
                }


                contentother = contentother + "<tr class=\"odpracovano_block_other\" id=\"odpracovano_block_other\"><td><input class=\"readonly\" style=\"width:100%;\" readonly id=\"odpracovano_user_other\" type=\"text\" value=\"Ostatní uživatelé\"></td><td><input  id=\"odpracovano_cena_other\"  oninput=\"numberformatterevent(event); vydajeRT_cena_change(this.id)\" type=\"number\" value=\"" + cena + "\"></td><td><input readonly class=\"readonly\" id=\"odpracovano_odhodiny_other\"  type=\"text\"  value=\"" + odhodiny + "\"></td><td><input class=\"readonly\" readonly id=\"odpracovano_celkem_other\" type=\"number\" value=\"" + celkem + "\"> </td></tr> ";



            } else {

                odpracovano_poradi++;
                var select = "<select oninput=\"vydajeRT_user_change(this.id)\" id=\"odpracovano_select_" + odpracovano_poradi + "\">";
                updatingJSON.uzivatele[i].poradi = odpracovano_poradi;
                for (x = uzivatele_array_id.length - 1; x > 0; x--) {
                    if (updatingJSON.uzivatele[i].uzivatel == uzivatele_array_id[x]) {
                        select = select + "<option selected value=\"" + uzivatele_array_id[x] + "\">" + uzivatele_array_name[x] + "</option>";
                    } else {
                        select = select + "<option value=\"" + uzivatele_array_id[x] + "\">" + uzivatele_array_name[x] + "</option>";
                    }

                }
                var odhodiny = "00:00";
                var celkem = 0;
                var cena = 0;

                if (updatingJSON.uzivatele[i].odhodiny != "") {
                    var splitted_odhodiny = updatingJSON.uzivatele[i].odhodiny.split(":");
                    odhodiny = splitted_odhodiny[0] + ":" + splitted_odhodiny[1];

                }

                if (updatingJSON.uzivatele[i].celkem != "") {
                    celkem = updatingJSON.uzivatele[i].celkem;
                    celkem = parseFloat(celkem);
                }
                celkem = celkem.toFixed(2);
                celkem = numberformattergetnmbr(celkem);
                if (updatingJSON.uzivatele[i].cena != "") {
                    cena = updatingJSON.uzivatele[i].cena;
                }


                console.log(updatingJSON);
                select = select + "</select>";
                content = content + "<tr id=\"odpracovano_block_" + odpracovano_poradi + "\">";


                content = content + "<td>";
                content = content + select;
                content = content + "</td>"

                content = content + "<td>";
                content = content + "<input id=\"odpracovano_cena_" + odpracovano_poradi + "\" oninput=\"numberformatterevent(event);vydajeRT_cena_change(this.id)\" type=\"text\"  value=\"" + cena + "\">";
                content = content + "</td>";

                content = content + "<td>";
                content = content + "<input id=\"odpracovano_odhodiny_" + odpracovano_poradi + "\" class=\"readonly\" readonly type=\"text\"  value=\"" + odhodiny + "\">";
                content = content + "</td>";

                content = content + "<td>";
                content = content + "<input id=\"odpracovano_celkem_" + odpracovano_poradi + "\" class=\"readonly\" readonly type=\"text\" value=\"" + celkem + "\">";
                content = content + "</td>";

                content = content + "<td>";
                content = content + "<svg class=\"dochazka_delete_buttn\" onclick=\"odpracovano_block_delete(this.id)\" id=\"odpracovano_delete_" + odpracovano_poradi + "\" fill=\"#ffffff\"  viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"/></svg>";
                content = content + "</td>";

                content = content + "</tr>";

            }
            console.groupEnd();
        }
    }

    divbuttonadd = "<input class=\"odpracovano_button_add\"  type=\"button\" onclick=\"odpracovano_block_add();\" value=\"+\">";

    modalcontent.innerHTML = "<table class=\"odpracovano_table\" id=\"odpracovano_table\"><div id=\"vydajert_content_top\">" +
        content +
        "</div></table>" +
        divbuttonadd +
        "<br>" +
        contentother +
        "</table> <br>" +
        "<input type=\"button\" class=\"odpracovano_save_bttn\" value=\"Uložit\" onClick=\"odpracovano_confirm(save=true)\"> ";
    modal.style.display = "block";

    //width selectů = width other
    if (document.getElementById("odpracovano_select_0")) {

        document.getElementById("odpracovano_user_other").style.minWidth = document.getElementById("odpracovano_select_0").offsetWidth;
        document.getElementById("odpracovano_select_0").style.minWidth = document.getElementById("odpracovano_user_other").offsetWidth;
    }



    console.groupEnd();
}

function odpracovanoclose() {
    //zavření vydajeRT
    console.group("Function: odpracovanoclose");
    updatingJSON = "";
    var modal = document.getElementById("vydajertmodal");
    modal.style.display = "none";
    document.getElementById("vydajert_content").innerHTML = "";
    var modal2 = document.getElementById("savemodal");
    modal2.style.display = "none";
    console.groupEnd();
}

function odpracovano_save() {
    console.group("function: odpracovano_save");
    var outputJSON = { "uzivatele": [] };
    zakazkyJSONarray[odpracovanozakazka].uzivatele = [];

    for (i = updatingJSON.uzivatele.length - 1; i >= 0; i--) {
        if (updatingJSON.uzivatele[i]) {
            outputJSON.uzivatele[i] = { "cena": updatingJSON.uzivatele[i].cena, "uzivatel": updatingJSON.uzivatele[i].uzivatel };
            zakazkyJSONarray[odpracovanozakazka].uzivatele[i] = { "celkem": updatingJSON.uzivatele[i].celkem, "cena": updatingJSON.uzivatele[i].cena, "odhodiny": updatingJSON.uzivatele[i].odhodiny, "uzivatel": updatingJSON.uzivatele[i].uzivatel, }
        }
    }

    console.log(outputJSON);
    outputJSON = JSON.stringify(outputJSON);
    $.ajax({
        type: "POST",
        url: 'actions/zakazky_odpracovano_save.php',
        data: {
            databasetable: databasetable,
            odpracovanozakazka: odpracovanozakazka,
            outputJSON: outputJSON

        },

        success: function(result) {
            var modal = document.getElementById("savemodal");
            modal.style.display = "none";
            result = JSON.parse(result);
            console.log(result);

            if (result[0] == "error") {
                document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">" + result[1] + "</div>";

            } else if (result[0] == "good") {
                if (result[1] == "error") {

                    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">" + result[2] + "</div>";

                } else if (result[1] == "good") {
                    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\">Úspěšně vloženo</div>";
                    vydajeRT_table_compute();
                } else {
                    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">Neznámý Error</div>";
                }
            } else {

                document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">Neznámý Error</div>";
            }

            setTimeout(function() {
                document.getElementById("ajax_vysledek").innerHTML = "";

            }, 5000)


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);

        }


    });
    console.groupEnd();
}

function odpracovano_confirm(save) {
    console.group("function: odpracovano_confirm");

    if (save == false) {
        //  if(JSON.stringify(updatingJSON.uzivatele) == JSON.stringify(zakazkyJSONarray[odpracovanozakazka].uzivatele)){
        var comparesame = true;
        if (updatingJSON.uzivatele.length == zakazkyJSONarray[odpracovanozakazka].uzivatele.length) {
            console.log("rovná se se");
            for (x = 0; x < updatingJSON.uzivatele.length; x++) {
                if (updatingJSON.uzivatele[x] && zakazkyJSONarray[odpracovanozakazka].uzivatele[x] && updatingJSON.uzivatele[x] && zakazkyJSONarray[odpracovanozakazka].uzivatele[x]) {
                    console.log(updatingJSON.uzivatele[x].uzivatel);
                    console.log(zakazkyJSONarray[odpracovanozakazka].uzivatele[x].uzivatel);
                    console.log(updatingJSON.uzivatele[x].cena);
                    console.log(zakazkyJSONarray[odpracovanozakazka].uzivatele[x].cena);
                    if (updatingJSON.uzivatele[x].uzivatel != zakazkyJSONarray[odpracovanozakazka].uzivatele[x].uzivatel || updatingJSON.uzivatele[x].cena != zakazkyJSONarray[odpracovanozakazka].uzivatele[x].cena) {
                        comparesame = false;
                    }
                } else {
                    console.log("delete");
                    comparesame = false;
                }
            }
        } else {
            console.log("length");
            comparesame = false;
        }
        if (comparesame === true) {
            console.log("zavírání beze změn");
            odpracovanoclose();
        } else {
            console.log("proběhly změny prompt");

            var modal = document.getElementById("savemodal");
            var modalcontent = document.getElementById("save_content");
            modal.style.display = "block";
            modalcontent.innerHTML = "Proběhly Změny<br>Opravdu chcete zavřít<br>";

            var savebttn = document.createElement("button");
            savebttn.type = "button";
            savebttn.className = "prompt_save_bttn";
            savebttn.innerHTML = "Uložit";
            savebttn.onclick = function() { odpracovano_save() };

            var closebttn = document.createElement("button");
            closebttn.type = "button";
            closebttn.className = "prompt_close_bttn";
            closebttn.innerHTML = "Zavřít";
            closebttn.onclick = function() { odpracovanoclose() };

            var cancelbttn = document.createElement("button");
            cancelbttn.type = "button";
            cancelbttn.className = "prompt_reset_bttn";
            cancelbttn.innerHTML = "Zrušit";
            cancelbttn.onclick = function() { modal.style.display = "none"; };

            modalcontent.appendChild(savebttn);
            modalcontent.appendChild(closebttn);
            modalcontent.appendChild(cancelbttn);


        }
    } else {
        odpracovano_save();
    }

    freemny();
    console.groupEnd();
}

function vydajeRT() {
    console.group("Function: vydajeRT");


    var zakazkyJSONarray = {};

    $.ajax({
        type: "POST",
        url: 'actions/zakazky_load_sessions.php',
        data: {
            databasetable: databasetable,

        },

        success: function(result) {
            //result = result.replaceAll('\\', "");
            console.log(result);

            var outputarray = result.toString().split("--split--"); //rozděluje ajax výsledek po --split-- do arraye
            console.log(outputarray);


            var outputJSONarray = JSON.parse(outputarray[1]); //array JSON všech zakázek z databaze
            console.log(outputJSONarray);

            var outputidarray = JSON.parse(outputarray[0]); // array id všech zakázek z databaze
            console.log(outputidarray);

            var casarray = JSON.parse(outputarray[2]); //aray časů všech sessions z databaze

            var userarray = JSON.parse(outputarray[3]); // array uzivatelů všech sessions z databaze

            var zakazkaarray = JSON.parse(outputarray[4]); // array zakázek všech sessions z databaze

            var kooperace = JSON.parse(outputarray[5]); //array kooperací
            console.log(kooperace);

            for (i = outputidarray.length - 1; i >= 0; i--) {
                console.log(i);
                var outputid = outputidarray[i];
                var outputJSON = outputJSONarray[i];
                var outputkooperace = kooperace[i];
                console.log(outputkooperace);
                testfnc(outputJSON, outputid, outputkooperace);
            }

            objectlooping(casarray, userarray, zakazkaarray);

            console.groupEnd();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            console.groupEnd();
        }


    });






}

function vydajeRT_cena_change(clicked_id) {
    console.group("function: vydajeRT_cena_change");

    var element_id = clicked_id.replace("odpracovano_cena_", "");
    console.log("element_id = " + element_id);

    var element_value = numbercreator(document.getElementById(clicked_id).value);
    console.log("element_value:" + element_value);


    //odpracované hodiny z updating JSON
    var object_odpracovano = 0;
    var object_odpracovano_hod = 0;
    var output_celkem = 0;
    for (i = updatingJSON.uzivatele.length - 1; i >= 0; i--) {
        if (updatingJSON.uzivatele[i]) {
            console.log(updatingJSON.uzivatele[i].poradi);
            if (updatingJSON.uzivatele[i].poradi == element_id) {
                console.log("true");
                object_odpracovano = updatingJSON.uzivatele[i].odhodiny;
                console.log("object_odpracovano = " + object_odpracovano);
                console.log(updatingJSON.uzivatele[i]);

                // převod odhodiny (hh:mm) na hodiny
                var splitted_object_odpracovano = object_odpracovano.split(":");
                object_odpracovano_hod = parseInt(splitted_object_odpracovano[0], 10) + parseInt(splitted_object_odpracovano[1], 10) / 60;
                console.log("object_odpracovano_hod:" + object_odpracovano_hod);


                output_celkem = object_odpracovano_hod * element_value;
                output_celkem = output_celkem.toFixed(2);
                console.log("output_celkem = " + output_celkem);

                updatingJSON.uzivatele[i].cena = element_value;
                updatingJSON.uzivatele[i].celkem = output_celkem;

            }
        }

    }





    document.getElementById("odpracovano_celkem_" + element_id).value = numberformattergetnmbr(output_celkem);

    console.groupEnd();



}

function vydajeRT_user_change(clicked_id) {
    //vydajeRT -> změna uživatele (chenget select)
    console.group("Function: vydajeRT_user_change");

    console.log("---------------------------------------------------------------------");
    console.log(updatingJSON);
    console.log("---------------------------------------------------------------------");



    changed_uzivatel = document.getElementById(clicked_id).value;
    console.log(changed_uzivatel);

    clicked_id = clicked_id.replace("odpracovano_select_", "");
    console.log("clicked_id: " + clicked_id);



    var updatingJSON_updatin_poradi = "";

    var updatingJSON_changed_uzivatel_exist = false;


    for (i = 0; i != updatingJSON.uzivatele.length; i++) { //for přes updatingJSON

        if (updatingJSON.uzivatele[i]) {

            if (updatingJSON.uzivatele[i].poradi == clicked_id) {
                updatingJSON_updatin_poradi = updatingJSON.uzivatele.indexOf(updatingJSON.uzivatele[i]);
            }
            if (updatingJSON.uzivatele[i].uzivatel == changed_uzivatel) { //jestli uživatel v updatingJSON existuje
                alert("Uživatel je již zadán");
                updatingJSON_changed_uzivatel_exist = true;
            }
        }
    }
    // alert(updatingJSON_updatin_poradi);

    console.log("updatingJSON_changed_uzivatel_exist: " + updatingJSON_changed_uzivatel_exist);





    if (updatingJSON_changed_uzivatel_exist == true) { //uživatel v updatingJSON existuje
        console.log("updatingJSON_changed_uzivatel_exist:" + "true");
        var updatingJSON_for_status = false;



        //vymazání starého uživatele (před změněním selectu) z updatingJSON
        for (x = updatingJSON.uzivatele.length - 1; x >= 0; x--) {
            if (updatingJSON.uzivatele[x]) {
                if (updatingJSON.uzivatele[x].poradi == clicked_id) {
                    console.log("updatingJSON.uzivatele[x].poradi: " + updatingJSON.uzivatele[x].poradi + " (" + x + ") ");

                    delete updatingJSON.uzivatele[x].uzivatel;
                    console.log(updatingJSON);


                }
            }
        }



        var user_to_change_found = false;

        for (i = uzivatele_array_id.length - 1; i > 0 && user_to_change_found == false; i--) { //for přes všechny existující uživatele
            var vydajeRT_exist_in_updatingJSON = false;

            for (x = updatingJSON.uzivatele.length - 1; x >= 0; x--) {
                if (updatingJSON.uzivatele[x]) {
                    // alert(updatingJSON.uzivatele[x].uzivatel);                                      //kontrola, jestli je uživatel již určen (jestli ano, tak vydajeRT_exist_in_updatingJSON nastaví na true)
                    if (updatingJSON.uzivatele[x].uzivatel == uzivatele_array_id[i]) {

                        vydajeRT_exist_in_updatingJSON = true;

                    }
                }
            }
            //-- end --
            console.log("Uživatel " + uzivatele_array_name[i] + "(" + uzivatele_array_id[i] + ") je " + vydajeRT_exist_in_updatingJSON);



            updatingJSON_updatin_poradi;

            if (vydajeRT_exist_in_updatingJSON == false) {

                user_to_change_found = true;

                var select_uzivatel;
                for (y = updatingJSON.uzivatele.length - 1; y >= 0; y--) {

                    if (updatingJSON.uzivatele[y]) {

                        if (updatingJSON.uzivatele[y].poradi == clicked_id) {

                            select_uzivatel = uzivatele_array_id[i];

                            updatingJSON_updatin_poradi = y;

                            updatingJSON.uzivatele[y].uzivatel = uzivatele_array_id[i];
                            console.log("setting updatingJSON.uzivatele[" + y + "].uzivatel   na   " + uzivatele_array_id[i]);
                            changed_uzivatel = uzivatele_array_id[i];
                            document.getElementById("odpracovano_select_" + clicked_id).value = uzivatele_array_id[i];


                        }

                    }

                    updatingJSON_for_status = true;
                }


            }
        }
    }
    ///********************************************************************** */




    console.group("searching for time and JSON of user " + searching_uzivatel + "in database");
    var searching_uzivatel = changed_uzivatel;
    var searching_zakazka = odpracovanozakazka;


    $.ajax({
        type: "POST",
        url: 'actions/zakazky_odpracovano_search.php',
        data: {
            databasetable: databasetable,
            searching_uzivatel: searching_uzivatel,
            searching_zakazka: searching_zakazka


        },

        success: function(result) {

            console.log(result);


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        },
        complete: function(result, xhr, settings) {


            result = result.responseText;


            var outputarray = result.split("--split--");
            console.log(outputarray);

            var loadedJSON = JSON.parse(outputarray[0]);
            console.log(loadedJSON);

            var changed_cena = 0;

            for (i = loadedJSON.uzivatele.length - 1; i >= 0; i--) {
                if (loadedJSON.uzivatele[i]) {
                    if (loadedJSON.uzivatele[i].uzivatel == "other") {

                        changed_cena = loadedJSON.uzivatele[i].cena;

                    }
                }
            }

            for (i = loadedJSON.uzivatele.length - 1; i >= 0; i--) {
                if (loadedJSON.uzivatele[i]) {
                    if (loadedJSON.uzivatele[i].uzivatel == changed_uzivatel) {

                        changed_cena = loadedJSON.uzivatele[i].cena;

                    }
                }
            }




            var loadedsessions = JSON.parse(outputarray[1]);
            console.log(loadedsessions);
            if (loadedsessions[0] == "error") {

                console.warn("no sessions found");
                changed_odhodiny = "00:00";
            } else {

                var changed_odhodiny_hrs = 0;
                var changed_odhodiny_min = 0;
                for (x = loadedsessions.length - 1; x >= 0; x--) {
                    console.log("for");
                    changed_odhodiny_hrs = changed_odhodiny_hrs + parseInt(loadedsessions[x].substring(0, 2));
                    changed_odhodiny_min = changed_odhodiny_min + parseInt(loadedsessions[x].substring(3, 5));
                }
                console.log("changed_odhodiny_hrs: " + changed_odhodiny_hrs);
                console.log("changed_odhodiny_min: " + changed_odhodiny_min);
                if (changed_odhodiny_min > 59) {
                    var hrs_in_min = parseInt(changed_odhodiny_min / 60, 10);
                    var hrs_in_min_ = parseInt(changed_odhodiny_min % 60, 10);
                    changed_odhodiny_hrs = changed_odhodiny_hrs + hrs_in_min;
                    changed_odhodiny_min = hrs_in_min_;


                }


                if (changed_odhodiny_hrs < 10) {
                    changed_odhodiny_hrs = "0" + changed_odhodiny_hrs;
                }
                if (changed_odhodiny_min < 10) {
                    changed_odhodiny_min = "0" + changed_odhodiny_min;
                }

                changed_odhodiny = changed_odhodiny_hrs + ":" + changed_odhodiny_min;

            }

            console.log(changed_odhodiny);
            var changed_celkem = parseInt(changed_odhodiny.substring(0, 2)) + parseInt(changed_odhodiny.substring(3, 5) / 60);
            changed_celkem = changed_celkem * changed_cena;

            changed_celkem = changed_celkem.toFixed(2);

            updatingJSON.uzivatele[updatingJSON_updatin_poradi].cena = changed_cena;
            updatingJSON.uzivatele[updatingJSON_updatin_poradi].odhodiny = changed_odhodiny;
            updatingJSON.uzivatele[updatingJSON_updatin_poradi].celkem = changed_celkem;
            updatingJSON.uzivatele[updatingJSON_updatin_poradi].uzivatel = changed_uzivatel;
            console.log(updatingJSON);


            document.getElementById("odpracovano_cena_" + clicked_id).value = changed_cena;
            document.getElementById("odpracovano_odhodiny_" + clicked_id).value = changed_odhodiny;
            document.getElementById("odpracovano_celkem_" + clicked_id).value = changed_celkem;


            console.groupEnd();
        }

    })





















    console.info(user_to_change_found)



    console.log(updatingJSON);

    /*     }else if(updatingJSON_changed_uzivatel_exist == false){
            console.log("Function:" +"updatingJSON_changed_uzivatel_exist:" + "false");
            for(y = updatingJSON.uzivatele.length -1; y >= 0; y--){
              if(updatingJSON.uzivatele[y]){ 
                if(updatingJSON.uzivatele[y].poradi == clicked_id){
                    console.log(updatingJSON.uzivatele[y] + ":" + clicked_id);
                    updatingJSON.uzivatele[y].uzivatel = changed_uzivatel;
                    console.log(updatingJSON);
                    console.log(zakazkyJSONarray);
                }
              }
            }
        }else{
        alert("Error");
        } */


    console.groupEnd();
}

function vydajeRT_table_compute() {
    console.group("Function: vydajeRT_table_compute");


    for (i = 0; i < Object.keys(zakazkyJSONarray).length; i++) {
        var vydajertsoucet = 0;
        console.group(Object.keys(zakazkyJSONarray)[i]);
        for (x = 0; x < zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele.length; x++) {
            if (zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[x]) {
                vydajertsoucet = vydajertsoucet + parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[x].celkem, 10);
            }
            //console.log(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[i]].uzivatele[x]);
        }
        console.log(vydajertsoucet);
        console.log(zakazky_array.indexOf(Object.keys(zakazkyJSONarray)[i]));
        document.getElementById("input_zak_odpracovano_" + zakazky_array.indexOf(Object.keys(zakazkyJSONarray)[i])).value = numberformattergetnmbr(vydajertsoucet);
        console.groupEnd();
    }
    freemny();
    console.groupEnd();
}




function freemny() {
    console.groupCollapsed("Function: freemny");
    for (i = zakazky_array.length - 1; i > 0; i--) {

        var kooperace = numbercreator(document.getElementById("input_zak_kooperace_" + i).value);
        console.log("i:" + i);
        console.log("kooperace: " + kooperace);
        var faktura = numbercreator(document.getElementById("input_zak_faktura_" + i).value);
        var odpracovano = numbercreator(document.getElementById("input_zak_odpracovano_" + i).value);
        var free = faktura - odpracovano - kooperace;
        document.getElementById("input_zak_free_" + i).type = "text";
        document.getElementById("input_zak_free_" + i).setAttribute("width", "");
        document.getElementById("input_zak_free_" + i).setAttribute("height", "");
        document.getElementById("input_zak_free_" + i).setAttribute("src", "");

        document.getElementById("input_zak_free_" + i).classList.remove("freered");
        document.getElementById("input_zak_free_" + i).classList.remove("freenone");
        if (free < 0) {
            document.getElementById("input_zak_free_" + i).classList.add("freered");
        } else {
            document.getElementById("input_zak_free_" + i).classList.add("freenone");
        }

        console.log(document.getElementById("input_zak_kooperace_" + i).value);
        //document.getElementById("input_zak_kooperace_" + i).value = parseFloat(kooperace).toFixed(2);
        //document.getElementById("input_zak_faktura_" + i).value = parseFloat(faktura).toFixed(2);
        //document.getElementById("input_zak_odpracovano_" + i).value = parseFloat(odpracovano).toFixed(2);
        document.getElementById("input_zak_free_" + i).value = numberformattergetnmbr(free);



    }

    console.groupEnd();
    //datablesinsert();
}

function testfnc(outputJSON, outputid, outputkooperace) {
    console.group("Function: testfnc");

    if (outputJSON) {
        console.log("if");
        outputJSON = JSON.parse(outputJSON);
        console.log(outputJSON);

        console.log(outputJSON.uzivatele.length);
        for (x = outputJSON.uzivatele.length - 1; x >= 0; x--) {
            if (outputJSON.uzivatele[x]) {
                outputJSON.uzivatele[x].celkem = "0";
                outputJSON.uzivatele[x].odhodiny = "00:00";
            }
        }
        console.log(outputkooperace);
        var kooperacejson = JSON.parse(outputkooperace);
        console.log(kooperacejson)
        outputJSON.kooperace = kooperacejson;
        zakazkyJSONarray[outputid] = outputJSON;
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
        console.log(zakazkyJSONarray);



    }
    console.groupEnd();
}



function objectlooping(casarray, userarray, zakazkaarray) {
    console.group("Function: objectlooping");
    console.log("Function:" + "objectlooping");
    console.log("objectlooping");
    console.log("cas " + casarray);
    console.log("user " + userarray);
    console.log("zakazka " + zakazkaarray);

    //v zakazkyJSONarray je nyní určená z databaze cena a uživatel, celkem a odhodiny jsou ""

    for (z = Object.keys(zakazkyJSONarray).length - 1; z >= 0; z--) { //for přes všerchny zakázky, celý object zakazkyJSONarray

        for (x = zakazkaarray.length - 1; x >= 0; x--) { //for přes sessions

            if (zakazkaarray[x] == Object.keys(zakazkyJSONarray)[z]) { //if se zakázka z sessions = zakázce určené v zakazkyJSONarray
                var other_status = true;
                for (y = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele.length - 1; y >= 0; y--) { // for přes všechny uživatele v právě prochazené části zakazkyJSONarray (z)

                    if (zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y]) {
                        if (userarray[x] == zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].uzivatel) { //pokud je užiovatel z sessions určený v zakazkyJSONarray
                            other_status = false;
                            var cas = casarray[x];
                            var splitted_cas = cas.split(":");
                            cas = parseInt(splitted_cas[0], 10) + parseInt(splitted_cas[1], 10) / 60;
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem = cas * parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].cena, 10);
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem.toFixed(2);
                            var declared_odhodiny = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny;
                            var splitted_declared_odhodiny = declared_odhodiny.split(":");
                            var declared_odhodiny_hod = parseInt(splitted_declared_odhodiny[0], 10);
                            var declared_odhodiny_min = parseInt(splitted_declared_odhodiny[1], 10);
                            var splitted_casarray_odhodiny = casarray[x].split(":");
                            var casarray_odhodiny_hod = parseInt(splitted_casarray_odhodiny[0], 10);
                            var casarray_odhodiny_min = parseInt(splitted_casarray_odhodiny[1], 10);
                            var odhodiny_hod = declared_odhodiny_hod + casarray_odhodiny_hod;
                            var odhodiny_min = declared_odhodiny_min + casarray_odhodiny_min;
                            if (odhodiny_min >= 60) {
                                odhodiny_min = odhodiny_min - 60;
                                odhodiny_hod = odhodiny_hod + 1;
                            }
                            if (odhodiny_min < 10) {
                                odhodiny_min = "0" + odhodiny_min;
                            }
                            var odhodiny = odhodiny_hod + ":" + odhodiny_min;
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny = odhodiny;


                            //zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny + casarray[x];
                            console.log(zakazkyJSONarray);

                        }
                    } else {
                        other_status = false;

                    }
                }
                if (other_status == true) {

                    var cas = casarray[x];
                    var splitted_cas = cas.split(":");
                    cas = parseInt(splitted_cas[0], 10) + parseInt(splitted_cas[1], 10) / 60;
                    for (y = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele.length - 1; y >= 0; y--) { // for přes všechny uživatele v právě prochazené části zakazkyJSONarray (y)
                        if (zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].uzivatel == "other") {
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem = cas * parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].cena, 10);
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].celkem.toFixed(2);

                            var declared_odhodiny = zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny;
                            var splitted_declared_odhodiny = declared_odhodiny.split(":");
                            var declared_odhodiny_hod = parseInt(splitted_declared_odhodiny[0], 10);
                            var declared_odhodiny_min = parseInt(splitted_declared_odhodiny[1], 10);
                            var splitted_casarray_odhodiny = casarray[x].split(":");
                            var casarray_odhodiny_hod = parseInt(splitted_casarray_odhodiny[0], 10);
                            var casarray_odhodiny_min = parseInt(splitted_casarray_odhodiny[1], 10);
                            var odhodiny_hod = declared_odhodiny_hod + casarray_odhodiny_hod;
                            var odhodiny_min = declared_odhodiny_min + casarray_odhodiny_min;
                            if (odhodiny_min >= 60) {
                                odhodiny_min = odhodiny_min - 60;
                                odhodiny_hod = odhodiny_hod + 1;
                            }
                            if (odhodiny_min < 10) {
                                odhodiny_min = "0" + odhodiny_min;
                            }
                            var odhodiny = odhodiny_hod + ":" + odhodiny_min;
                            zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].uzivatele[y].odhodiny = odhodiny;
                        }
                    }

                    console.log(zakazkyJSONarray);

                }

            }
        }




    }

    for (x = zakazky_array.length; x > 0; x--) {
        var cena = 0;
        if (document.getElementById("input_zak_odpracovano_" + x)) {
            console.log("-----------------------");

            if (zakazkyJSONarray[zakazky_array[x]]) {
                for (y = zakazkyJSONarray[zakazky_array[x]].uzivatele.length - 1; y >= 0; y--) {
                    if (zakazkyJSONarray[zakazky_array[x]].uzivatele[y]) {
                        if (zakazkyJSONarray[zakazky_array[x]].uzivatele[y].celkem != "") {
                            console.log(zakazkyJSONarray[zakazky_array[x]].uzivatele[y].celkem);

                            cena = cena + parseFloat(zakazkyJSONarray[zakazky_array[x]].uzivatele[y].celkem);
                        }
                    }
                }
            }
            //cena = cena.toFixed(2);
            //cena = numberformattergetnmbr(cena);
            cena = cena.toString();
            var abceda = "input_zak_odpracovano_" + x;
            console.log("input_zak_odpracovano_" + x);
            console.log("id:" + zakazky_array[x]);
            //alert("cena:" + cena);
            console.log("----------------------");
            document.getElementById("input_zak_odpracovano_" + x).removeAttribute("width");
            document.getElementById("input_zak_odpracovano_" + x).removeAttribute("height");
            document.getElementById("input_zak_odpracovano_" + x).removeAttribute("src");
            document.getElementById("input_zak_odpracovano_" + x).type = "text";
            document.getElementById("input_zak_odpracovano_" + x).classList.add("numberinput");
            document.getElementById(abceda).value = numberformattergetnmbr(cena).toString();


            document.getElementById("input_zak_free_" + x).classList.add("numberinput");

        }

    }

    console.log(zakazkyJSONarray);
    //zapsání součtů kooperací do html dabulky
    for (z = Object.keys(zakazkyJSONarray).length - 1; z >= 0; z--) {
        var kooperacesoucet = 0;
        console.log(z);
        for (x = 0; x < zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].kooperace.length; x++) {
            if (zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].kooperace[x]) {
                console.log(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].kooperace[x]);
                if (zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].kooperace[x].value == "") {

                } else {
                    kooperacesoucet = kooperacesoucet + parseInt(zakazkyJSONarray[Object.keys(zakazkyJSONarray)[z]].kooperace[x].value, 10);
                }
            }

        }


        var testporadi = z + 1;
        document.getElementById("input_zak_kooperace_" + zakazky_array.indexOf(Object.keys(zakazkyJSONarray)[z])).classList.add("numberinput");
        document.getElementById("input_zak_kooperace_" + zakazky_array.indexOf(Object.keys(zakazkyJSONarray)[z])).value = numberformattergetnmbr(kooperacesoucet);
    }


    console.groupEnd();
    freemny();
    datatablesinsert();

}





function kooperaceclose_confirm(save) {
    console.group("Function: kooperaceclose_confirm");
    if (save == false) {

        console.log(updatingJSON);
        console.log(zakazkyJSONarray[kooperacezakazka].kooperace);


        //jestli se kooperace změnily
        if (JSON.stringify(updatingJSON) == JSON.stringify(zakazkyJSONarray[kooperacezakazka].kooperace)) {
            console.log("zavírání beze změn");
            kooperaceclose(save);
        } else {
            console.log("proběhly změny prompt");

            var modal = document.getElementById("savemodal");
            var modalcontent = document.getElementById("save_content");
            modal.style.display = "block";
            modalcontent.innerHTML = "Proběhly Změny<br>Opravdu chcete zavřít<br>";

            var savebttn = document.createElement("button");
            savebttn.type = "button";
            savebttn.className = "prompt_save_bttn";
            savebttn.innerHTML = "Uložit";
            savebttn.onclick = function() { kooperaceclose(save = true) };

            var closebttn = document.createElement("button");
            closebttn.type = "button";
            closebttn.className = "prompt_close_bttn";
            closebttn.innerHTML = "Zavřít";
            closebttn.onclick = function() { kooperaceclose(save = false) };

            var cancelbttn = document.createElement("button");
            cancelbttn.type = "button";
            cancelbttn.className = "prompt_reset_bttn";
            cancelbttn.innerHTML = "Zrušit";
            cancelbttn.onclick = function() { modal.style.display = "none"; };

            modalcontent.appendChild(savebttn);
            modalcontent.appendChild(closebttn);
            modalcontent.appendChild(cancelbttn);


        }
    } else {
        var close = false;
        kooperaceclose(save);
    }
    console.groupEnd();
}

function kooperaceclose(save, close) {
    console.group("Function: kooperaceclose");

    if (save == true) {
        console.log("close with saving");
        //ajax
        var updateJSON = JSON.stringify(updatingJSON);
        $.ajax({
            type: "POST",
            url: 'actions/zakazky_kooperace_update.php',
            data: {
                databasetable: databasetable,
                kooperacezakazka: kooperacezakazka,
                updateJSON: updateJSON



            },

            success: function(result) {
                console.log(result);
                if (result == "success") {

                    //sčítání koperací
                    var kooperacevalue = 0;
                    for (x = updatingJSON.length - 1; x >= 0; x--) {
                        if (updatingJSON[x]) {
                            if (updatingJSON[x].value == "") {

                            } else {
                                kooperacevalue = kooperacevalue + parseFloat(updatingJSON[x].value, 10);
                            }
                        }

                    }
                    var kooperaceporadi = zakazky_array.indexOf(kooperacezakazka);
                    console.log(kooperaceporadi);
                    console.log(kooperacevalue);
                    document.getElementById("input_zak_kooperace_" + kooperaceporadi).value = numbercreator(kooperacevalue);
                    freemny();

                    zakazkyJSONarray[kooperacezakazka].kooperace = updatingJSON;


                    var modal2 = document.getElementById("savemodal");
                    modal2.style.display = "none";


                    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"good\">Úspěšně vloženo</div>";
                } else {
                    document.getElementById("ajax_vysledek").innerHTML = "<div class=\"bad\">Mysql error</div>";

                }
                setTimeout(function() {
                    document.getElementById("ajax_vysledek").innerHTML = "";

                }, 5000);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });



    } else {
        console.log("close without saving");
        updatingJSON = {};

        var modalcontent = document.getElementById("kooperace_content");
        modalcontent.innerHTML = "";
        var modal = document.getElementById("modal");
        modal.style.display = "none";
        var modal2 = document.getElementById("savemodal");
        modal2.style.display = "none";
    }



    console.groupEnd();
}

function kooperace_change(clicked_id, status) {
    console.group("Function: kooperace_change");
    //console.log(document.getElementById(clicked_id));
    var inputvalue = numbercreator(document.getElementById(clicked_id).value);
    console.log(clicked_id);
    console.log(status);

    if (status == "name") {
        var clicked_poradi = clicked_id.replace("kooperace_name_", "");
        updatingJSON[clicked_poradi].name = inputvalue;



    } else if (status == "value") {

        var clicked_line = clicked_id.replace("kooperace_value_", "");
        updatingJSON[clicked_line].value = inputvalue;
        console.log(inputvalue);
        var kooperacevalue = updatingJSON[clicked_line].value;
        console.log(kooperacevalue);

        var kooperacezaplaceno = 0;
        for (i = 0; i < updatingJSON[clicked_line].zaplaceno.length; i++) {
            if (updatingJSON[clicked_line].zaplaceno[i] != "") {
                console.log(updatingJSON[clicked_line].zaplaceno[i]);
                kooperacezaplaceno = kooperacezaplaceno + parseFloat(updatingJSON[clicked_line].zaplaceno[i]);
            }
        }

        document.getElementById("kooperace_free_" + clicked_line).value = numberformattergetnmbr(kooperacevalue - kooperacezaplaceno);

    } else if (status == "zaplaceno") {
        var splittedClickedId = clicked_id.split("_");
        console.log(splittedClickedId);

        var clicked_line = splittedClickedId[2];
        var clicked_poradi = splittedClickedId[3];

        updatingJSON[clicked_line].zaplaceno[clicked_poradi] = inputvalue;

        var kooperacevalue = updatingJSON[clicked_line].value;
        console.log(kooperacevalue);
        var kooperacezaplaceno = 0;

        for (i = 0; i < updatingJSON[clicked_line].zaplaceno.length; i++) {
            if (updatingJSON[clicked_line].zaplaceno[i]) {
                if (updatingJSON[clicked_line].zaplaceno[i] != "") {
                    console.log(updatingJSON[clicked_line].zaplaceno[i]);
                    kooperacezaplaceno = kooperacezaplaceno + parseFloat(updatingJSON[clicked_line].zaplaceno[i]);
                }
            }
        }

        document.getElementById("kooperace_free_" + clicked_line).value = numberformattergetnmbr(kooperacevalue - kooperacezaplaceno);
    }

    console.log(updatingJSON);



    console.groupEnd();
}

function kooperace_block_delete(clicked_id) {
    console.group("Function: kooperace_block_delete");

    var modal = document.getElementById("savemodal");
    var modalcontent = document.getElementById("save_content");
    modal.style.display = "block";
    modalcontent.innerHTML = "Opravdu chcete smazat?<br>";

    var deletebttn = document.createElement("button");
    deletebttn.type = "button";
    deletebttn.className = "prompt_close_bttn";
    deletebttn.innerHTML = "smazat";
    deletebttn.onclick = function() { kooperace_block_delete_confirm(clicked_id) };

    var closebttn = document.createElement("button");
    closebttn.type = "button";
    closebttn.className = "prompt_reset_bttn";
    closebttn.innerHTML = "zrušit";
    closebttn.onclick = function() { modal.style.display = "none"; };


    modalcontent.appendChild(deletebttn);
    modalcontent.appendChild(closebttn);


    console.groupEnd();
}

function kooperace_block_delete_confirm(clicked_id) {
    console.group("Function: kooperace_block_delete_confirm");


    var poradi = clicked_id.replace("kooperace_delete_", "");
    document.getElementById("kooperace_row_" + poradi).remove();
    delete updatingJSON[poradi];

    var modal = document.getElementById("savemodal");
    modal.style.display = "none";
    console.groupEnd();
}

function kooperace_block_add() {
    console.group("Function: kooperace_block_add");

    var kooperacetabulka = document.getElementById("kooperacetable");

    var kooperace_poradi = updatingJSON.length;
    var insertjson = { "name": "", "value": "", "zaplaceno": ["0"] };
    updatingJSON.push(insertjson);

    var row = kooperacetabulka.insertRow(-1);
    row.id = "kooperace_row_" + kooperace_poradi;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);


    var nameinput = document.createElement("input");
    nameinput.type = "text";
    nameinput.id = "kooperace_name_" + kooperace_poradi;
    nameinput.oninput = function() { kooperace_change(this.id, status = "name") };



    var valueinput = document.createElement("input");
    valueinput.type = "text";
    valueinput.value = 0;
    valueinput.id = "kooperace_value_" + kooperace_poradi;
    valueinput.classList.add("numberinput");
    valueinput.oninput = function() { numberformatterevent(event), kooperace_change(this.id, status = "value") };



    //zaplaceno

    var zaplacenoele = document.createElement("div");
    zaplacenoele.id = "kooperace_zaplaceno_" + i;
    zaplacenoele.className = "kooperace_zaplaceno";

    var zaplacenoadd = document.createElement("input");
    zaplacenoadd.type = "button";
    zaplacenoadd.value = "+";
    zaplacenoadd.id = "kooperace_zaplaceno_" + i;
    zaplacenoadd.className = "kooperace_zaplaceno_add";
    zaplacenoadd.onclick = function() { kooperace_zaplaceno_add(this.id, status = "zaplaceno") };

    var zaplacenoelediv = document.createElement("div");
    zaplacenoelediv.id = "kooperace_zaplaceno_div_" + i;



    var zaplacenodiv = document.createElement("div");
    zaplacenodiv.id = "kooperace_zaplaceno_element_div_" + i + "_0";
    zaplacenodiv.className = "kooperace_zaplaceno_div";

    var zaplacenoinput = document.createElement("input");
    zaplacenoinput.type = "text";
    zaplacenoinput.classList.add("numberinput");
    zaplacenoinput.value = 0;
    zaplacenoinput.id = "kooperace_zaplaceno_" + i + "_0";
    zaplacenoinput.oninput = function() { numberformatterevent(event), kooperace_change(this.id, status = "zaplaceno") };

    var zaplaceno_delete = document.createElement("input");
    zaplaceno_delete.type = "button";
    zaplaceno_delete.value = "x";
    zaplaceno_delete.id = "kooperace_zaplaceno_delete_" + i + "_0";
    zaplaceno_delete.onclick = function() { kooperace_zaplaceno_delete(this.id) };




    zaplacenoelediv.appendChild(zaplacenodiv);
    zaplacenoele.appendChild(zaplacenoadd);
    zaplacenoele.appendChild(zaplacenoelediv);
    cell4.appendChild(zaplacenoele);
    zaplacenodiv.appendChild(zaplacenoinput);
    zaplacenodiv.appendChild(zaplaceno_delete);



    //zaplaceno


    var freeinput = document.createElement("input");
    freeinput.type = "number";
    freeinput.value = 0;
    freeinput.id = "kooperace_free_" + kooperace_poradi;

    var deleteinput = "<svg class=\"dochazka_delete_buttn\" onclick=\"kooperace_block_delete(this.id)\" id=\"kooperace_delete_" + kooperace_poradi + "\" fill=\"#ffffff\" viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"></path></svg>";

    cell2.appendChild(nameinput);
    cell3.appendChild(valueinput);

    cell5.appendChild(freeinput);
    cell1.innerHTML = deleteinput;

    console.groupEnd();
}

function kooperaceopen(clicked_id) {

    console.group("Function: kooperaceopen");



    console.log(clicked_id);
    var button_id = clicked_id.replace("input_zak_kooperace_", "");
    var zak_id = zakazky_array[button_id];
    kooperacezakazka = zak_id;
    console.log(button_id);
    console.log(zak_id);
    kooperacebutton = button_id;



    var modal = document.getElementById("modal");
    var modalcontent = document.getElementById("kooperace_content");
    modalcontent.innerHTML = "Načítání";
    modal.style.display = "block";


    var kooperacetable = document.createElement("table");
    kooperacetable.className = "kooperace_table";
    kooperacetable.id = "kooperacetable";

    updatingJSON = JSON.parse(JSON.stringify(zakazkyJSONarray[zak_id].kooperace));
    console.log(updatingJSON);

    var rownadpisy = kooperacetable.insertRow(-1);
    rownadpisy.id = "kooperace_row_nadpisy";
    var cell1nadpisy = rownadpisy.insertCell(0);
    var cell2nadpisy = rownadpisy.insertCell(1);
    var cell3nadpisy = rownadpisy.insertCell(2);
    var cell4nadpisy = rownadpisy.insertCell(3);
    var cell5nadpisy = rownadpisy.insertCell(4);

    cell2nadpisy.innerHTML = 'Firma';
    cell3nadpisy.innerHTML = 'Faktura';
    cell4nadpisy.innerHTML = 'Zaplaceno';
    cell5nadpisy.innerHTML = 'Zbývá';

    for (i = 0; i < updatingJSON.length; i++) {
        if (updatingJSON[i]) {

            var row = kooperacetable.insertRow(-1);
            row.id = "kooperace_row_" + i;
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            var loadedjson = updatingJSON[i];
            console.log(loadedjson);

            var nameinput = document.createElement("input");
            nameinput.type = "text";
            nameinput.value = loadedjson.name;
            nameinput.id = "kooperace_name_" + i;
            nameinput.oninput = function() { kooperace_change(this.id, status = "name") };


            var valueinput = document.createElement("input");
            valueinput.type = "text";
            valueinput.value = numberformattergetnmbr(loadedjson.value);
            valueinput.id = "kooperace_value_" + i;
            valueinput.classList.add("numberinput");
            valueinput.oninput = function() { numberformatterevent(event), kooperace_change(this.id, status = "value") };


            var zaplacenoele = document.createElement("div");
            zaplacenoele.id = "kooperace_zaplaceno_" + i;
            zaplacenoele.className = "kooperace_zaplaceno";

            var zaplacenoadd = document.createElement("input");
            zaplacenoadd.type = "button";
            zaplacenoadd.value = "+";
            zaplacenoadd.id = "kooperace_zaplaceno_" + i;
            zaplacenoadd.className = "kooperace_zaplaceno_add";
            zaplacenoadd.onclick = function() { kooperace_zaplaceno_add(this.id, status = "zaplaceno") };

            var zaplacenoelediv = document.createElement("div");
            zaplacenoelediv.id = "kooperace_zaplaceno_div_" + i;


            var zaplaceno_soucet = 0;
            for (x = 0; x < updatingJSON[i].zaplaceno.length; x++) {
                if (updatingJSON[i].zaplaceno[x]) {
                    var zaplacenodiv = document.createElement("div");
                    zaplacenodiv.id = "kooperace_zaplaceno_element_div_" + i + "_" + x;
                    zaplacenodiv.classList.add("kooperace_zaplaceno_div");

                    var zaplacenoinput = document.createElement("input");
                    zaplacenoinput.type = "text";
                    zaplacenoinput.classList.add("numberinput");
                    zaplacenoinput.value = numberformattergetnmbr(loadedjson.zaplaceno[x]);
                    zaplacenoinput.id = "kooperace_zaplaceno_" + i + "_" + x;
                    zaplacenoinput.oninput = function() { numberformatterevent(event), kooperace_change(this.id, status = "zaplaceno") };

                    var zaplaceno_delete = document.createElement("input");
                    zaplaceno_delete.type = "button";
                    zaplaceno_delete.value = "x";
                    zaplaceno_delete.id = "kooperace_zaplaceno_delete_" + i + "_" + x;
                    zaplaceno_delete.onclick = function() { kooperace_zaplaceno_delete(this.id) };

                    zaplaceno_soucet = zaplaceno_soucet + parseInt(loadedjson.zaplaceno[x], 10);
                }

                zaplacenoelediv.appendChild(zaplacenodiv);
                zaplacenoele.appendChild(zaplacenoadd);
                zaplacenoele.appendChild(zaplacenoelediv);
                cell4.appendChild(zaplacenoele);
                zaplacenodiv.appendChild(zaplacenoinput);
                zaplacenodiv.appendChild(zaplaceno_delete);

            }

            var freeinput = document.createElement("input");
            freeinput.type = "text";
            freeinput.value = numberformattergetnmbr(loadedjson.value - zaplaceno_soucet);
            freeinput.id = "kooperace_free_" + i;
            freeinput.classList.add("numberinput");


            var deleteinput = "<svg class=\"dochazka_delete_buttn\" onclick=\"kooperace_block_delete(this.id)\" id=\"kooperace_delete_" + i + "\" fill=\"#ffffff\" viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\"><path d=\"M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z\"></path></svg>";

            cell2.appendChild(nameinput);
            cell3.appendChild(valueinput);

            cell5.appendChild(freeinput);
            cell1.innerHTML = deleteinput;
        }

    }

    var addbutton = document.createElement("input");
    addbutton.type = "button";
    addbutton.value = "+";
    addbutton.id = "kooperace_button_add";
    addbutton.className = "odpracovano_button_add";
    addbutton.onclick = function() { kooperace_block_add() };

    var savebutton = document.createElement("input");
    savebutton.type = "button";
    savebutton.value = "Uložit";
    savebutton.className = "odpracovano_save_bttn";
    savebutton.onclick = function() { kooperaceclose_confirm(save = true) };

    modalcontent.innerHTML = "";
    modalcontent.appendChild(kooperacetable);
    modalcontent.appendChild(addbutton);
    modalcontent.appendChild(savebutton);


    console.groupEnd();
}

function kooperace_zaplaceno_delete(clicked_id) {
    console.group("Function: kooperace_zaplaceno_delete_");
    console.log(clicked_id);
    var splittedClickedId = clicked_id.split("_");
    console.log(splittedClickedId);

    var kooperace_line = splittedClickedId[3];
    var kooperace_poradi = splittedClickedId[4];

    delete updatingJSON[kooperace_line].zaplaceno[kooperace_poradi];
    console.log(updatingJSON);
    document.getElementById("kooperace_zaplaceno_element_div_" + kooperace_line + "_" + kooperace_poradi).remove();
    console.groupEnd();
}

function kooperace_zaplaceno_add(clicked_id) {
    console.group("Function kooperace_zaplaceno_add");
    var clicked_poradi = clicked_id.replace("kooperace_zaplaceno_", "");
    var insert_poradi = updatingJSON[parseInt(clicked_poradi, 10)].zaplaceno.length;
    console.log(clicked_poradi);






    var zaplacenodiv = document.createElement("div");
    zaplacenodiv.id = "kooperace_zaplaceno_element_div_" + clicked_poradi + "_" + insert_poradi;
    zaplacenodiv.className = "kooperace_zaplaceno_div";

    var zaplacenoinput = document.createElement("input");
    zaplacenoinput.type = "text";
    zaplacenoinput.classList.add("numberinput");
    zaplacenoinput.value = 0;
    zaplacenoinput.id = "kooperace_zaplaceno_" + clicked_poradi + "_" + insert_poradi;
    zaplacenoinput.oninput = function() { numberformatterevent(event), kooperace_change(this.id, status = "zaplaceno") };

    var zaplaceno_delete = document.createElement("input");
    zaplaceno_delete.type = "button";
    zaplaceno_delete.value = "x";
    zaplaceno_delete.id = "kooperace_zaplaceno_delete_" + clicked_poradi + "_" + insert_poradi;
    zaplaceno_delete.onclick = function() { kooperace_zaplaceno_delete(this.id) };






    document.getElementById("kooperace_zaplaceno_div_" + clicked_poradi).appendChild(zaplacenodiv);
    zaplacenodiv.appendChild(zaplacenoinput);
    zaplacenodiv.appendChild(zaplaceno_delete);

    updatingJSON[clicked_poradi].zaplaceno.push("0");


    console.groupEnd()
}




function tiskjs(clicked_id) {
    console.group("Function: tiskjs");
    var zakazkaporadi = clicked_id.replace("tisk_delete_", "");
    var zakazkaid = zakazky_array[zakazkaporadi];
    console.log(zakazkaporadi);
    console.log(zakazkaid);

    var zak_id = zakazkaid;



    //informace z tabulky
    var zakazka_nazev = document.getElementById("input_zak_name_" + zakazkaporadi).value;
    var zakazka_osoba = document.getElementById("input_zak_osoba_" + zakazkaporadi).value;
    var zakazka_osoba_name = uzivatele_array_name[uzivatele_array_id.indexOf(zakazka_osoba)];
    var zakazka_zahajeni = document.getElementById("input_zak_zahajeni_" + zakazkaporadi).value;
    if (zakazka_zahajeni) {
        var zakazka_zahajeni_date = new Date(zakazka_zahajeni);
        var zakazka_zahajeni_date_format = zakazka_zahajeni_date.getDate() + ". " + zakazka_zahajeni_date.getMonth() + ". " + zakazka_zahajeni_date.getFullYear();
    }
    var zakazka_ukonceni = document.getElementById("input_zak_ukonceni_" + zakazkaporadi).value;
    if (zakazka_ukonceni) {
        var zakazka_ukonceni_date = new Date(zakazka_ukonceni);
        var zakazka_ukonceni_date_format = zakazka_ukonceni_date.getDate() + ". " + zakazka_ukonceni_date.getMonth() + ". " + zakazka_ukonceni_date.getFullYear();
    }
    var zakazka_faktura = document.getElementById("input_zak_faktura_" + zakazkaporadi).value;
    var parts = zakazka_faktura.toString().split(".");
    zakazka_faktura = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var zakazka_ziskztrata = document.getElementById("input_zak_free_" + zakazkaporadi).value;
    var parts = zakazka_ziskztrata.toString().split(".");
    zakazka_ziskztrata = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var zakazka_kooperace = document.getElementById("input_zak_kooperace_" + zakazkaporadi).value;
    var parts = zakazka_kooperace.toString().split(".");
    zakazka_kooperace = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var zakazka_vydajert = document.getElementById("input_zak_odpracovano_" + zakazkaporadi).value;
    var parts = zakazka_vydajert.toString().split(".");
    zakazka_vydajert = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    console.log(zakazka_nazev);
    console.log(zakazka_osoba);
    console.log(zakazka_zahajeni);
    console.log(zakazka_ukonceni);
    console.log(zakazka_faktura);
    console.log(zakazka_ziskztrata);
    //------------------








    var tiskdiv = window.open('', '', '');
    console.time();
    // tiskdiv.document.body.className = "tiskdiv";


    var rttext = document.createElement("span");
    rttext.style.float = "left";
    rttext.innerHTML = "Road Traffic a.s.";

    /*   var nzvzakazky = document.createElement("div");
        nzvzakazky.style.float = "left";
        nzvzakazky.innerHTML = zakazka_nazev; */

    var br = document.createElement("br");
    var br1 = document.createElement("br");
    var hr = document.createElement("hr");

    var content = document.createElement("div");
    content.className = "printcontent";

    var basictable = document.createElement("table");
    var osobarow = basictable.insertRow(0);


    var csslinkglobal = document.createElement("link");
    csslinkglobal.rel = "stylesheet";
    csslinkglobal.href = "http://192.168.1.109/dochazka/css/global.css";
    var csslinkzakazky = document.createElement("link");
    csslinkzakazky.rel = "stylesheet";
    csslinkzakazky.href = "http://192.168.1.109/dochazka/css/zakazky.css"




    tiskdiv.document.head.appendChild(csslinkglobal);
    tiskdiv.document.head.appendChild(csslinkzakazky);


    tiskdiv.document.body.appendChild(rttext);
    tiskdiv.document.body.appendChild(br);
    tiskdiv.document.body.appendChild(hr);
    tiskdiv.document.body.appendChild(br1);
    tiskdiv.document.body.appendChild(content);



    //0. tabulka (000 = [tabulka][radek][bunka])
    var table0 = document.createElement("table");
    table0.className = "print_table0";

    var row00 = table0.insertRow(0);
    var row01 = table0.insertRow(1);
    var row02 = table0.insertRow(2);
    var row03 = table0.insertRow(3);

    var cell000 = row00.insertCell(0);
    cell000.colSpan = 2;
    cell000.style.fontSize = 20;
    var cell010 = row01.insertCell(0);
    var cell011 = row01.insertCell(1);
    var cell020 = row02.insertCell(0);
    var cell021 = row02.insertCell(1);
    var cell030 = row03.insertCell(0);
    var cell031 = row03.insertCell(1);

    cell000.innerHTML = zakazka_nazev
    cell010.innerHTML = "Zodpovědná osoba";
    cell011.innerHTML = zakazka_osoba_name;
    cell020.innerHTML = "Zahájení";
    cell021.innerHTML = zakazka_zahajeni_date_format;
    cell030.innerHTML = "Ukončení";
    cell031.innerHTML = zakazka_ukonceni_date_format;
    //document.body.style.background = "white";
    //-------------------------------------------------

    //1. tabulka (111 = [tabulka][radek][bunka])
    var table1 = document.createElement("table");
    table1.className = "print_table1";

    var row10 = table1.insertRow(0);
    var row11 = table1.insertRow(1);

    var cell100 = row10.insertCell(0);
    var cell101 = row10.insertCell(1);
    var cell102 = row10.insertCell(2);
    var cell103 = row10.insertCell(3);
    var cell110 = row11.insertCell(0);
    var cell111 = row11.insertCell(1);
    var cell112 = row11.insertCell(2);
    var cell113 = row11.insertCell(3);
    cell100.innerHTML = "Faktura";
    cell101.innerHTML = "Kooperace";
    cell102.innerHTML = "Výdaje RT";
    cell103.innerHTML = "Zisk/Ztrata";

    cell110.innerHTML = zakazka_faktura;
    cell111.innerHTML = zakazka_kooperace;
    cell112.innerHTML = zakazka_vydajert;
    cell113.innerHTML = zakazka_ziskztrata;
    //document.body.style.background = "white";
    //-------------------------------------------------


    var containerdiv0 = document.createElement("div");
    containerdiv0.className = "print_containerdiv";
    var containerdiv1 = document.createElement("div");
    containerdiv1.className = "print_containerdiv";



    //2. tabulka (222 = [tabulka][radek][bunka])
    var table2nadpis = document.createElement("div");
    table2nadpis.className = "print_tablenadpis";
    table2nadpis.innerHTML = "VydajeRT";
    var table2 = document.createElement("table");
    table2.className = "print_table2";

    var row20 = table2.insertRow(0);

    var cell200 = row20.insertCell(0);
    var cell201 = row20.insertCell(1);
    var cell202 = row20.insertCell(2);
    var cell203 = row20.insertCell(3);

    cell200.innerHTML = "Jméno";
    cell201.innerHTML = "Hodinová sazba";
    cell202.innerHTML = "Odpracované Hodiny";
    cell203.innerHTML = "Mzda";


    for (i = 0; i <= zakazkyJSONarray[zakazkaid].uzivatele.length + 1; i++) {
        if (zakazkyJSONarray[zakazkaid].uzivatele[i]) {
            if (zakazkyJSONarray[zakazkaid].uzivatele[i].uzivatel != "other") {
                var row = table2.insertRow(-1);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);

                cell0.innerHTML = uzivatele_array_name[uzivatele_array_id.indexOf(zakazkyJSONarray[zakazkaid].uzivatele[i].uzivatel)];
                cell1.innerHTML = zakazkyJSONarray[zakazkaid].uzivatele[i].cena;
                cell2.innerHTML = zakazkyJSONarray[zakazkaid].uzivatele[i].odhodiny;
                var parts = zakazkyJSONarray[zakazkaid].uzivatele[i].celkem.toString().split(".");
                var mzda = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                cell3.innerHTML = mzda;
            }
        }
    }




    //-------------------------------------------------
    //2. tabulka (222 = [tabulka][radek][bunka])


    var table3nadpis = document.createElement("div");
    table3nadpis.className = "print_tablenadpis";
    table3nadpis.innerHTML = "Kooperace";
    var table3 = document.createElement("table");
    table3.className = "print_table2";
    if (zakazkyJSONarray[zakazkaid].kooperace.length > 0) {


        var row30 = table3.insertRow(0);
        var cell300 = row30.insertCell(0);
        var cell301 = row30.insertCell(1);
        var cell302 = row30.insertCell(2);

        cell300.innerHTML = "Firma";
        cell301.innerHTML = "Faktura"
        cell302.innerHTML = "Zaplaceno"

        for (i = 0; i < zakazkyJSONarray[zakazkaid].kooperace.length; i++) {
            if (zakazkyJSONarray[zakazkaid].kooperace[i]) {
                var row = table3.insertRow(-1);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);

                cell0.innerHTML = zakazkyJSONarray[zakazkaid].kooperace[i].name;
                cell1.innerHTML = numberformattergetnmbr(zakazkyJSONarray[zakazkaid].kooperace[i].value);

                for (x = 0; x < zakazkyJSONarray[zakazkaid].kooperace[i].zaplaceno.length; x++) {

                    if(zakazkyJSONarray[zakazkaid].kooperace[i].zaplaceno[x]){
                        cell2.innerHTML = cell2.innerHTML + numberformattergetnmbr(zakazkyJSONarray[zakazkaid].kooperace[i].zaplaceno[x]) + "<br>";
                    }
                }
            }
        }
    }
    //-------------------------------------------------



    content.appendChild(table0);
    content.appendChild(table1);
    content.appendChild(containerdiv0);
    content.appendChild(containerdiv1);
    containerdiv0.appendChild(table2nadpis);
    containerdiv0.appendChild(table2);
    containerdiv1.appendChild(table3nadpis);
    containerdiv1.appendChild(table3);

    document.body.style.background = "white";


    console.timeEnd();

    function test(){ 
            setTimeout(function(){
                if (tiskdiv.getComputedStyle(table0).getPropertyValue('padding-top') != "10px") {
                    console.log(tiskdiv.getComputedStyle(table0).getPropertyValue('padding-top'));
                    test()
                } else {
                    whilestatus = true;
                    console.log(tiskdiv.getComputedStyle(table0).getPropertyValue('padding-top'));
                    tiskdiv.print();
                    //tiskdiv.close();
                }
        }, 10);
    }
    test();







    //document.body.style = "";


    console.groupEnd();
}

function numberformatterevent(event) {
    console.group("function: numberformatter");
    var value = event.target.value;
    value = value.replace(/[^0123456789.-]/gm, '');


    if (value.includes(".")) {
        var splittedvalue = value.split(".");
        value = splittedvalue[0];
        value = value + ".";
        value = value.replace(/ /g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        for (i = 1; i < splittedvalue.length; i++) {

            value = value + splittedvalue[i];

        }
        var splittedvalue2 = value.split(".");
        value = splittedvalue2[0] + "." + splittedvalue2[1].substring(0, 2);
    } else {
        value = value.replace(/ /g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    event.target.value = value;
    console.groupEnd();
}

function numberformattergetnmbr(nmbr) {
    console.groupCollapsed("function: numberformattergetnmbr");
    console.log(nmbr);
    var value = 0;
    if (nmbr) {
        value = nmbr;
    }
    value = value.toString();
    value = value.replace(/[^0123456789.-]/gm, '');


    if (value.includes(".")) {
        var splittedvalue = value.split(".");
        value = splittedvalue[0];
        value = value + ".";
        value = value.replace(/ /g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        for (nmbrfor = 1; nmbrfor < splittedvalue.length; nmbrfor++) {

            value = value + splittedvalue[nmbrfor];

        }
        var splittedvalue2 = value.split(".");
        value = splittedvalue2[0] + "." + splittedvalue2[1].substring(0, 2);
    } else {
        value = value.replace(/ /g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    console.log(value);
    console.groupEnd();
    return value;

}


//sliced number to js number
function numbercreator(number) {

    console.groupCollapsed("function: numbercreator");
    console.log(number);
    //alert(number);

    number = number.replaceAll(" ", "");


    number = parseFloat(number);
    console.log(number);
    console.groupEnd();
    return number;
}


function alertfnc(td) {
    alert(JSON.stringify(td));
}