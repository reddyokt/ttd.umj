$(function(){
    $('#btnDetailAnggota').on('click',function(e){
        $('#modalAnggota').modal('show');
    
        return false;
    });
    
    $('#btnNilai').on('click',function(e){
        var status = $(this).attr('data-status');
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        if(status == 'N'){
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_warning,
                    text: json.text_alert_value, 
                    icon: "success",
                    confirmButtonText: "OK"
                })
            })
        }else{
            $('#exampleModal').modal('show');
        }
        return false;
    });
    
    $(document).on('click', '#uploadBerkas', function(){
        $('#smallModal').modal('show');
        var id = $(this).attr('data-id');

        var url = '/pendaftaran/show/'+id;
    
        var html = '';
        
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
        
        // $('#ubps').empty();
        $("#ubps > *:not('.ubp')").remove();
    
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                html += '<tr>'+
                    '<td>'+
                        resp.lang.nim+
                    '</td>'+
                    '<td>'+
                        data.nim
                    '</td>'+
                '</tr>';
                html += '<tr>'+
                    '<td>'+
                        resp.lang.name+
                    '</td>'+
                    '<td>'+
                        data.nama
                    '</td>'+
                '</tr>';
                if(data.peminatan != null){
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.interest+
                        '</td>'+
                        '<td>'+
                            data.peminatan
                        '</td>'+
                    '</tr>';
                }
                html += '<tr>'+
                    '<td>'+
                        resp.lang.payment_status+
                    '</td>'+
                    '<td>'+
                        data.status_bayar
                    '</td>'+
                '</tr>';
                if(data.bukti_khs != null){
                    path = baseUrl+'/upload/bukti_khs/'+data.bukti_khs;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.khs_file+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.bukti_pembayaran != null){
                    path = baseUrl+'/upload/bukti_pembayaran/'+data.bukti_pembayaran;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.payment_file+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.bukti_pembayaran_kedua != null){
                    path = baseUrl+'/upload/bukti_pembayaran/'+data.bukti_pembayaran_kedua;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.cash_file+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                $('#daftarid').val(id);
    
                if(data.bukti_pembayaran_kedua == null && data.skema_pembayaran == 'installment'){
                    $('.ubp').show();
                }else{
                    $('.ubp').hide();
                }
                
                $('#ubps').prepend(html);
            }
        });

        return false;
    });

    $(document).on('click', '#btnValidasi', function(){
        var url = '/pendaftaran/pelunasan';

        var formData = new FormData();
        // Attach file
        formData.append('id', $('#daftarid').val());
        formData.append('berkas', $('#berkas')[0].files[0]); 
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_upload, 
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
                        url: url,
                        data : formData,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        success: function(data) {
                            if(data.status){
                                Swal.fire({
                                    title: json.title_alert_success,
                                    text: data.message, 
                                    icon: "success",
                                    confirmButtonText: "OK"
                                })
                                .then(function(result){
                                    window.location.reload();
                                });
                            }
                        }
                    })
                }
            });
        })

        return false;
    })
})