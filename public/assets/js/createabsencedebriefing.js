$(function(){
    window.localStorage['data_absen'] = '[]';
    var table = $('#kt_datatable').DataTable({
        responsive: false,
        pageLength: 5,
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        headerCallback: function(thead, data, start, end, display) {
            thead.getElementsByTagName('th')[4].innerHTML = `
                <label class="checkbox checkbox-single">
                    <input type="checkbox" id="selectAll" value="" class="group-checkable"/>
                    <span></span>
                </label>`;
        },
        columnDefs: [
            {
                targets: 4,
                width: '30px',
                className: 'dt-left',
                orderable: false,
                render: function(data, type, full, meta) {
                    var f = full[4];
                    f = f.split(" ");
                    var fx = f[2].match(/"([^"]+)"/)[1];
                    var str1 = '<label class="checkbox checkbox-single">';
                    var str2 = '<input type="checkbox" class="checkable" value="'+$('<div/>').text(fx).html()+'">';
                    var str3 = '<span></span>';
                    var str4 = '</label>';
                    return str1+str2+str3+str4;
                },
            }
        ]
    });
    
    var allPages = table.cells().nodes();
    $('#kt_datatable').on('click','#selectAll', function(){
        var data = [];
        if ($(this).hasClass('checkable')) {
            $(allPages).find('input[type="checkbox"]').prop('checked', false);
        } else {
            $(allPages).find('input[type="checkbox"]').prop('checked', true);
        }
        $(this).toggleClass('checkable');
        // Get all rows with search applied
        var rows = table.$('tr', {"filter": "applied"});// viewlist is
        var checked = $(this).prop('checked');
        var data = [];
        $.each(rows, function () {
            var checkbox = $($(this).find('td').eq(4)).find('input').prop('checked', checked);
            if(checked){
                var a = parseInt(checkbox.val());
                data.push(a);
            }
        });
    
        window.localStorage['data_absen'] = JSON.stringify(data);
        $('#var_absen').val(window.localStorage['data_absen']);
    });

    var rows2 = table.$('tr', {"filter": "applied"});// viewlist is
    $('input[type="checkbox"]', rows2).each(function(i,e){
        $(e).click(function(){
            var checkBoxC = [];
            var cbChecked = JSON.parse(window.localStorage['data_absen']);
            var val = parseInt($(e).val());

            if($(e).is(':checked')){
                if($.inArray(val, cbChecked) === -1){
                    cbChecked.push(val);
                }
            }else{
                var index = cbChecked.indexOf(val);
                if(index > -1){
                    cbChecked.splice(index,1);
                }
                $('#selectAll').prop('checked', false);
            }
            
            window.localStorage['data_absen'] = JSON.stringify(cbChecked);
            $('#var_absen').val(window.localStorage['data_absen']);
        });
    });

    $(document).on('submit', '#form_add_absensi', function(){
        var url = '/pembekalan/absensi/saveabsen';

        var form_data = $("#form_add_absensi").serializeArray();

        form_data.periode_pbl_id = $('#periode_pbl_id').val();
        form_data.absence_type_id = $('#absence_type_id').val();
        form_data.absensi = $('#var_absen').val();

        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_pbl, 
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
                        data: form_data,
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
                                    window.location.replace("/pembekalan/kehadiran/index");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_failed,
                                    text: data.message,
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: json.btn_alert_ok,
                                    customClass: {
                                        confirmButton: "btn btn-danger"
                                    }
                                });
                            }
                        }
                    });
                }
            })
        });

        return false;
    })
});