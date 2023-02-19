$(function(){
    var table1 = $('#kt_datatable').DataTable({
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
    
    $(document).on('click', '#cari', function(event) {
        event.preventDefault();
        var val = $("#periode_pbl").val();
    
        table1.destroy();
        var dataset = [];
        var url = '/transaksi/penilaian/dosen/getbyperiode/'+val;
            
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].judul_pbl);
                    dt.push(data[i].kelompok);
                    dt.push(data[i].nidn);
                    dt.push(data[i].nama_dosen);
                    dt.push(data[i].action);
                    dataset.push(dt);
                }
    
                table1 = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: [
                        { title: resp.lang.no },
                        { title: resp.lang.periode },
                        { title: resp.lang.group },
                        { title: resp.lang.nidn },
                        { title: resp.lang.name },
                        { title: resp.lang.actions }
                    ],
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
                table1.draw();
            }
        });
        
        return false;
    });
    
    $('#kt_datatable').on('click','.btnScore',function(e){
        $('#defaultModal').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
        });
    
        var js = $(this).attr('data-json');
    
        var json = js.split('|');
        $('#nidn').html(json[0]);
        $('#nmMhs').html(json[1]);
        $('#kelompok').html(json[2]);
        // $('#dosenid').val(json.dosen_id);
        // $('#kknid').val(json.periode_pbl_id);
        $('#dosenid').val(json[3]);
        $('#kknid').val(json[4]);
    
        var id = $(this).attr('data-id');
    
        var html = '';
    
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
    
        return false;
    });
    
    $('#kt_datatable').on('click','.btnDetail',function(e){
        $('#exampleModal').modal('show');
        var id = $(this).attr('data-id');
        var html = '';
        var url = '/transaksi/penilaian/dosen/get/'+id;
        
        $('#appendNilai1').empty();
        $('#appendSaran1').empty();
        var total = 0;
    
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(data) {
                for(var i=0;i<data.detail.length;i++){
                    html += '<tr>'+
                        '<td>'+(i+1)+'</td>'+
                        '<td>'+data.detail[i].pertanyaan+'</td>'+
                        '<td>'+data.detail[i].pilihan+'</td>'+
                        '<td align="right">'+data.detail[i].bobot+'</td>'+
                        '</tr>';
    
                    total += data.detail[i].bobot;
                }
                html += '<tr><td colspan=3 align="right"><b>Total Bobot</b></td>'
                    +'<td align="right">'+total+'</td>'
                    +'</tr>';
    
                $('#appendNilai1').append(html);
    
                $('#appendSaran1').append(data.header.saran_kinerja != null ? data.header.saran_kinerja : '-')
            }
        })
    
        return false;
    });
        
    $('#btnSaveModul').on('click', function(e){
        var formData = new FormData($("#formNilai")[0]);
    
        var url = '/transaksi/penilaian/dosen/store';
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/assets/images/loading.gif";
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
            
        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm, 
                text: json.text_alert_pbl,
                icon: "info",
                showCancelButton: true,
                confirmButtonText: json.btn_alert_confirm,
                cancelButtonText: json.btn_alert_cancel
            }).then(function(result){
                if(result.value){
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: 'POST',
                        url: url,
                        processData: false,
                        contentType: false,
                        data : formData,
                        success: function(response) {
                            if (response.status) {
                                Swal.fire({
                                    title: json.title_alert_success, 
                                    text: response.message,
                                    icon: "success"
                                }).then(function() {
                                    // $('#mhs_'+response.mahasiswa_id).hide();
                                    // $('#detail_'+response.mahasiswa_id).show();
                                    $('#defaultModal').modal('hide');
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire({
                                    title: "Perhatian", 
                                    text: response.message, 
                                    icon: "warning"
                                });
                            }
                        }
                    });
                }
            });
        })
   
        return false;
    });

    $(document).on('keydown', '.nums', function(e) {
        if (!((e.keyCode > 95 && e.keyCode < 106) ||
                (e.keyCode > 47 && e.keyCode < 58) ||
                e.keyCode == 8)) {
            return false;
        }
    });
    
    $(document).on('keypress', '.nums2', function(event) {
        return isNumber(event, this);
    });
    
    $(document).on('blur', '.nums2', function(e) {
        var val = $(this).val();
        if(val == ''){
            val = 0;
        }
        if(parseFloat(val) < 0){
            val = 0;
        }
        if(parseFloat(val) > 100){
            val = 100;
        }
    
        val = parseFloat(val);
        $(this).val(val);
    
        return false;
    });
    
    function isNumber(evt, element) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (            
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
            return false;
            return true;
    }
})