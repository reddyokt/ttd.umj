$(function(){
    window.localStorage['data_absen'] = '[]';

    var table = $('#kt_datatable').DataTable({
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

    $(document).on('click', '#cari', function(e){
        var periode = $('#periode_pbl').val();
        var absence = $('#absence_type').val();
        var post = {};
        post.periode_pbl = periode;
        if(absence === ''){
            var locale = $('html').attr('lang');
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host;
            var jsonfile = baseUrl+'/assets/'+locale+'.json';

            $.getJSON(jsonfile, function(json) {      
                Swal.fire({
                    title: json.title_alert_warning,
                    text: json.text_alert_absence,
                    icon: "warning",
                    buttonsStyling: false,
                    confirmButtonText: json.btn_alert_ok,
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            });
            return;
        }
        post.absence = absence;

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            data: post,
            url: '/pembekalan/modul/cek',
            dataType: 'json',
            success: function(resp) {
                if(resp.absen == 0){    
                    $('#showBtnAbsen').show();
                    $('#btnAbsen').prop('href',resp.url);
                }else{
                    $('#showBtnAbsen').hide();
                }

                var dataset = [];
                var col = [
                    { title: resp.lang.no },
                    { title: resp.lang.nim },
                    { title: resp.lang.name },
                    { title: resp.lang.group },
                    { title: resp.lang.date },
                    { title: resp.lang.present}
                ];
    
                var data1 = resp.data;
                for(var i = 0; i<data1.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data1[i].nim);
                    dt.push(data1[i].nama);
                    dt.push(data1[i].nama_prodi);
                    dt.push((data1[i].tanggal != null ? data1[i].tanggal : '-'));
                    dt.push((data1[i].absensi != null ? data1[i].absensi : 'Belum mengisi absensi'));
                    dataset.push(dt);
                }

                table.destroy();
                table = $('#kt_datatable').DataTable({
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
                table.draw();
            }
        });
        
    });
});