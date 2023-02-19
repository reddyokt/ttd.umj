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

    $(document).on('change', '#periode_pbl', function(e){
        var val = $(this).val();

        $.ajax({
            type: 'GET',
            url: '/pembekalan/seminar/cek/'+val,
            dataType: 'json',
            success: function(data) {
                if(data.absen == 0){    
                    $('#showBtnAbsen').show();
                    $('#btnAbsen').prop('href',data.url+'/'+val);
                }
            }
        });

        table.destroy();
        table = $('#kt_datatable').DataTable({
            processing: true,
            serverSide: true,
            ajax: '/pembekalan/seminar/getmykelompok/'+val,
            columns: [
                { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                { data: 'nim', name: 'nim' },
                { data: 'nama', name: 'nama' },
                { data: 'nama_prodi', name: 'nama_prodi' },
                { 
                    data: 'absensi', 
                    render: function(data, type, row){
                        return row.absensi == null ? '<i>Belum mengisi Absen</i>' : row.absensi;
                    } 
                }
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
        table.draw();
    });
});