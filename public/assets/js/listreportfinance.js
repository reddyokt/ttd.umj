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
        var col = [];
        $.ajax({
            type: 'GET',
            url: '/laporan/finance/getbyperiode/'+val,
            success: function(resp) {
                var data = resp.data;
                var dataset = [];
                col = [
                    { title: resp.lang.no },
                    { title: resp.lang.periode },
                    { title: resp.lang.name },
                    { title: resp.lang.registration_status },
                    { title: resp.lang.registration_payment },
                    { title: resp.lang.payment_scheme },
                    { title: resp.lang.total_payment },
                    { title: resp.lang.remaining_payment },
                    { title: resp.lang.actions }
                ];
                tableX.destroy();
    
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                var path = baseUrl+"/";
                
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].judul_pbl);
                    dt.push(data[i].nim+' - '+data[i].nama);
                    dt.push(data[i].status_pendaftaran);
                    dt.push(data[i].status_bayar);
                    dt.push((data[i].skema_pembayaran == 'cash' ? resp.lang.cash : resp.lang.installment));
                    dt.push(data[i].total_pembayaran);
                    dt.push(data[i].sisa_pembayaran);
                    dt.push(data[i].action_file);
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
    
    $('#kt_datatable').on('click','#btnFile',function(e){
        $('#defaultModal').modal('show');
    
        var id = $(this).attr('data-id');
    
        var url = '/pendaftaran/show/'+id;
    
        var html = '';
    
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
    
        $('#appendBerkas').empty();
    
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