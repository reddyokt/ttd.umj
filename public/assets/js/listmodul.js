$(function(){
    var tableX = $('#kt_datatable').DataTable({
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

        var col = [];

        if(sesi != 'MHS'){
            col = [
                { title: "No" },
                { title: "Periode PBL" },
                { title: "Nama Modul" },
                { title: "Berkas" },
                { title: "Action" }
            ];
        }else{
            col = [
                { title: "No" },
                { title: "Periode PBL" },
                { title: "Nama Modul" },
                { title: "Berkas" }
            ];
        }

        console.log(col);

        tableX.destroy();
        $.ajax({
            type: 'GET',
            url: '/pembekalan/modul/get/'+val,
            success: function(data) {
                var dataset = [];

                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                
                for(var i = 0; i<data.length; i++){
                    var dt = [];
                    dt.push(i+1);
                    dt.push(data[i].judul_pbl);
                    dt.push(data[i].modul_name);
                    dt.push(data[i].action_download);
                    if(sesi != 'MHS')
                        dt.push(data[i].action_edit_delete);

                    dataset.push(dt);
                }

                tableX = $('#kt_datatable').DataTable({
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
                tableX.draw();
            }
        });

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

    $('#btnUpload').click(function(e){
        $('#modalPembekalan').modal('show');
        var id = $('#periode_pbl').val();
        var url = "/pembekalan/modul/get/"+id;

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function(data) {
                var my_html = "";
                if(data.length > 0){
                    my_html += "<div class=''row clearfix'>"+
                                "<div class='col-lg-12 col-md-10 col-sm-8'>"+
                                    "<div class='media' style='justify-content: center;'>"+
                                        "<a href='{{url('upload/modul')}}/'"+data.modul+" title='Klik untuk download modul'>Modul "+data.kelompok+"</a>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
                }
                my_html +=  "<div class='row clearfix'>"+
                                "<div class='col-lg-12 col-md-12 col-sm-12 form-control-label'>"+
                                "<ul>"+
                                    "<li>Berkas yang diijinkan adalah .pdf, .docx, .jpg, .jpeg</li>"+
                                    "<li>Maksimum besar berkas yang diijinkan adalah 2MB</li>"+
                                "</ul>"+
                                "</div>"+
                            "</div>"+
                            "<div class='row clearfix'>"+
                                "<div class='col-lg-4 col-md-2 col-sm-4 form-control-label'>"+
                                    "<label for='nama_lengkap'>Unggah Modul<span class='required' style='color: red;'> *</span></label>"+
                                "</div>"+
                                "<div class='col-lg-8 col-md-10 col-sm-8'>"+
                                    "<div class='form-group'>"+
                                        // "<input type='file' id='dropify-event' data-default-file='{{asset('assets/images/image-gallery/1.jpg')}}'>"+
                                        "<input type='hidden' name='periode' value='"+id+"'>"+
                                        "<input type='file' id='post_profile_picture' name='profile_picture'>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            "<div class='modal-footer'>"+
                                "<button type='submit' id='btnSaveModul' class='btn btn-primary waves-effect'>Simpan</button>"+
                                "<button type='button' class='btn btn-danger waves-effect' data-dismiss='modal'>CLOSE</button>"+
                            "</div>";
                $("#form_modul_pembekalan").html(my_html);
            }
        });

        return false;
    })

    $('#form_modul_pembekalan').on('submit', function () {
        var formData = new FormData($("#form_modul_pembekalan")[0]);
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var path = baseUrl+"/upload/modul/";
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
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
                            icon: "success"
                        }).then(function() {
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
    })

    $(document).on('click', '.delete-modul-pembekalan', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/pembekalan/modul/delete/" + data_id;
        e.preventDefault(); //cancel default action
        
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_delete_pbl,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: json.btn_alert_confirm,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    $.ajax({
                        type: 'GET',
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
                                    window.location.reload();
                                });
                            }
                        }
                    })
                }
            });
        });
    });
});
