$(function(){    
    $(document).on('click', '#login', function(){
        window.location.replace('/login');
    });

    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop();
        var anchors = $('body').find('section');
        
        for (var i = 0; i < anchors.length; i++){
            if (scrollTop > $(anchors[i]).offset().top - 50 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 50) {
                $('#navbarNav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
            } else {
                $('#navbarNav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
            }
        }

        if (scrollTop > 0) {
            $('.back-to-top').fadeIn(500);
        } else {
            $('.back-to-top').fadeOut(300);
        }
    
    });

    $(document).on('click', '#btnModal', function(e){
        var options = {

            url: function(phrase) {
                return "/general/dosen";
            },
    
            getValue: function(element) {
                return element.nidn+' - '+element.nama_dosen;
            },
    
            ajaxSettings: {
                dataType: "json",
                method: "GET",
                data: {
                    dataType: "json"
                }
            },
    
            list: {
                onSelectItemEvent: function() {
                    var value = $("#dosen").getSelectedItemData().dosen_id;
    
                    $("#dosen_id").val(value).trigger("change");
                }
            },
    
            preparePostData: function(data) {
                data.phrase = $("#dosen").val();
                return data;
            },
    
            requestDelay: 400
        };
    
        $("#dosen").easyAutocomplete(options);
        $("div.easy-autocomplete").removeAttr("style");

        $('#uploadModal').modal('show');
    });    

    $('#close').on('click', function(){
        $('#uploadModal').modal('hide');

        return false;
    })

    $('#saveUpload').on('click', function(e){
        var url = "/general/storedpa";
        var form_data = new FormData($("#formUpload")[0]);
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Anda yakin ingin menyimpan?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            cancelButtonText: 'Batalkan'
        })
        .then(function(result){
            if(result.value){
                Swal.fire({
                    title: "Harap tunggu",
                    text: "Sedang memroses...",
                    icon: "info",
                    buttons: false,
                });
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: url,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    data: form_data,
                    success: function(data) {
                        if(data.status){
                            Swal.fire({
                                title: "Sukses", 
                                text: data.message, 
                                icon: "success"
                            }).then(function() {
                                $('#uploadModal').modal('hide');
                                $('#formUpload').trigger("reset");
                            });
                        }else{
                            Swal.fire({
                                title: "Gagal", 
                                text: data.message, 
                                icon: "warning"
                            });
                        }
                    }
                });
            }
        });
    });

})