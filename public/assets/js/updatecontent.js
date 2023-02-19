$(function(){
    $(document).ready(function(){
        var tipe = $('#tipe').val();
        switch(tipe){
            case 'url':
                $('#divIcon').show();
                $('#divUrl').show();
                $('#divText').hide();
                $('#divFile').hide();
                break;
            case 'socmed':
                $('#divIcon').show();
                $('#divUrl').show();
                $('#divText').hide();
                $('#divFile').hide();
                break;
            case 'file':
                $('#divIcon').show();
                $('#divUrl').remove();
                $('#divText').hide();
                $('#divFile').show();
                break;
            case 'video':
                $('#divIcon').remove();
                $('#divUrl').remove();
                $('#divText').show();
                $('#divFile').hide();
                break;
            default:
                break;
        }

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/geticon/'+tipe,
            dataType: 'json',
            success: function(data) {
                $('#icon').empty().selectpicker('refresh');
                
                $.each(data, function(index, option) {
                    $('#icon').append($('<option>').val(option.data_value).attr('data-content', option.data_content));
                });
    
                $('#icon').selectpicker('refresh');
            }
        });
    })

    $(document).on("submit", "#form_edit_content", function(e) {
        var id = $('#id').val();
        var url = "/content/update/"+id;
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
                        dataType: 'json',
                        contentType: false,
                        processData: false,
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
                                    window.location.replace("/content/index");
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
            })
        });

        return false;
    });
    
})