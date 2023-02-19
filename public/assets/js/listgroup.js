$(function(){
    var tableX = null;

    $(document).on('change', '#periode_pbl', function(e){
        var val = $(this).val();

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
                window.localStorage['status'] = '0';
                if(resp.noklp.length > 0){
                    $('#pilih').show();
                    var dataset = [];

                    var getUrl = window.location;
                    var baseUrl = getUrl.protocol + "//" + getUrl.host;
                    $('head').append('<link rel="stylesheet" href="'+baseUrl+'/assets/plugins/custom/datatables/datatables.bundle.css"/>');

                    window.localStorage['status'] = '1';

                    for(var i = 0; i<resp.noklp.length; i++){
                        var dt = [];
                        dt.push(resp.noklp[i].nim);
                        dt.push(resp.noklp[i].nama);
                        dt.push(resp.noklp[i].nama_prodi);
                        dt.push(resp.noklp[i].regency_name);
                        dt.push(resp.noklp[i].mahasiswa_id);
                        dataset.push(dt);
                    }

                    tableX = $('#dt').DataTable({
                        data: dataset,
                        columns: [
                            { title: "NIM" },
                            { title: "Nama" },
                            { title: "Program Studi" },
                            { title: "Fakultas" },
                            { title: "Kota" },
                            { title: "Action" }
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
                        ],
                        columnDefs: [{
                            'targets': 5,
                            'searchable': false,
                            'orderable': false,
                            'className': 'dt-body-center',
                            'render': function (data, type, full, meta){
                                var $select = $("<select class='form-control cbx'></select>", {});
                                $.each(resp.klp, function (k, v) {
                                    var $option = $("<option></option>", {
                                        "text": v.kelompok,
                                        "value": v.kelompok_id+'|'+full[0]
                                    });
                                    // if (data === v) {
                                    //     $option.attr("selected", "selected")
                                    // }
                                    $select.append($option);
                                });
                                return $select.prop("outerHTML");
                            }
                        }]
                    });
                    tableX.draw();
                }            
            }
        });

        return false;
    });

    $('#applyBtn').on('click', function(){
        var jml = parseInt($('#jumlahklp').html());

        var data = [];
        // var data = JSON.parse(window.localStorage['data_dosen']);
        tableX.$('.cbx option:selected').each(function(){
            data.push($(this).val());
        });
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_list_group_1, 
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
                        data: {kelompok: data},
                        url: '/kelompok/list/postnokelompok',
                        success: function(resp) {
                            if(resp.success=='1'){
                                $('#pilih').hide();
                                $('#largeModal').modal('hide');
                            }
                        }
                    })
                }
            });
        })
    })

    $('#cari').on('click', function(event) {
        event.preventDefault();
        var periode = $("#periode_pbl").val();
        var kelompok = [];
        kelompok = $("#klpk").val();
        var url = '/kelompok/list/getlist';
        var post = {};
        post.periode = periode;
        post.kelompok = kelompok;

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            data: post,
            url: url,
            success: function(resp) {
                var data = resp.kelompok;
                $("#tablekelompok").empty();
                $('#tablekelompok').show();

                var x = 1;
                var html = '';
                html += '<div class="card-body">';
                html +=	'<div class="accordion accordion-toggle-arrow" id="accordionExample1">';
                for (var i=0;i<data.length;i++) {
                    html += '<div class="card">'+
                        '<div class="card-header">'+
                            '<div class="card-title" data-toggle="collapse" data-target="#collapse_'+data[i].kelompok_id+'">'+data[i].kelompok+' - DPA :&nbsp;<b>'+data[i].nama_dosen+'</b> - <b>'+data[i].nidn+'</b></div>'+
                        '</div>'+
                        '<div id="collapse_'+data[i].kelompok_id+'" class="collapse" data-parent="#accordionExample1">'+
                            '<div class="card-body">';

                        html += '<div class="table-responsive">'+
                                    '<table class="table table-bordered table-striped table-hover dt" id="table'+data[i].kelompok_id+'">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th>'+resp.lang.no+'</th>'+
                                                '<th>'+resp.lang.nim+'</th>'+
                                                '<th>'+resp.lang.name+'</th>'+
                                                '<th>'+resp.lang.major+'</th>'+
                                                '<th>'+resp.lang.region+'</th>'+
                                            '</tr>'+
                                        '</thead>'+
                                        '<tbody>'+
                                        '</tbody>'+
                                    '</table>'+
                                '</div>';
                    html += '</div>'+
                        '</div>'+
                    '</div>';
                    x++;
                }
                html += '</div>'+
                    '</div>';
                $('#tablekelompok').append(html);
            }
        })
        
        return false;
    });

    $(document).ready(function(e) {   
        // your code here
        $('#tablekelompok').on('shown.bs.collapse', '.collapse', function () {
            // do something…
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host;
            
            if(window.localStorage['status'] == '0')
                $('head').append('<link rel="stylesheet" href="'+baseUrl+'/assets/plugins/custom/datatables/datatables.bundle.css"/>');
                
            var id = $(this).attr('id').split('_');
            id = id[1];
            if ($.fn.DataTable.isDataTable('#table'+id)) {
                $('#table'+id).DataTable().clear().destroy();
            }
            var table = $('#table'+id).DataTable({
                processing: true,
                serverSide: true,
                ajax: '/kelompok/list/getlistbykelompok/'+id,
                columns: [
                    { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                    { data: 'nim', name: 'nim' },
                    { data: 'nama', name: 'nama' },
                    { data: 'nama_prodi', name: 'nama_prodi' },
                    { data: 'regency_name', name: 'regency_name' },
                ],
                language: {
                    searchPlaceholder: "Search records"
                },
                responsive: false,
                // Pagination settings
                dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
                <'row'<'col-sm-12'tr>>
                <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
                pageLength: 5,
                buttons: [
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5',
                ]
            });
            table.draw();
            
        })
    });
});