$(function(){
    $(document).on("submit", "#form_edit_lecturer", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_lecturer").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_failed,
                                    text: json.text_alert_failed,
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

    $(document).on("submit", "#form_edit_finance", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_finance").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_failed,
                                    text: json.text_alert_failed,
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

    $(document).on("submit", "#form_edit_operator", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_operator").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_failed,
                                    text: json.text_alert_failed,
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

    $(document).on("submit", "#form_edit_committee", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_committee").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
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
    
    $(document).on("submit", "#form_edit_mahasiswa", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_mahasiswa").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
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

    $(document).on("submit", "#form_edit_admin", function(e) {
        var url = "/profile/update";
        var form_data = $("#form_edit_admin").serializeArray();
        var bg_img = $('.image-input-wrapper').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        form_data.push({name: 'image', value: bg_img});

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
                                    window.location.replace("/dashboard");
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