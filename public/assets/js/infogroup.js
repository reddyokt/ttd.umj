$(function(){
    var tableX = $('#kt_datatable').DataTable({
        responsive: false,
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        pageLength: 10,
        buttons: [
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5',
        ]
    });    

    $(document).on('change', '#periode_pbl', function(e){
        var val = $(this).val();

        tableX.destroy();
        $.ajax({
            type: 'GET',
            url: '/kelompok/info/'+val,
            success: function(resp) {
                var data = resp.data;
                var dataset = [];
                
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].kelompok);
                    dt.push(data[i].nim + ' - '+data[i].nama);
                    dt.push(data[i].nama_prodi);
                    dt.push(data[i].peminatan);
                    dt.push(data[i].no_hp);
                    dataset.push(dt);
                }

                tableX = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: [
                        { title: resp.lang.no },
                        { title: resp.lang.group },
                        { title: resp.lang.nim +' - '+ resp.lang.name },
                        { title: resp.lang.major },
                        { title: resp.lang.interest },
                        { title: resp.lang.hp_no }
                    ],
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    responsive: false,
                    // Pagination settings
                    dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
                    <'row'<'col-sm-12'tr>>
                    <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
                    pageLength: 10,
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

});