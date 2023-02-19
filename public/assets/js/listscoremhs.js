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

    var table2 = $('#kt_datatable2').DataTable({
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
    
    $(document).on('change', '#periode_pbl', function(e){
        var val = $(this).val();
        var sesi = $('#sesi').val();
    
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/kelompok/list/getallkelompok/'+val,
            success: function(resp) {
                $('#klpk').empty().selectpicker('refresh');
                var val = '';
                
                $.each(resp.klp, function(index, option) {
                    $('#klpk').append($('<option>').val(option.kelompok_id).text(option.kelompok));
                });
    
                $('#klpk').selectpicker('refresh');
            }
        });
        
    });
    
    $(document).on('click', '#cari', function(event) {
        event.preventDefault();
        var periode = $("#periode_pbl").val();
        var sesi = $('#sesi').val();
        var url = '/transaksi/penilaian/mahasiswa/getfilter';
        var post = {};
        post.periode = periode;
        if(sesi != 'DPA'){
            var kelompok = [];
            kelompok = $("#klpk").val();
            post.kelompok = kelompok;
        }
    
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            dataType: 'json',
            data: post,
            url: url,
            success: function(resp) {
                table1.destroy();
                table2.destroy();

                var dataset1 = [];
                var dataset2 = [];
    
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                var path = baseUrl+"/";
    
                var col = [
                    { title: resp.lang.no },
                    { title: resp.lang.periode },
                    { title: resp.lang.nim },
                    { title: resp.lang.name },
                    { title: resp.lang.group },
                    { title: resp.lang.angka},
                    { title: resp.lang.huruf},
                    { title: resp.lang.actions }
                ];
    
                var data1 = resp.data1;
                var data2 = resp.data2;
                for(var i = 0; i<data1.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data1[i].judul_pbl);
                    dt.push(data1[i].nim);
                    dt.push(data1[i].nama);
                    dt.push(data1[i].nama_prodi);
                    dt.push(data1[i].nilai);
                    dt.push(data1[i].nilai_huruf);
                    dt.push(data1[i].action);
                    dataset1.push(dt);
                }

                for(var ii = 0; ii<data2.length; ii++){
                    var dt = [];
                    dt.push(ii+1);
                    dt.push(data2[ii].judul_pbl);
                    dt.push(data2[ii].nim);
                    dt.push(data2[ii].nama);
                    dt.push(data2[ii].nama_prodi);
                    dt.push(data2[ii].nilai);
                    dt.push(data2[ii].nilai_huruf);
                    dt.push(data2[ii].action);
                    dataset2.push(dt);
                }
    
                table1 = $('#kt_datatable').DataTable({
                    data: dataset1,
                    columns: col,
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    pageLength: 10,
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
                
                table2 = $('#kt_datatable2').DataTable({
                    data: dataset2,
                    columns: col,
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    pageLength: 10,
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
                table2.draw();
            }
        });
        
        return false;
    });
    
    $(document).on('click','.btnScore',function(e){
        $('#defaultModal').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
        });
    
        var js = $(this).attr('data-json');
        var score_id = $(this).attr('data-score-id');
    
        var json = JSON.parse(js);
        $('#nim').html(json.nim);
        $('#nmMhs').html(json.nama);
        $('#mhsid').val(json.mahasiswa_id);
        $('#kknid').val(json.periode_pbl_id);
        
        var html = '';
        
        var url = '/transaksi/penilaian/mahasiswa/get/'+score_id;
        $('#rownilai').empty();
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(data) {
                $('#code').val(json.periode_code);
                for(var i=0;i<data.nilai.length;i++){
                    html+= '<div class="col-6 col-sm-6">'+
                        '<table class="table table-striped" id="tableScore">'+
                            '<thead>'+
                                '<tr>'+
                                    '<td colspan="2" scope="row">'+
                                        '<h6 class="text-info align-center">'+data.nilai[i].nama_penilaian+' ('+(data.nilai[i].bobot_total_aspek*100)+'%)</h6>'+
                                        '<input type="hidden" name="bobot_aspek['+data.nilai[i].aspek_penilaian_id+']" id="bobot_'+data.nilai[i].aspek_penilaian_id+'" value="'+data.nilai[i].bobot_total_aspek+'">'+
                                    '</td>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';
                    for(var j=0;j<data.nilai[i].item.length;j++){
                        html += '<tr>'+
                                '<td class="text-info" scope="row">'+data.nilai[i].item[j].nama_penilaian+'</td>'+
                                '<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); if (this.value > 100) this.value = 100;" type = "number" maxlength = "3" min = "0" max = "100"'+
                                'class="form-control nums2" id="bobot_'+data.nilai[i].item[j].aspek_penilaian_id+'" value="'+data.nilai[i].item[j].nilai+'" name="bobot['+data.nilai[i].item[j].aspek_penilaian_id+']" placeholder="0"></td>'+
                            '</tr>';
                    }
                    html += '</tbody>'+
                        '</table>'+
                    '</div>';
                }
    
                $('#rownilai').append(html);
            }
        });
    
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/";
    
        return false;
    });
    
    $(document).on('click','.btnDetail',function(e){
        $('#exampleModal').modal('show');
        var id = $(this).attr('data-id');
        var url = '/transaksi/penilaian/mahasiswa/get/'+id;
        var html = '';
        $('#appendNilai').empty();
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(data) {
                $('#nilaiHuruf').html(data.nilaiHuruf);
                $('#rerata').html('<b>'+data.rerata.toFixed(1) +' / 100</b>');
                $('#totalNilai').html('Total Nilai '+data.totalNilai);
                for(var i=0;i<data.nilai.length;i++){
                    html+= '<div class="col-6 col-sm-6">'+
                        '<table class="table table-striped">'+
                            '<thead>'+
                                '<tr>'+
                                    '<td colspan="2" scope="row">'+
                                        '<h6 class="text-info align-center">'+data.nilai[i].nama_penilaian+' ('+(data.nilai[i].bobot_total_aspek*100)+'%)</h6>'+
                                    '</td>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';
                    for(var j=0;j<data.nilai[i].item.length;j++){
                        html += '<tr>'+
                            '<th class="text-info" scope="row">'+data.nilai[i].item[j].nama_penilaian+'</th>'+
                            '<td>'+data.nilai[i].item[j].nilai+'</td>'+
                        '</tr>';
                    }
                    html += '</tbody>'+
                        '</table>'+
                    '</div>';
                }
    
                $('#appendNilai').append(html);
            }
        });
    
        return false;
    });
        
    $('#example-select-all').on('click', function(){
        // Get all rows with search applied
        var rows = table.rows({ 'search': 'applied' }).nodes();
        // Check/uncheck checkboxes for all rows in the table
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    
        var data = [];
    
        table.$('input[type="checkbox"]:checked').each(function(){
            var a = parseInt($(this).val());
            data.push(a);
        });
    
        window.localStorage['data_absen'] = JSON.stringify(data);
    });
    
    $('#btnSaveModul').on('click', function(e){
        var formData = new FormData($("#formNilai")[0]);
        var locale = $('html').attr('lang');
        var url = '/transaksi/penilaian/dosen/store';
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
    
        var url = '/transaksi/penilaian/mahasiswa/store';
    
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
                    $.getJSON(jsonfile, function(json) {
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
                    })
                }else{
                    $.getJSON(jsonfile, function(json) {
                        Swal.fire({
                            title: json.title_alert_warning, 
                            text: response.message, 
                            icon: "warning"
                        });
                    })
                }
            }
        });
    
        return false;
    })
    
    $('#form_modul_pembekalan').on('submit', function () {
        var formData = new FormData($("#form_modul_pembekalan")[0]);
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/modul/";
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
    
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/pembekalan/modul/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                if (result.status == 'success') {
                    $("#photo_profile").attr("src", path+result.photo);
                    $("#profile_picture_header").attr("src", path+result.photo);
                    $.getJSON(jsonfile, function(json) {
                        Swal.fire({
                            title: json.title_alert_success,
                            text: result.message,
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function (result) {
                            $('#modalPembekalan').modal('hide');
                        });
                    })
                } else {
                    $.getJSON(jsonfile, function(json) {
                        Swal.fire({
                            title: json.title_alert_warning,
                            text: result.message,
                            icon: "warning"
                        });
                    })
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    
        return false;
    });
    
    $('.nums2').on('keypress', function(event) {
        return isNumber(event, this);
    });

    function isNumber(evt, element) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (            
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57)
        )
            return false;
        return true;
    }
    
    $('#tableScore').on('blur', '.nums2', function(e) {
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
})