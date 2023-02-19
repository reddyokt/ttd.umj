$(function(){
    window.localStorage['data_dosen'] = '[]';
    window.localStorage['data_wilayah'] = '[]';
    window.localStorage['data_mhs'] = '[]';

    var table = $('#dt').DataTable({
        responsive: false,
        pageLength: 5,
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        headerCallback: function(thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                <label class="checkbox checkbox-single">
                    <input type="checkbox" id="selectAll" class="group-checkable"/>
                    <span></span>
                </label>`;
        },
        columnDefs: [
            {
                targets: 0,
                width: '30px',
                className: 'dt-left',
                orderable: false,
                render: function(data, type, full, meta) {
                    var f = full[0];
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

    $('#dt').on('click','#selectAll', function(){
        var data = [];
        if ($(this).hasClass('checkable')) {
            $(allPages).find('input[type="checkbox"]').prop('checked', false);
        } else {
            $(allPages).find('input[type="checkbox"]').prop('checked', true);
        }
        $(this).toggleClass('checkable');
        // Get all rows with search applied
        // var rows,checked;  
        var rows = table.$('tr', {"filter": "applied"});// viewlist is
        var checked = $(this).prop('checked');
        // if(checked){
        //     $('#btnAdd').show();
        // }else{
        //     $('#btnAdd').hide();
        // }
        $.each(rows, function () {
            var checkbox = $($(this).find('td').eq(0)).find('input').prop('checked', checked);
            if(checked){
                var a = parseInt(checkbox.val());
                data.push(a);
            }
        });
    
        window.localStorage['data_dosen'] = JSON.stringify(data);
    });

    var table2 = $('#dt2').DataTable({
        responsive: false,
        pageLength: 5,
        // Pagination settings
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
        <'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        headerCallback: function(thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                <label class="checkbox checkbox-single">
                    <input type="checkbox" id="selectAll2" class="group-checkable"/>
                    <span></span>
                </label>`;
        },
        columnDefs: [
            {
                targets: 0,
                width: '30px',
                className: 'dt-left',
                orderable: false,
                render: function(data, type, full, meta) {
                    var f = full[0];
                    f = f.split(" ");
                    var fx = f[2].match(/"([^"]+)"/)[1];
                    var str1 = '<label class="checkbox checkbox-single">';
                    var str2 = '<input type="checkbox" class="checkable2" value="'+$('<div/>').text(fx).html()+'">';
                    var str3 = '<span></span>';
                    var str4 = '</label>';
                    return str1+str2+str3+str4;
                },
            }
        ]
    });

    var rows = $("#dt").DataTable().$('tr', {"filter": "applied"});// viewlist is
    $('input[type="checkbox"]', rows).each(function(i,e){
        $(e).click(function(){
            var checkBoxC = [];
            var cbChecked = JSON.parse(window.localStorage['data_dosen']);
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
            
            window.localStorage['data_dosen'] = JSON.stringify(cbChecked);
        });
    });

    var allPages = table2.cells().nodes();

    $('#dt2').on('click','#selectAll2', function(){
        var data = [];
        if ($(this).hasClass('checkable2')) {
            $(allPages).find('input[type="checkbox"]').prop('checked', false);
        } else {
            $(allPages).find('input[type="checkbox"]').prop('checked', true);
        }
        $(this).toggleClass('checkable2');
        // Get all rows with search applied
        // var rows,checked;  
        var rows = table2.$('tr', {"filter": "applied"});// viewlist is
        var checked = $(this).prop('checked');
        // if(checked){
        //     $('#btnAdd').show();
        // }else{
        //     $('#btnAdd').hide();
        // }
        $.each(rows, function () {
            var checkbox = $($(this).find('td').eq(0)).find('input').prop('checked', checked);
            if(checked){
                var a = parseInt(checkbox.val());
                data.push(a);
            }
        });
    
        window.localStorage['data_wilayah'] = JSON.stringify(data);
    });

    var rows2 = $("#dt2").DataTable().$('tr', {"filter": "applied"});// viewlist is
    $('input[type="checkbox"]', rows2).each(function(i,e){
        $(e).click(function(){
            var checkBoxC = [];
            var cbChecked = JSON.parse(window.localStorage['data_wilayah']);
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
                $('#selectAll2').prop('checked', false);
            }
            
            window.localStorage['data_wilayah'] = JSON.stringify(cbChecked);
        });
    });

    $('#jenis_pembentukan').on('change', function(){
        var val = $(this).val();
        if(val == '2'){
            $('.hide').show();
            $('.showWil').hide();
        }else{
            $('.hide').hide();
            $('.showWil').show();
        }

        $('#val1').val(val);
        
        return false;
    });

    $(document).on('click', '#applyBtn', function(){
        var jml = parseInt($('#jumlahklp').html());

        var data = JSON.parse(window.localStorage['data_dosen']);        
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        if(data.length != jml){
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_warning, 
                    text: json.text_alert_warning_group_3,
                    icon: "warning"
                })
            });
        }else{
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_confirm, 
                    text: json.text_alert_warning_group_4,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: json.btn_alert_confirm,
                    cancelButtonText: json.btn_alert_cancel
                }).then(function(result){
                    if(result.value){
                        window.localStorage['data_dosen'] = JSON.stringify(data);
                        $('#largeModal').modal('hide');
                    }
                })
            })
        }

        return false;
    });

    $(document).on('click', '#applyBtn2', function(){
        // var data = [];
        var data = JSON.parse(window.localStorage['data_wilayah']);
        // table2.$('input:checked').each(function(){
        //     var a = parseInt($(this).val());
        //     data.push(a);
        //     // data.push($(this).val());
        // });
        var locale = $('html').attr('lang');
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host;
            var jsonfile = baseUrl+'/assets/'+locale+'.json';

        if(data.length < 2){
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_warning, 
                    text: json.text_alert_warning_group_5, 
                    icon: "warning"
                });
            })
        }else{
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.text_alert_warning_group_6, 
                    text: data.length+" "+json.text_alert_warning_group_6, 
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: json.btn_alert_confirm,
                    cancelButtonText: json.btn_alert_cancel
                }).then(function(result){
                    if(result.value){
                        window.localStorage['data_wilayah'] = JSON.stringify(data);
                        $('#txtWil').show();
                        $('#pickwilayahbtn').hide();
                        $('#txtWil').html(data.length + ' wilayah terpilih');
                        $('.showCek').show();
                        $('#provinsiModal').modal('hide');
                    }
                });
            })
        }

        return false;
    });

    $('#provinsi').on('change', function(){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/kabupatenkota/'+$(this).val(),
            success: function(data) {
                $('#kabupaten_kota').empty().selectpicker('refresh');
                var val = '';
                
                $.each(data, function(index, option) {
                    $('#kabupaten_kota').append($('<option>').val(option.regency_id).text(option.name));
                });
                $('#kabupaten_kota').selectpicker('refresh');
            }
        });
    });

    $(document).on('click', '#btncek', function(e){
        // $('#jenis_pembentukan').prop('disabled',true);
        var jumlahPeserta = parseInt($('#jumlah').html());
        var jumlahAnggota = 0;
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
        if($('#jumlah_anggota').val() != '')
            jumlahAnggota = parseInt($('#jumlah_anggota').val());

        if(jumlahAnggota > jumlahPeserta){
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_warning, 
                    text: json.text_alert_warning_group_1,
                    icon: "warning"
                })
            })
        }else{
            if(jumlahAnggota == 0){
                $.getJSON(jsonfile, function(json) {
                    Swal.fire({
                        title: json.title_alert_warning, 
                        text: json.text_alert_warning_group_2,
                        icon: "warning"
                    })
                });
            }else{
                $('.showjns').hide();
                $('.showjns2').show();
                $('#valjenis').html($("#jenis_pembentukan option:selected" ).text());
                var div = ~~(jumlahPeserta/jumlahAnggota);
                var mod = jumlahPeserta % jumlahAnggota;
                $('.ss').show();
                $('#jumlah_anggota').prop('readonly', true);
                $('#jumlahklp').html(div);
                $('#belum').html(mod);
            }
        }

        return false;
    });

    $(document).on('click', '#btncek2',function(e){
        // $('#jenis_pembentukan').attr('disabled',true);
        $('.showjns').hide();
        $('.showjns2').show();
        $('#valjenis').html($("#jenis_pembentukan option:selected" ).text());
        var jumlahPeserta = parseInt($('#jumlah').html());
        var wil = JSON.parse(window.localStorage['data_wilayah']);
        var periode = $('#periode_pbl').val();
        $('#val2').val(window.localStorage['data_wilayah']);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/kelompok/pembentukan/cekbasewilayah',
            type: 'POST',
            data: {peserta : jumlahPeserta, wilayah: wil, periode: periode},
            dataType: 'json',
            success: function(data) {
                $('.ss').show();
                $('#jumlahklp').html(data.jmlKlp);
                $('#belum').html(data.jmlBlmInclude);
            }
        });

        return false;
    });

    $('#btnreset').on('click', function(){
        $('.ss').hide();
        $('#jumlah_anggota').prop('readonly', false);
        $('#jumlah_anggota').val('');

        return false;
    });

    $(document).on('change', '#periode_pbl', function(e){
        var nilai = $(this).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/kelompok/pembentukan/getjumlahpesertapbl/'+nilai,
            type: 'GET',
            success: function(data) {
                $('#jumlah').html(data.jumlah);
            }
        });

        return false;
    });

    $(document).on('submit', '#form-generate', function(event) {
        event.preventDefault();
        $('#dosen').val(window.localStorage['data_dosen']);
        var form_data = $("#form-generate").serializeArray();

        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var val = "assets/images/loading.gif";
        var baseUrlImg = baseUrl + "/" + val;
        
        var jumlahPeserta = parseInt($('#jumlah').html());
        var jumlahAnggota = parseInt($('#jumlah_anggota').val());

        var jenis = $('#jenis_pembentukan').val();
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        if(jenis == 2){
            if(jumlahPeserta < jumlahAnggota){
                $.getJSON(jsonfile, function(json) {
                    Swal.fire({
                        title: json.title_alert_warning, 
                        text: json.text_alert_warning_group_7, 
                        icon: "warning"
                    });
                })
            }else{
                $.getJSON(jsonfile, function(json) {
                    Swal.fire({
                        title: json.title_alert_confirm,
                        text: json.text_alert_warning_group_8, 
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: json.btn_alert_confirm,
                        cancelButtonText: json.btn_alert_cancel
                    }).then(function(result){
                        if(result.value){
                            Swal.fire({
                                title: json.title_alert_process,
                                text: json.text_alert_process,
                                icon: "info"
                            });
                            $.ajax({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                                url: '/kelompok/pembentukan/generate',
                                type: 'POST',
                                data: form_data,
                                success: function(data) {
                                    if(data.status == '1'){
                                        Swal.fire({
                                            title: json.title_alert_success,
                                            text: data.message, 
                                            icon: "success",
                                            showCancelButton: true,
                                            confirmButtonText: json.btn_alert_confirm,
                                            cancelButtonText: json.btn_alert_cancel
                                        }).then(function(result){
                                            if(result.value){
                                                location.href = '/kelompok/list/index';
                                            }
                                        });
                                    }else{
                                        Swal.fire({
                                            title: json.title_alert_failed, 
                                            text: data.message, 
                                            icon: "warning"
                                        });
                                    }
                                }
                            });
                        }
                    });
                })
            }
        }else{
            $.getJSON(jsonfile, function(json) {
                Swal.fire({
                    title: json.title_alert_confirm, 
                    text: json.text_alert_warning_group_8,
                    icon: "warning"
                }).then(function(result){
                    if(result.value){
                        $.ajax({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            url: '/kelompok/pembentukan/generate',
                            type: 'POST',
                            data: form_data,
                            success: function(data) {
                                if(data.status == '1'){
                                    Swal.fire({
                                        title: json.title_alert_success, 
                                        text: data.message, 
                                        icon: "success"
                                    }).then(function() {
                                        location.href = '/kelompok/list/index';
                                    });
                                }else{
                                    Swal.fire({
                                        title: json.title_alert_failed, 
                                        text: data.message, 
                                        icon: "warning"
                                    });
                                }
                            }
                        });
                    }
                });
            })
        }
    });
})