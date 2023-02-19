$(function(){
    $(document).on("submit", "#form_add_lap", function(e) {
        var url = "/report/store";
        var form_data = new FormData($('#form_add_lap')[0]);
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
                cancelButtonText: json.btn_alert_cancel
            })
            .then(function(result) {
                if (result.value) {
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
                                    icon: "success"
                                }).then(function() {
                                    window.location.replace(data.redirect_url);
                                })
                            } else {
                                Swal.fire({
                                    title: json.title_alert_warning,
                                    text: data.message, 
                                    icon: "warning"
                                })
                            }
                        }
                    });
                }
            })
        });

        return false;
    });

    
    $(document).on("submit", "#form_edit_lap", function(e) {
        var id = $('#lap_id').val();
        var url = "/report/update/"+id;
        var form_data = new FormData($('#form_edit_lap')[0]);
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
                cancelButtonText: json.btn_alert_cancel
            })
            .then(function(result) {
                if (result.value) {
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
                                    icon: "success"
                                }).then(function() {
                                    window.location.replace(data.redirect_url);
                                })
                            } else {
                                Swal.fire({
                                    title: json.title_alert_warning,
                                    text: data.message, 
                                    icon: "warning"
                                })
                            }
                        }
                    });
                }
            })
        });

        return false;
    });
})