
function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function odhlaseni(){
    document.cookie = "cookie_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "index.php";
}


function printDiv(divName){
    console.groupCollapsed("printDiv");
  var printContents = document.getElementById(divName).innerHTML;
  console.log(printContents
    );
  var originalContents = document.body.innerHTML;
        
  document.body.innerHTML = printContents;
  document.body.style.backgroundColor = "white";
  window.print();
  document.body.style = "";

  document.body.innerHTML = originalContents;
console.groupEnd();


}
function notlogedin(page){

alert(page);
window.location.replace("/login/index.php?page="+page);

}

function VersionChecker(){

  $.ajax({
    type: "POST",
    url: 'actions/global_version_checker.php',
    data: {


    },

    success: function (result) {
      console.log(result);
      var versionjson = JSON.parse(result);
      var newestversion = versionjson.version;
        console.log(newestversion);
      var cookies = document.cookie.split("; ");
      var update = true;
      for(i = 0; i < cookies.length; i++){
        if(cookies[i].split("=")[0] == "version"){
          if(cookies[i].split("=")[1] == newestversion){
            update = false;
          }
        }
      }

      if(update == true){
       // alert("update");
        var alertmsg = document.createElement("div");
          alertmsg.className = "updatemodal";
          alertmsg.innerHTML = "Aktualizace"
        document.body.appendChild(alertmsg);

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var expiration = new Date(year + 1, month, day);
        expiration = expiration.toGMTString();
        document.cookie = "version=" + newestversion + "; expires=" + expiration;
        caches.keys().then(function(names) {
          for (let name of names)
              caches.delete(name);
          });
       location.reload(true);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });
}

