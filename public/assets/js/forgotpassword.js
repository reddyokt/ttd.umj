$(document).on("submit", "#form_reset_password", function(e) {
    var url = "/changingpassword";
    var form_data = new FormData($(this)[0]);
    var locale = $('html').attr('lang');
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host;
    var jsonfile = baseUrl+'/assets/'+locale+'.json';
    $.getJSON(jsonfile, function(json) {
        Swal.fire({
            title: json.title_alert_confirm,
            text: json.text_alert_pbl, 
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: json.btn_alert_confirm,
            cancelButtonText: json.btn_alert_cancel,
        })
        .then(function(result){
            if(result.value){
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'POST',
                    data: form_data,
                    url: url,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        if (data.status) {
                            Swal.fire({
                                title: json.title_alert_success,
                                text: data.message,
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: json.btn_alert_ok,
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                window.location.replace(data.redirect_url);
                            });
                        } else {
                            Swal.fire({
                                title: json.title_alert_failed,
                                text: data.message,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: json.btn_alert_ok,
                                customClass: {
                                    confirmButton: "btn btn-danger"
                                }
                            });
                        }
                    }
                });
            }
        });
    });

    return false;
});