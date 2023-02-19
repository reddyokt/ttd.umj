$(function(){
    var table = $('#kt_datatable').DataTable({
        responsive: true,
        language: {
            emptyTable: langNoData
        },
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        buttons: [
            {
                "extend": 'excelHtml5',
                "text": 'Excel',
                "download": 'open', //open new tab
                "exportOptions": {
                    columns: [0,1,2,3,4]
                }
            },
            {
                "extend": 'csvHtml5',
                "text": 'CSV',
                "download": 'open', //open new tab
                "exportOptions": {
                    columns: [0,1,2,3,4]
                }
            },
            {
                "extend": 'pdfHtml5',
                "text": 'PDF',
                "download": 'open', //open new tab
                "exportOptions": {
                    columns: [0,1,2,3,4]
                }
            },
        ],
    });

    $('#kt_daterangepicker_2').daterangepicker({
        buttonClasses: ' btn',
        applyClass: 'btn-primary',
        cancelClass: 'btn-secondary',
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function(start, end, label) {
        $('#kt_daterangepicker_2 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
    });

    $(document).on('click', '#kt_search', function(){
        table.destroy();
        var val = $('#datefilter').val();
        var spl = val.split(' / ');
        var post = {};
        post.start_date = spl[0];
        post.end_date = spl[1];

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            data: post,
            url: '/userlog/filter',
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                var dataset = [];
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].name);
                    dt.push(data[i].role_name);
                    dt.push(data[i].description);
                    dt.push(data[i].action_date);
                    dataset.push(dt);
                }
    
                table = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: [
                        { title: resp.lang.number },
                        { title: resp.lang.name },
                        { title: resp.lang.role },
                        { title: resp.lang.action },
                        { title: resp.lang.date }
                    ],
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    responsive: true,
                    // Pagination settings
                    dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
                    <'row'<'col-sm-12'tr>>
                    <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
                    buttons: [
                        {
                            "extend": 'excelHtml5',
                            "text": 'Excel',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                        {
                            "extend": 'csvHtml5',
                            "text": 'CSV',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                        {
                            "extend": 'pdfHtml5',
                            "text": 'PDF',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                    ]    
                });
                table.draw();
            }
        });

        return false;
    });

    $(document).on('click', '#kt_reset', function(){
        table.destroy();
        var post = {};
        $('#datefilter').val('');
        $('#kt_daterangepicker_2').daterangepicker('destroy').daterangepicker({
            buttonClasses: ' btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary',
            locale: {
                format: 'YYYY-MM-DD'
            }
        }, function(start, end, label) {
            $('#kt_daterangepicker_2 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        });

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            data: post,
            url: '/userlog/filter',
            dataType: 'json',
            success: function(resp) {
                var data = resp.data;
                var dataset = [];
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].name);
                    dt.push(data[i].role_name);
                    dt.push(data[i].description);
                    dt.push(data[i].action_date);
                    dataset.push(dt);
                }
    
                table = $('#kt_datatable').DataTable({
                    data: dataset,
                    columns: [
                        { title: resp.lang.number },
                        { title: resp.lang.name },
                        { title: resp.lang.role },
                        { title: resp.lang.action },
                        { title: resp.lang.date }
                    ],
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    responsive: true,
                    // Pagination settings
                    dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
                    <'row'<'col-sm-12'tr>>
                    <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
                    buttons: [
                        {
                            "extend": 'excelHtml5',
                            "text": 'Excel',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                        {
                            "extend": 'csvHtml5',
                            "text": 'CSV',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                        {
                            "extend": 'pdfHtml5',
                            "text": 'PDF',
                            "download": 'open', //open new tab
                            "exportOptions": {
                                columns: [0,1,2,3,4]
                            }
                        },
                    ]    
                });
                table.draw();
            }
        });

        return false;
    });
});