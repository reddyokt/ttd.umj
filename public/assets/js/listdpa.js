$(function(){
    var table = null;
    
    table = $('#kt_datatable').DataTable({
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

        table.destroy();
        $.ajax({
            type: 'GET',
            url: '/kesediaan-dpa/getbyid/'+val,
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                var dataset = [];
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].judul_pbl);
                    dt.push(data[i].nama_dosen);
                    dt.push(data[i].nama_prodi);
                    if(data[i].status == 'waitingapproval')
                        dt.push(resp.lang.waitingapproval);
                    else
                        dt.push(resp.lang.approved);
                    dt.push(data[i].action);
                    dataset.push(dt);
                }
    
                table = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: [
                        { title: resp.lang.no },
                        { title: resp.lang.periode },
                        { title: resp.lang.name },
                        { title: resp.lang.major },
                        { title: resp.lang.status },
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
                table.draw();
            }
        });

    });
})