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
        tableX.destroy();
        var tipe = $('#type').val();
        var hide = $('#hide').val();
        $.ajax({
            type: 'GET',
            url: '/laporan/'+tipe+'/getbyperiode/'+val,
            success: function(data) {
                if(sesi == 'DPA'){
                    col = [
                        { title: data.lang.no },
                        { title: data.lang.periode },
                        { title: data.lang.file },
                        { title: data.lang.actions }
                    ];
                }else{
                    col = [
                        { title: data.lang.no },
                        { title: data.lang.periode },
                        { title: data.lang.name_dsn },
                        { title: data.lang.group },
                        { title: data.lang.file }
                    ];
                }

                var dataset = [];
    
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                var path = baseUrl+"/";
                
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].judul_pbl);
                    if(sesi != 'DPA'){
                        dt.push(data[i].nama_dosen);
                        dt.push(data[i].kelompok);
                    }
                    dt.push(data[i].action_col_file);
                    if(sesi == 'DPA'){
                        dt.push(data[i].action_col_edit_del);
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
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_add,
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
                                    title: json.title_alert_deleted,
                                    text: json.text_alert_deleted,
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: 'OK',
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
            })
        })
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
                var data = resp.data
                if(data.file_lembar_pengesahan != null){
                    path = baseUrl+'/upload/lembar_pengesahan_dosen/'+data.file_lembar_pengesahan;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_file_pengesahan+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.file_kesediaan_mitra != null){
                    path = baseUrl+'/upload/form_kesediaan_mitra_dosen/'+data.file_kesediaan_mitra;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_file_kesediaan+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.judul_laporan_pengmas != null){
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_title_pengmas+
                        '</td>'+
                        '<td>'+
                            data.judul_laporan_pengmas
                        '</td>'+
                    '</tr>';
                }
                if(data.file_laporan_pengmas != null){
                    path = baseUrl+'/upload/laporan_pengmas/'+data.file_laporan_pengmas;
                    html += '<tr>'+
                        '<td>'+
                        resp.lang.label_file_pengmas+
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
                    path = baseUrl+'/upload/semnaskat_dosen/'+data.file_semnaskat;
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
            success: function(data) {
                if(data.facebook_link != null){
                    path = data.facebook_link;
                    html += '<tr>'+
                        '<td>'+
                            'Facebook Link'+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-facebook"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.instagram_link != null){
                    path = data.instagram_link;
                    html += '<tr>'+
                        '<td>'+
                            'Instagram Link'+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-instagram"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.twitter_link != null){
                    path = data.twitter_link;
                    html += '<tr>'+
                        '<td>'+
                            'Twitter Link'+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Click"><i class="fa fa-twitter"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.youtube_link != null){
                    path = data.youtube_link;
                    html += '<tr>'+
                        '<td>'+
                            'Youtube Link'+
                        '</td>'+
                        '<td>'+
                            '<a target="_blank" class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Click"><i class="fa fa-youtube"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
    
                $('#appendLink').append(html);
            }
        })
    
        return false;
    });
});