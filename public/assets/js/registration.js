$(function() {
    $('#nama').on('blur', function(e){
        $('#val_nama').val($(this).val());
    });

    $(document).on("submit", "#form-generate", function(e) {
        var formData = new FormData($("#form-generate")[0]);
        var url = '/registrasi/post';
        
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_registration,
                        icon: "info"
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: 'POST',
                        data: formData,
                        url: url,
                        processData: false,
                        contentType: false,
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
                                    window.location.replace("/login");
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
    });
    
    $('#fakultas').on('change', function(e){
        var id = $(this).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/prodi/'+id,
            success: function(data) {
                $('#prodi').prop('disabled',false);
                $('#prodi').empty().selectpicker('refresh');
                var options = [];
                $.each(data, function(index, option) {
                    $('#prodi').append($('<option>').val(option.prodi_id).text(option.nama_prodi));
                });
                $('#prodi').selectpicker('refresh');
            }
        });
    });
    
    $('#prodi').on('change', function(e){
        var id = $(this).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/mhs/'+id,
            success: function(data) {
                if(data.length != 0){
                    $('#mhs').prop('disabled',false);
                    $('#nim').prop('disabled',false);
                }
                $('#mhs').empty().selectpicker('refresh');
                var options = [];
                $.each(data, function(index, option) {
                    $('#mhs').append($('<option>').val(option.mahasiswa_id).text(option.nim+' - '+option.nama));
                });
                $('#mhs').selectpicker('refresh');
            }
        });
    });
    
    $('#mhs').on('change', function(e){
        $('#divLink').hide();
        $('.divShow').show();
        var txt = $('#mhs option:selected').text();
        txt = txt.split(' - ');
        txt = txt[1];
        $('#nama').val(txt);
        $('#val_nama').val(txt);
    });
    
    $('#linkDialog').on('click', function(e){
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';

        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_registration_1, 
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: json.btn_alert_confirm,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    $('#nims').show();
                    $('#mhss').hide();
                    $('#nim').prop('required',true);
                    $('#divLink').hide();
                    $('.divShow').show();
                    $('#nama').prop('disabled', false);
                }
            });
        })
    });
    
    $('#formRegister').submit(function(event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var val = "assets/images/loading.gif";
        var baseUrlImg = baseUrl + "/" + val;
        var locale = $('html').attr('lang');
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
                        url: '/registrasi/post',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(result) {
                            if(result.success){
                                Swal.fire({
                                    title: json.title_alert_success,
                                    text: json.text_alert_registration_2, 
                                    type: "success"
                                }).then(function(result) {
                                    window.location.href = '/login';
                                });
                            }else{
                                Swal.fire({
                                    title: json.title_alert_failed, 
                                    text: result.message,
                                    type: "warning"
                                })
                            }
                        }
                    });
                }
            });
        })
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
                
                    if(index == 0)
                        getFirstKecamatan(option.regency_id);
                });
                $('#kabupaten_kota').selectpicker('refresh');
            }
        });
    });
    
    $('#kabupaten_kota').on('change', function(){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/kecamatan/'+$(this).val(),
            success: function(data) {
                $('#kecamatan').empty().selectpicker('refresh');
                $.each(data, function(index, option) {
                    $('#kecamatan').append($('<option>').val(option.district_id).text(option.name));
                
                    if(index == 0)
                        getFirstDesa(option.district_id);
                });
                $('#kecamatan').selectpicker('refresh');
            }
        });
    });
    
    $('#kecamatan').on('change', function(){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/kelurahan/'+$(this).val(),
            success: function(data) {
                $('#desa').empty().selectpicker('refresh');
                $.each(data, function(index, option) {
                    $('#desa').append($('<option>').val(option.village_id).text(option.name));
                });
                $('#desa').selectpicker('refresh');
            }
        });
    });
    
    function getFirstKecamatan(kec){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/kecamatan/'+kec,
            success: function(data) {
                $('#kecamatan').empty().selectpicker('refresh');
                $.each(data, function(index, option) {
                    $('#kecamatan').append($('<option>').val(option.district_id).text(option.name));
                
                    if(index == 0)
                        getFirstDesa(option.district_id);
                });
                $('#kecamatan').selectpicker('refresh');
            }
        });
    }
    
    function getFirstDesa(des){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/kelurahan/'+des,
            success: function(data) {
                $('#desa').empty().selectpicker('refresh');
                $.each(data, function(index, option) {
                    $('#desa').append($('<option>').val(option.village_id).text(option.name));
                });
                $('#desa').selectpicker('refresh');
            }
        });
    }
});