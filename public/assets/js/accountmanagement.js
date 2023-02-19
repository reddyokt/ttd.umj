//Account Management
$(function(){
    $(document).on("click", '.choose_type', function(e){
        if($(this).attr('value') == 'Dosen'){
            $('#nidn').show();
            $('#nip').hide();
            $('#nama').attr('required', false);
            $('#email').attr('required', false);
            $('#kt_phone_input').attr('required', false);
            $('#nama').attr('disabled', true);
            $('#email').attr('disabled', true);
        }else{
            $('#nidn').hide();
            $('#nip').show();
            $('#nama').val('');
            $('#email').val('');
            $('#nama').attr('required', true);
            $('#email').attr('required', true);
            $('#kt_phone_input').attr('required', true);
            $('#nama').attr('disabled', false);
            $('#email').attr('disabled', false);
        }
    });

    $(document).on('change', '#dosen', function(e){
        var id = $(this).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/general/dosen/show/'+id,
            dataType: 'json',
            success: function(data) {
                $('#nama').val(data.nama_dosen);
                $('#email').val(data.email);
                var hp = ''; 
                if(data.no_hp!=null){
                    hp += data.no_hp.substring(0,4) + '-';
                    hp += data.no_hp.substring(4,8) + '-';
                    hp += data.no_hp.substring(8);
                    $('#kt_phone_input').val(hp);
                }
                 
            }
        });
    });

    $(document).on("submit", "#form_add_committee", function(e) {
        var url = "/master/accountmanagement/committee/store";
        var form_data = $("#form_add_committee").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/committee/index");
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

    $(document).on("submit", "#form_edit_committee", function(e) {
        var id = $('#id').val();
        var url = "/master/accountmanagement/committee/update/"+id;
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_proces,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/committee/index");
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
    
    $(document).on('click', '#delete-committee', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/accountmanagement/committee/delete/" + data_id;
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
                confirmButtonText: json.btn_alert_delete,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_proces,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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
    });

    $(document).on("submit", "#form_add_operator", function(e) {
        var url = "/master/accountmanagement/operator/store";
        var form_data = $("#form_add_operator").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/operator/index");
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

    $(document).on("submit", "#form_edit_operator", function(e) {
        var id = $('#id').val();
        var url = "/master/accountmanagement/operator/update/"+id;
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/operator/index");
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
    
    $(document).on('click', '#delete-operator', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/accountmanagement/operator/delete/" + data_id;
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
                confirmButtonText: json.btn_alert_delete,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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
    });

    $(document).on("submit", "#form_add_finance", function(e) {
        var url = "/master/accountmanagement/finance/store";
        var form_data = $("#form_add_finance").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/finance/index");
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

    $(document).on("submit", "#form_edit_finance", function(e) {
        var id = $('#id').val();
        var url = "/master/accountmanagement/finance/update/"+id;
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/finance/index");
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
    
    $(document).on('click', '#delete-finance', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/accountmanagement/finance/delete/" + data_id;
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
                confirmButtonText: json.btn_alert_delete,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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
    });

    $(document).on("submit", "#form_add_student", function(e) {
        var url = "/master/accountmanagement/student/store";
        var form_data = $("#form_add_student").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/student/index");
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

    $(document).on("submit", "#form_edit_student", function(e) {
        var id = $('#id').val();
        var url = "/master/accountmanagement/student/update/"+id;
        var form_data = $("#form_edit_student").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/student/index");
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
    
    $(document).on('click', '#delete-student', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/accountmanagement/student/delete/" + data_id;
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
                confirmButtonText: json.btn_alert_delete,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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
    });

    $(document).on('click', '#btn_reset_password', function(e){
        var id = $(this).attr('data-id');
        var role = $(this).attr('data-r');
        var url = '/general/reset-password/'+role+'/'+id;
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_reset, 
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: json.btn_alert_confirm,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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
    })

    $(document).on("submit", "#form_add_lecturer", function(e) {
        var url = "/master/accountmanagement/lecturer/store";
        var form_data = $("#form_add_lecturer").serializeArray();
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/lecturer/index");
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

    $(document).on("submit", "#form_edit_lecturer", function(e) {
        var id = $('#id').val();
        var url = "/master/accountmanagement/lecturer/update/"+id;
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
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
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
                                    window.location.replace("/master/accountmanagement/lecturer/index");
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
    
    $(document).on('click', '#delete-lecturer', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/accountmanagement/lecturer/delete/" + data_id;
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
                confirmButtonText: json.btn_alert_delete,
                cancelButtonText: json.btn_alert_cancel,
            })
            .then(function(result){
                if(result.value){
                    Swal.fire({
                        title: json.title_alert_process,
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
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

    $(document).on("submit", "#formUpload", function(e) {
        var url = "/master/accountmanagement/student/import";
        var form_data = new FormData($("#formUpload")[0]);

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
                        text: json.text_alert_process,
                        icon: "info",
                        buttons: false,
                    });
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: 'POST',
                        data: form_data,
                        url: url,
                        processData: false,
                        contentType: false,
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
                                    window.location.replace("/master/accountmanagement/student/index");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_failed,
                                    text: data.message,
                                    icon: "warning",
                                    buttonsStyling: false,
                                    confirmButtonText: json.btn_alert_ok,
                                    customClass: {
                                        confirmButton: "btn btn-warning"
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
});