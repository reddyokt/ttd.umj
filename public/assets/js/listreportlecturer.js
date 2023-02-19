$(function(){
    var tablePbl1 = $('#kt_datatable').DataTable({
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

    var tablePbl2 = $('#kt_datatable2').DataTable({
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
        var count1 = $('#count1').val();
        var count2 = $('#count2').val();
        var showadd = $('#showadd').val();

        if(showadd == 1){
            $('#btnAdd').show();
            url = $('#btnAdd').attr('href');
            url += '/'+val;
            $('#btnAdd').prop('href', url);
        }
        var col = [];
        tablePbl1.destroy();
        tablePbl2.destroy();
        var tipe = $('#type').val();
        var hide1 = $('#hide1').val();
        var hide2 = $('#hide2').val();
        $.ajax({
            type: 'GET',
            url: '/report/lecturer/getbyperiode/'+val,
            success: function(resp) {
                if(resp.data.length > 0){
                    var url = $('#btnDownload').attr('href');
                    $('#btnDownload').attr('href', url+'/'+val);
                    $('#btnDownload').show();
                }
                if(sesi == 'DPA'){
                    col = [
                        { title: resp.lang.no },
                        { title: resp.lang.periode },
                        { title: resp.lang.file },
                        { title: resp.lang.actions }
                    ];
                }else{
                    col = [
                        { title: resp.lang.no },
                        { title: resp.lang.periode },
                        { title: resp.lang.name_dsn },
                        { title: resp.lang.group },
                        { title: resp.lang.file }
                    ];
                }

                var dataset = [];
                var dataset2 = [];
                var data = resp.data;
    
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                var path = baseUrl+"/";
                var x = 0, y=0;
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    if(data[i].periode_code == 'PBL1'){
                        if(sesi == 'DPA'){
                            dt.push(x+1);
                            dt.push(data[i].judul_pbl);
                            dt.push(data[i].action_col_file);
                            dt.push(data[i].action_col_edit_del);
                        }else{
                            dt.push(x+1);
                            dt.push(data[i].judul_pbl);
                            dt.push(data[i].nama_dosen);
                            dt.push(data[i].kelompok);
                            dt.push(data[i].action_col_file);
                        }
                        dataset.push(dt);
                        x++;
                    }else if(data[i].periode_code == 'PBL2'){
                        if(sesi == 'DPA'){
                            dt.push(y+1);
                            dt.push(data[i].judul_pbl);
                            dt.push(data[i].action_col_file);
                            dt.push(data[i].action_col_edit_del);
                        }else{
                            dt.push(y+1);
                            dt.push(data[i].judul_pbl);
                            dt.push(data[i].nama_dosen);
                            dt.push(data[i].kelompok);
                            dt.push(data[i].action_col_file);
                        }
                        dataset2.push(dt);
                        y++;
                    }
                }
    
                tablePbl1 = $('#kt_datatable').DataTable({
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
                tablePbl1.draw();

                tablePbl2 = $('#kt_datatable2').DataTable({
                    data: dataset2,
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
                tablePbl2.draw();
            }
        });
    });

    $('#kt_datatable').on('click','.delete-laporan-akhir',function(e){
        var data_id = $(this).attr("data-id");
        var data_tipe = $(this).attr("data-tipe");
        var url = "/report/lecturer/delete/" + data_id;
        e.preventDefault(); //cancel default action
        
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: "Konfirmasi",
                text: "Anda tidak akan dapat memulihkan data ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Lanjutkan",
                cancelButtonText: "Batalkan",
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
    
    $('#kt_datatable').on('click','.btnFile',function(e){
        $('#defaultModal').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/report/lecturer/show/'+id;
    
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
                    path = baseUrl+'/upload/laporan_akhir_dosen/'+data.file_laporan_akhir;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_laporan+
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
                if(data.judul_modul != null){
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_title_modul+
                        '</td>'+
                        '<td>'+
                            data.judul_modul
                        '</td>'+
                    '</tr>';
                }
                if(data.file_modul != null){
                    path = baseUrl+'/upload/modul_dosen/'+data.file_modul;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_modul+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.judul_jurnal != null){
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_title_jurnal+
                        '</td>'+
                        '<td>'+
                            data.judul_jurnal
                        '</td>'+
                    '</tr>';
                }
                if(data.file_jurnal != null){
                    path = baseUrl+'/upload/jurnal/'+data.file_jurnal;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_jurnal+
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
    
    $('#kt_datatable').on('click','.btnLink',function(e){
        $('#defaultModal2').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/report/lecturer/show/'+id;
    
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

    $('#kt_datatable2').on('click','.delete-laporan-akhir',function(e){
        var data_id = $(this).attr("data-id");
        var data_tipe = $(this).attr("data-tipe");
        var url = "/report/lecturer/delete/" + data_id;
        e.preventDefault(); //cancel default action
        
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: "Konfirmasi",
                text: "Anda tidak akan dapat memulihkan data ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Lanjutkan",
                cancelButtonText: "Batalkan",
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
    
    $('#kt_datatable2').on('click','.btnFile',function(e){
        $('#defaultModal').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/report/lecturer/show/'+id;
    
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
                    path = baseUrl+'/upload/laporan_akhir_dosen/'+data.file_laporan_akhir;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_laporan+
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
                if(data.judul_modul != null){
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_title_modul+
                        '</td>'+
                        '<td>'+
                            data.judul_modul
                        '</td>'+
                    '</tr>';
                }
                if(data.file_modul != null){
                    path = baseUrl+'/upload/modul_dosen/'+data.file_modul;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_modul+
                        '</td>'+
                        '<td>'+
                            '<a class="btn btn-success btn-icon btn-icon-mini btn-round" href="'+path+'" title="Download"><i class="fa fa-download"></i></a>'+
                        '</td>'+
                    '</tr>';
                }
                if(data.judul_jurnal != null){
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_title_jurnal+
                        '</td>'+
                        '<td>'+
                            data.judul_jurnal
                        '</td>'+
                    '</tr>';
                }
                if(data.file_jurnal != null){
                    path = baseUrl+'/upload/jurnal/'+data.file_jurnal;
                    html += '<tr>'+
                        '<td>'+
                            resp.lang.label_file_jurnal+
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
    
    $('#kt_datatable2').on('click','.btnLink',function(e){
        $('#defaultModal2').modal('show');
    
        var id = $(this).attr('data-id');
    
        var tipe = $(this).attr('data-tipe');
    
        var url = '/report/lecturer/show/'+id;
    
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