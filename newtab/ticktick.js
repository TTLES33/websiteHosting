function ticktickone(){ 
    $.ajax({
        type: "GET",
        url: 'https://ticktick.com/oauth/authorize?scope=tasks:read&client_id=Z769lTzOTTaVfI9l76&response_type=code',


        success: function (result) {
        console.log("redirectiong");

        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
    });
   }
