// Dashboard
$(function() {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host;
    
    var setting = $('#usersettings').val();
    var userid = $('#userid').val();
    setting = setting.split('|');
    //check dark mode true or false
    if(parseInt(setting[0]) == 0){
        $("#darkmode").prop('checked',false);
        $('#headerTheme1').attr('href', baseUrl+"/assets/css/themes/layout/header/base/light.css");
        $('#headerTheme2').attr('href', baseUrl+"/assets/css/themes/layout/header/menu/light.css");
        $('#brandDark').attr('href', baseUrl+"/assets/css/themes/layout/brand/light.css");
        $('#asideDark').attr('href', baseUrl+"/assets/css/themes/layout/aside/light.css");
        $('#logoDark').attr('src', baseUrl+"/assets/media/logos/logo-light.png");
    }else{
        $("#darkmode").prop('checked',true);
        $('#headerTheme1').attr('href', baseUrl+"/assets/css/themes/layout/header/base/dark.css");
        $('#headerTheme2').attr('href', baseUrl+"/assets/css/themes/layout/header/menu/dark.css");
        $('#brandDark').attr('href', baseUrl+"/assets/css/themes/layout/brand/dark.css");
        $('#asideDark').attr('href', baseUrl+"/assets/css/themes/layout/aside/dark.css");
        $('#logoDark').attr('src', baseUrl+"/assets/media/logos/logo-dark.png");
    }
    
    //check mini aside true or false
    if(parseInt(setting[1]) == 0){
        $("#minisidebar").prop('checked',false);
        $('body').removeClass('aside-minimize');
        
    }else{
        $("#minisidebar").prop('checked',true);
        $('body').addClass('aside-minimize');
    }

    //check fixed footer true or false
    if(parseInt(setting[2]) == 0){
        $("#footerfixed").prop('checked',false);
        $('body').removeClass('footer-fixed');
    }else{
        $("#footerfixed").prop('checked',true);
        $('body').addClass('footer-fixed');
    }

    //update on change user settings
    $("#darkmode").on('change',function() {
        if($(this).is(":checked")) {
            setting[0] = '1';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('#headerTheme1').attr('href', baseUrl+"/assets/css/themes/layout/header/base/dark.css");
                    $('#headerTheme2').attr('href', baseUrl+"/assets/css/themes/layout/header/menu/dark.css");
                    $('#brandDark').attr('href', baseUrl+"/assets/css/themes/layout/brand/dark.css");
                    $('#asideDark').attr('href', baseUrl+"/assets/css/themes/layout/aside/dark.css");
                    $('#logoDark').attr('src', baseUrl+"/assets/media/logos/logo-dark.png");
                }
            });
        }else{
            setting[0] = '0';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('#headerTheme1').attr('href', baseUrl+"/assets/css/themes/layout/header/base/light.css");
                    $('#headerTheme2').attr('href', baseUrl+"/assets/css/themes/layout/header/menu/light.css");
                    $('#brandDark').attr('href', baseUrl+"/assets/css/themes/layout/brand/light.css");
                    $('#asideDark').attr('href', baseUrl+"/assets/css/themes/layout/aside/light.css");
                    $('#logoDark').attr('src', baseUrl+"/assets/media/logos/logo-light.png");
                }
            });
        }
    });

    $('.setTheme').on("click", function(event) {
        var theme = $(this).attr('data-kt-value');
        setting[0] = theme == 'dark' ? 1 : 0;
        var imp = setting.join('|');
        $('#usersettings').val(imp);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            url: '/updatesetting',
            data: { user_id: userid, settings: imp },
            success: function(data) {
                var themeMode = theme; 
                document.documentElement.setAttribute("data-bs-theme", themeMode); 
            }
        });
    });

    $("#minisidebar").on('change',function() {
        if($(this).is(":checked")) {
            setting[1] = '1';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('body').addClass('aside-minimize');
                }
            });
        }else{
            setting[1] = '0';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('body').removeClass('aside-minimize');
                }
            });
        }
    });

    $("#footerfixed").on('change',function() {
        if($(this).is(":checked")) {
            setting[2] = '1';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('body').addClass('footer-fixed');
                }
            });
        }else{
            setting[2] = '0';
            var imp = setting.join('|');
            $('#usersettings').val(imp);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: '/updatesetting',
                data: { user_id: userid, settings: imp },
                success: function(data) {
                    $('body').removeClass('footer-fixed');
                }
            });
        }
    });

    $('#switchto').on('change', function(){
        var val = $(this).val();
        if($(this).is(":checked")) {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'GET',
                url: '/dashboard/setrole/'+val,
                success: function(data) {
                    window.location.reload();
                    $('#switchto').prop('checked', false);
                }
            });
        }
    });

    $('.setlang').on("click", function(event) {
        var lang = $(this).attr('data-lang');
        setting[3] = lang;
        var imp = setting.join('|');
        $('#usersettings').val(imp);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/set-language/'+lang,
            success: function(data) {
                if(data.status){
                    window.location.reload();
                }
            }
        });
    });

    $('#logout').on("click", function(event) {
        var locale = $('html').attr('lang');
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var jsonfile = baseUrl+'/assets/'+locale+'.json';
        $.getJSON(jsonfile, function(json) {
            Swal.fire({
                title: json.title_alert_confirm,
                text: json.text_alert_logout,
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
                        type: 'GET',
                        url: '/logout',
                        success: function(data) {
                            if(data.status){
                                // console.info('===Sukses Logout===');
                                window.location.replace("/login");
                            }
                        }
                    });
                }
            });
        });
    });
});

//PBL
$(function(){
    $(document).on("submit", "#form_add_pbl", function(e) {
        var url = "/master/pbl-period/store";
        var form_data = $("#form_add_pbl").serializeArray();

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
                                    window.location.replace("/master/pbl-period/index");
                                });
                            } else {
                                Swal.fire({
                                    title: json.title_alert_warning,
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

    $(document).on("submit", "#form_edit_pbl", function(e) {
        var id = $('#id').val();
        var url = "/master/pbl-period/update/"+id;
        var form_data = $("#form_edit_pbl").serializeArray();

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
                                    window.location.replace("/master/pbl-period/index");
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
    
    $(document).on('click', '#delete-periode', function(e) {
        var data_id = $(this).attr("data-id");
        var url = "/master/pbl-period/delete/" + data_id;
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
});