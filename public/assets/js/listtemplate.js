$(function(){
    $(document).on('click', '.delete-master', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/template/delete/" + data_id;
        e.preventDefault(); //cancel default action
        
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
            title: json.title_alert_confirm,
            text: json.text_alert_delete_pbl,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: json.btn_alert_confirm,
            cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
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
                                    window.location.reload();
                                });
                            }
                        }
                    })
                }
            });
        });
    });
})