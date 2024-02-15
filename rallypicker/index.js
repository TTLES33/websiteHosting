
$.ajax({
    type: "POST",
    url: 'stages.json',
    origin: 'file:///E:/Documents/programming/eawrcapp/index.html',


success: function(result) {
        console.log("success");

      console.log(result);

    },
    error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
    }
});
function checkboxcheck( chckindex ){
    console.log("checkboxcheck");
    var checkbox = document.getElementsByName("locationselect")[chckindex];
    var rallytext = document.getElementById("locationtitle");

    console.log(checkbox);
    if( checkbox.checked == true){
        checkbox.checked = false;
        rallytext.classList.remove("locationtitle_checked");
    }else{
        checkbox.checked = true;
        rallytext.classList.add("locationtitle_checked");
    }
}

function locationexpand( divindex ){
    var locationdiv = document.getElementsByClassName("stagetablecontainer")[divindex];
if(locationdiv.style.display == "none"){
    locationdiv.style.display = "block";
    var table = document.getElementsByClassName("stagetable")[divindex];
    table.innerHTML = "";

}else{
    locationdiv.style.display = "none";
}
}