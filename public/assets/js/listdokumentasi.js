$(function(){
    $('#periode_pbl').on('change', function(e){
        var val = $(this).val();
    
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'GET',
            url: '/kelompok/list/getallkelompok/'+val,
            success: function(resp) {
                $('#klpk').empty().selectpicker('refresh');
                var val = '';
                
                $.each(resp.klp, function(index, option) {
                    $('#klpk').append($('<option>').val(option.kelompok_id).text(option.kelompok));
                });
    
                $('#klpk').selectpicker('refresh');
            }
        });
    
        return false;
    });

    $('#cari').on('click', function(event) {
        var url = "/kegiatan/dokumentasi/getphoto";
        var periode = $("#periode_pbl").val();
        var kelompok = [];
        var sesi = $('#sesi').val();
        
        if(sesi == 'ADM')
            kelompok = $("#klpk").val();
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;
        var src =  baseUrl+'/upload/gallery';
        var post = {};
        post.periode_pbl = periode;
        post.kelompok = kelompok;
        
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            data: post,
            url: url,
            success: function(data) {
                // console.info(JSON.stringify(data));
                if (data.status) {
                    var i = 0;
                    var photo = '', foto = '';

                    $('#aniimated-thumbnials').empty();

                    for(i; i<data.data.length; i++){
                        foto = data.data[i].nama_file;
                        photo += '<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 m-b-30"> <a href='+src+'/'+foto+'> <img class="img-fluid img-thumbnail" src='+src+'/'+foto+' alt=""> </a> </div>'
                    }
                    if(photo != ''){
                        $("#show").show();
                        $('#show2').hide();
                        $('#aniimated-thumbnials').append(
                            photo
                        );

                        $('#aniimated-thumbnials').data('lightGallery').destroy(true);
                        $('#aniimated-thumbnials').lightGallery({
                            thumbnail: true,
                            selector: 'a'
                        });
                    }else{
                        $("#show").hide();
                        $('#show2').show();
                    }
                } else {
                    Swal.fire({
                        title: "Perhatian",
                        text: data.message, 
                        icon: "warning",
                        buttons: {
                            confirm: "OK"
                        }
                    })
                }
            }
        });
        
        return false;
    });
});