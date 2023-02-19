$(function(){
    var tableX = $('#kt_datatable').DataTable({
        responsive: false,
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        buttons: [
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5',
        ]
    });

    $(document).on('change', '#periode_pbl', function(e){
        var val = $(this).val();
        var sesi = $('#sesi').val();
        var url = '';
        var count = $('#count').val();

        if(count == 0){
            $('#btnAdd').show();
            url = $('#btnAdd').attr('href');
            url += '/'+val;
            $('#btnAdd').prop('href', url);
        }
        var col = [];
        if(sesi == 'MHS'){
            col = [
                { title: "No" },
                { title: "Periode PBL" },
                { title: "Kumpulan Berkas" },
                { title: "Kumpulan Link" },
                { title: "Action" }
            ];
        }else{
            col = [
                { title: "No" },
                { title: "Periode PBL" },
                { title: "Nama Mahasiswa" },
                { title: "Kelompok" },
                { title: "Kumpulan Berkas" },
                { title: "Kumpulan Link" }
            ];
        }
        tableX.destroy();
        var tipe = $('#type').val();
        var hide = $('#hide').val();
        $.ajax({
            type: 'GET',
            url: '/laporan/'+tipe+'/getbyperiode/'+val,
            success: function(data) {
                var dataset = [];
    
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                var path = baseUrl+"/";
                
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    if(sesi == 'MHS'){
                        dt.push(i+1);
                        dt.push(data[i].judul_pbl);
                        dt.push(data[i].action_col_file);
                        dt.push(data[i].action_col_link);
                        if(hide != 1)
                            dt.push(data[i].action_col_edit_del);
                        else
                            dt.push('');
                    }else{
                        dt.push(i+1);
                        dt.push(data[i].judul_pbl);
                        dt.push(data[i].nama);
                        dt.push(data[i].kelompok);
                        dt.push(data[i].action_col_file);
                        dt.push(data[i].action_col_link);
                    }
                    dataset.push(dt);
                }
    
                tableX = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: col,
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    responsive: false,
                    // Pagination settings
                    dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
                    <'row'<'col-sm-12'tr>>
                    <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
                    buttons: [
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5',
                    ]
                });
                tableX.draw();
            }
        });
    });

    $('#kt_datatable').on('click','.delete-laporan-akhir',function(e){
        var data_id = $(this).attr("data-id");
        var data_tipe = $(this).attr("data-tipe");
        var url = "/laporan/"+data_tipe+"/delete/" + data_id;
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
    
    $('#kt_datatable').on('click','#btnFile',function(e){
        $('#defaultModal').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/laporan/'+tipe+'/show/'+id;
    
        var html = '';
    
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
    
        $('#appendBerkas').empty();
    
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                if(data.file_lembar_pengesahan != null){
                    path = baseUrl+'/upload/lembar_pengesahan_mhs/'+data.file_lembar_pengesahan;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_pengesahan+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.file_form_kesediaan_mitra != null){
                    path = baseUrl+'/upload/form_kesediaan_mitra_mhs/'+data.file_form_kesediaan_mitra;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_kesediaan+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.judul_laporan_akhir != null){
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_title_laporan+
                        '</td>'+
                        '<td>'+
                            data.judul_laporan_akhir
                        '</td>'+
                    '</tr>';
                }
                if(data.file_laporan_akhir != null){
                    path = baseUrl+'/upload/laporan_akhir_mhs/'+data.file_laporan_akhir;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_file_laporan+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.judul_semnaskat != null){
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_title_semnaskat+
                        '</td>'+
                        '<td>'+
                            data.judul_semnaskat
                        '</td>'+
                    '</tr>';
                }
                if(data.file_semnaskat != null){
                    path = baseUrl+'/upload/semnaskat_mhs/'+data.file_semnaskat;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_file_semnaskat+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
    
                $('#appendBerkas').append(html);
            }
        })
    
        return false;
    });
    
    $('#kt_datatable').on('click','#btnLink',function(e){
        $('#defaultModal2').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/laporan/'+tipe+'/show/'+id;
    
        var html = '';
    
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
    
        $('#appendLink').empty();
    
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                if( data.facebook_link == null &&
                    data.instagram_link == null &&
                    data.twitter_link == null &&
                    data.youtube_link == null
                ){
                    html += '<tr>'+
                        '<td style="border-color: transparent;">'+
                            '<h4 style="text-align:center">'+resp.lang.label_no_data+'</h4>'+
                        '</td>'+
                        '<tr>'+
                        '</tr>'+    
                    '</tr>';
                }
                if(data.facebook_link != null){
                    path = data.facebook_link;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_link_facebook+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="socicon-facebook icon-lg"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.instagram_link != null){
                    path = data.instagram_link;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_link_instagram+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="socicon-instagram icon-lg"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.twitter_link != null){
                    path = data.twitter_link;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_link_twitter+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Click"><i class="socicon-twitter icon-lg"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.youtube_link != null){
                    path = data.youtube_link;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_link_youtube+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Click"><i class="socicon-youtube icon-lg"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
    
                $('#appendLink').append(html);
            }
        })
    
        return false;
    });
});