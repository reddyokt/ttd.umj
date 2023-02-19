$(function(){
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'GET',
        url: '/kegiatan/agenda/getall',
        success: function(response) {
            appTgl = JSON.parse(response.dataTgl);
            appKlp = JSON.parse(response.kelMhs);
            appRet = JSON.parse(response.dataRet);
            
            var tableX = null;
            var tableY = null;
            var tableZ = null;

            var tgl = appTgl;
            var ids=null;
            window.localStorage['listTanggal'] = JSON.stringify(tgl);
            var calendar = $('#kt_calendar');

            var newEvent = function(start) {
                var dataset = [];

                var dataKlp = appKlp;
                var arr = ['Hadir','Tidak Hadir','Sakit','Ijin'];

                if(dataKlp != null){
                    for(var i = 0; i<dataKlp.length; i++){
                        var dt = [];
                        dt.push(i+1);
                        dt.push(dataKlp[i].nim);
                        dt.push(dataKlp[i].nama);
                        dt.push(dataKlp[i].nama_prodi);
                        dt.push(dataKlp[i].mahasiswa_id);
                        dataset.push(dt);
                    }
                }

                tableX = $('#dt').DataTable({
                    data: dataset,
                    columns: [
                        { title: "No" },
                        { title: "NIM" },
                        { title: "Nama" },
                        { title: "Program Studi" },
                        { title: "Aksi" }
                    ],
                    language: {
                        searchPlaceholder: "Search records"
                    },
                    pageLength: 10,
                    columnDefs: [{
                        'targets': 4,
                        'searchable': false,
                        'orderable': false,
                        'className': 'dt-body-center',
                        'render': function (data, type, full, meta){
                            var f = full[4];
                            return '<input type="checkbox" name="id[]" class="cb" value="' + $('<div/>').text(f).html() + '">';
                        }
                    }]
                });
                tableX.draw();
                $('#addDirectEvent').modal({
                    backdrop: 'static',
                    keyboard: true, 
                    show: true
                });
                $('#addDirectEvent #add_agenda').unbind();  
                var tgl = ''+start.getDate();
                var m = ''+(start.getMonth()+1);
                tgl = tgl.length == 1 ? '0'+tgl : tgl;
                m = m.length == 1 ? '0'+m : m;
                var valDate = start.getFullYear()+'-'+m+'-'+tgl;        
                $('#tanggal').val(valDate);
                $('#addDirectEvent #add_agenda').on('click', function() {
                    var title = $('#addDirectEvent input[name="nama_kegiatan"]').val();
                    var classes = 'fc-event-primary';
                    if (title) {
                        var url = "/kegiatan/agenda/store";
                        var form_data = new FormData($("#form_add_agenda")[0]);
                        var data = [];
                        var locale = $('html').attr('lang');
                        var getUrl = window.location;
                        var baseUrl = getUrl.protocol + "//" + getUrl.host;
                        var jsonfile = baseUrl+'/assets/'+locale+'.json';

                        tableX.$('input:checked').each(function(){
                            var a = parseInt($(this).val());
                            data.push(a);
                        });

                        $.getJSON(jsonfile, function(json) {
                            Swal.fire({
                                title: json.title_alert_process,
                                text: json.text_alert_process,
                                icon: "info"
                            })
                        });

                        form_data.append('absensi', JSON.stringify(data));
                        
                        $.ajax({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            type: 'POST',
                            data: form_data,
                            url: url,
                            processData: false,
                            contentType: false,
                            success: function(response) {
                                if (response.status) {
                                    $.getJSON(jsonfile, function(json) {
                                        Swal.fire({
                                            title: json.title_alert_success,
                                            text: response.message, 
                                            icon: "success"
                                        }).then(function(result) {
                                            var eventData = {
                                                id: response.data.agenda_kegiatan_id,
                                                title: title,
                                                description: response.data.ringkasan_kegiatan,
                                                created: response.data.created_by,
                                                start: response.data.tanggal_kegiatan+'T'+response.data.jam_mulai+':00',
                                                className: classes
                                            };
                                            // calendar.fullCalendar('renderEvent', eventData, true);
                                            // calendar.fullCalendar('updateEvent', info.event);
                                            calendar.addEvent(eventData);
                                            $('#form_add_agenda')[0].reset();
                                            $('#addDirectEvent').modal('hide')
                                            tableX.destroy();
                                        })
                                    });
                                } else {
                                    $.getJSON(jsonfile, function(json) {
                                        Swal.fire({
                                            title:json.title_alert_warning,
                                            text: response.message, 
                                            icon: "warning"
                                        })
                                    });
                                }
                            }
                        });
                    }
                    else {
                        alert("Title can't be blank. Please try again.")
                    }
                });
            }
            
            var todayDate = moment().startOf('day');
            var YM = todayDate.format('YYYY-MM');
            var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
            var TODAY = todayDate.format('YYYY-MM-DD');
            var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
            
            var calendarEl = document.getElementById('kt_calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                themeSystem: 'bootstrap',

                isRTL: KTUtil.isRTL(),

                header: {
                    left: 'title',
                    center: '',
                    right: 'month, prev, next'
                },

                height: 800,
                contentHeight: 780,
                aspectRatio: 3,  // see: https://fullcalendar.io/docs/aspectRatio

                nowIndicator: true,
                now: TODAY + 'T09:25:00', // just for demo

                views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' }
                },

                defaultView: 'dayGridMonth',
                defaultDate: TODAY,

                editable: true,
                eventLimit: true, // allow "more" link when too many events
                navLinks: true,
                events: appRet,
                dateClick: function(info) {
                    var created = $('#created').val();
                    var listTgl = JSON.parse(window.localStorage['listTanggal']);
                    var fmt = info.dateStr;
                    // appRet = JSON.parse(appRet); 
                    var dataMe = undefined; 
                    if(appRet != null)
                        appRet.find(o => o.created === created);
                    if(dataMe != undefined){
                        if(created == dataMe.created){
                            var eventModal = $('#eventEditModal');
                            getEditData(eventModal, info.event.id);
                        }else{
                            var eventModal = $('#eventDetailModal');
                            getDetailData(eventModal, info.event.id);
                        }
                    }else{
                        newEvent(info.date);
                    }
                },
                eventAllow: function(dropInfo, draggedEvent) {
                    return false;
                },
                eventClick: function(info) {
                    var created = $('#created').val();
                    var listTgl = JSON.parse(window.localStorage['listTanggal']);
                    var fmt = info.dateStr;
                    // appRet = JSON.parse(appRet); 
                    var dataMe = undefined; 
                    if(appRet != null)
                        dataMe = appRet.find(o => o.created === created);
                    if(dataMe != undefined){
                        if(created == dataMe.created){
                            var locale = $('html').attr('lang');
                            var getUrl = window.location;
                            var baseUrl = getUrl.protocol + "//" + getUrl.host;
                            var jsonfile = baseUrl+'/assets/'+locale+'.json';
                            var eventModal = $('#eventEditModal');
                            getEditData(eventModal, info.event._def.publicId);
                                
                            $('#eventEditModal #edit_agenda').on('click', function() {
                                var titles = $('#eventEditModal input[name="nama_kegiatan"]').val();
                                var classes = 'bg-primary'
                                if (titles) {
                                    var url = "/kegiatan/agenda/update/"+ids;
                                    var form_data = new FormData($("#form_edit_agenda")[0]);
                                    var data = [];
                                    tableY.$('input:checked').each(function(){
                                        var a = parseInt($(this).val());
                                        data.push(a);
                                    });
            
                                    form_data.append('absensi', JSON.stringify(data));
            
                                    $.ajax({
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        type: 'POST',
                                        data: form_data,
                                        url: url,
                                        processData: false,
                                        contentType: false,
                                        success: function(response) {
                                            if (response.status) {
                                                $.getJSON(jsonfile, function(json) {
                                                    Swal.fire({
                                                        title: json.title_alert_success,
                                                        text: response.message, 
                                                        icon: "success"
                                                    }).then(function(result) {
                                                        // info.event.title = response.data.judul_kegiatan;
                                                        // info.event.description = response.data.ringkasan_kegiatan;
                                                        // info.event.start = response.data.tanggal_kegiatan+'T'+response.data.jam_mulai+':00';
                                                        
                                                        // calendar.fullCalendar('updateEvent', info.event);
                                                        var event = calendar.getEventById(response.data.agenda_kegiatan_id);
                                                        event.setProp('title', response.data.judul_kegiatan);
                                                        event.setProp('description', response.data.ringkasan_kegiatan);
                                                        event.setProp('start', response.data.tanggal_kegiatan+'T'+response.data.jam_mulai+':00');
                                                        $('#eventEditModal').modal('hide');
                                                        tableY.destroy()
                                                    })
                                                })
                                            } else {
                                                $.getJSON(jsonfile, function(json) {
                                                    Swal.fire({
                                                        title: json.title_alert_warning,
                                                        text: response.message, 
                                                        icon: "warning"
                                                    })
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    alert("Title can't be blank. Please try again.")
                                }
                            });
                            
                            $('#eventEditModal #delete_agenda').on('click', function(){
                                $.getJSON(jsonfile, function(json) {
                                    Swal.fire({
                                        title: json.title_alert_confirm,
                                        text: json.text_alert_warning_activity_1, 
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: json.btn_alert_delete,
                                        cancelButtonText: json.btn_alert_cancel
                                    }).then(function(result){
                                        if(result.value){
                                            var titles = $('#eventEditModal input[name="nama_kegiatan"]').val();
                                            var classes = 'fc-event-primary'
                                            if (titles) {
                                                var url = "/kegiatan/agenda/delete/"+info.event.id;
            
                                                $.ajax({
                                                    headers: {
                                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                    },
                                                    type: 'GET',
                                                    url: url,
                                                    success: function(response) {
                                                        if (response.status) {
                                                            Swal.fire({
                                                                title: json.title_alert_success,
                                                                text: response.message, 
                                                                icon: "success"
                                                            }).then(function() {
                                                                // calendar.fullCalendar('removeEvents', info.event.id);
                                                                var arr = JSON.parse(window.localStorage['listTanggal']);
                                                                
                                                                var fmt = formatDate(info.event.start);
                                                                if(arr.indexOf(fmt) > -1){
                                                                    arr.splice(arr.indexOf(fmt), 1);
                                                                }
                                                                window.localStorage['listTanggal'] = JSON.stringify(arr);
    
                                                                var event = calendar.getEventById(info.event.id);
                                                                event.remove();
    
                                                                $('#eventEditModal').modal('hide');
            
                                                                tableY.destroy();
                                                            })
                                                        } else {
                                                            Swal.fire({
                                                                title: json.title_alert_warning,
                                                                text: response.message, 
                                                                icon: "warning"
                                                            })
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                alert("Title can't be blank. Please try again.")
                                            }
                                        }
                                    })
                                })
                            });
                        }else{
                            var eventModal = $('#eventDetailModal');
                            getDetailData(eventModal, info.event.id);
                        }
                    }else{
                        var eventModal = $('#eventDetailModal');
                        getDetailData(eventModal, info.event.id);
                    }
                },
                select: function(start, end, allDay) {
                    var listTgl = JSON.parse(window.localStorage['listTanggal']);
                    var fmt = formatDate(start);
                    if(listTgl.indexOf(fmt) > -1){
                        calendar.fullCalendar('unselect');
                        return false;
                    }
                    newEvent(start);
                },
                eventRender: function(info) {
                    var element = $(info.el);

                    if (info.event.extendedProps && info.event.extendedProps.description) {
                        if (element.hasClass('fc-day-grid-event')) {
                            element.data('content', info.event.extendedProps.description);
                            element.data('placement', 'top');
                            KTApp.initPopover(element);
                        } else if (element.hasClass('fc-time-grid-event')) {
                            element.find('.fc-title').append('<div class="fc-description">' + info.event.extendedProps.description + '</div>');
                        } else if (element.find('.fc-list-item-title').lenght !== 0) {
                            element.find('.fc-list-item-title').append('<div class="fc-description">' + info.event.extendedProps.description + '</div>');
                        }
                    }
                }
            });

            calendar.render();

            function getEditData(eventModal, id){
                eventModal.modal({
                    backdrop: 'static',
                    keyboard: true, 
                    show: true
                });
                ids = id;
                var url = '/kegiatan/agenda/show/'+id;
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'GET',
                    url: url,
                    success: function(response){
                        var arr = ['Hadir','Tidak Hadir','Sakit','Ijin'];

                        var dataset = [];

                        for(var i = 0; i<response.absensi.length; i++){
                            var dt = [];
                            dt.push(i+1);
                            dt.push(response.absensi[i].nim);
                            dt.push(response.absensi[i].nama);
                            dt.push(response.absensi[i].nama_prodi);
                            dt.push(response.absensi[i].absensi+'|'+response.absensi[i].mahasiswa_id);
                            dataset.push(dt);
                        }

                        tableY = $('#dt2').DataTable({
                            data: dataset,
                            columns: [
                                { title: "No" },
                                { title: "NIM" },
                                { title: "Nama" },
                                { title: "Program Studi" },
                                { title: "Action" }
                            ],
                            language: {
                                searchPlaceholder: "Search records"
                            },
                            pageLength: 10,
                            columnDefs: [{
                                'targets': 4,
                                'searchable': false,
                                'orderable': false,
                                'className': 'dt-body-center',
                                'render': function (data, type, full, meta){
                                    var f = full[4];
                                    var sp = f.split('|');
                                    return '<input type="checkbox" name="id[]" class="cb" value="' + $('<div/>').text(sp[1]).html() + '" '+(sp[0] != 'N' ? 'checked' : '')+'>';
                                }
                            }]
                        });
                        tableY.draw();

                        var resp = response.agenda;
                        eventModal.find('input[name="nama_kegiatan"]').val(resp.judul_kegiatan);
                        eventModal.find('input[name="tanggal_kegiatan"]').val(resp.tgl_kegiatan);
                        eventModal.find('input[name="jam_mulai"]').val(resp.jam_mulai);
                        eventModal.find('input[name="jam_selesai"]').val(resp.jam_selesai);
                        eventModal.find('textarea[name="ringkasan_kegiatan"]').val(resp.ringkasan_kegiatan);
                        // eventModal.find('textarea[name="alasan_ketidakhadiran"]').val(resp.alasan_ketidakhadiran_dosen!=null ? resp.alasan_ketidakhadiran_dosen: '');
                        eventModal.find('input[name="nama_saksi_setempat"]').val(resp.nama_saksi_setempat);
                        eventModal.find('input[name="jabatan_saksi_setempat"]').val(resp.jabatan_saksi_setempat);
                        eventModal.find('input[name="jumlah_peserta"]').val(resp.jumlah_peserta);
                        eventModal.find('input[name="tempat_kegiatan"]').val(resp.tempat_kegiatan);
                        eventModal.find('input[name="gallery_id"]').val(resp.gallery_id);
                        
                        // if(resp.kehadiran_dosen == 'Y'){
                        //     $('#eventEditModal #radioEdit1').prop('checked', true);
                        // }else{
                        //     $('#eventEditModal #radioEdit2').prop('checked', true);
                        //     $('#show1').show();
                        // }
                        if(resp.nama_file != null){
                            $('#showUnggah').show();
                            var html = '';
                            html += '<a href="'+baseUrl+'/upload/gallery/'+resp.nama_file+'" target="_blank" title="Click to preview"><i class="la la-link"></i>&nbsp;Click to Preview</a>';
                            // var html = '<input type="file" name="foto_kegiatan" id="foto_kegiatan" class="dropify" data-default-file="'+baseUrl+'/upload/gallery/'+resp.nama_file+'" data-max-file-size="3M" accept="image/*">';
                            $('#eventEditModal #appendDrf').html(html);
                        }
                    }
                });
            }

            function getDetailData(eventModal, id){
                eventModal.modal({
                    backdrop: 'static',
                    keyboard: true, 
                    show: true
                });
                ids = id;
                var url = '/kegiatan/agenda/show/'+id;
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'GET',
                    url: url,
                    success: function(response){
                        var arr = ['Hadir','Tidak Hadir','Sakit','Ijin'];

                        var dataset = [];

                        for(var i = 0; i<response.hadir.length; i++){
                            var dt = [];
                            dt.push(i+1);
                            dt.push(response.hadir[i].nim);
                            dt.push(response.hadir[i].nama);
                            dt.push(response.hadir[i].nama_prodi);
                            dataset.push(dt);
                        }

                        tableZ = $('#dt3').DataTable({
                            data: dataset,
                            columns: [
                                { title: "No" },
                                { title: "NIM" },
                                { title: "Nama" },
                                { title: "Program Studi" }
                            ],
                            language: {
                                searchPlaceholder: "Search records"
                            },
                            pageLength: 10
                        });
                        tableZ.draw();

                        var resp = response.agenda;
                        eventModal.find('input[name="nim"]').val(resp.nim+' - '+resp.nama);
                        eventModal.find('input[name="nama_kegiatan"]').val(resp.judul_kegiatan);
                        eventModal.find('input[name="tanggal_kegiatan"]').val(resp.tgl_kegiatan);
                        eventModal.find('input[name="jam_mulai"]').val(resp.jam_mulai);
                        eventModal.find('input[name="jam_selesai"]').val(resp.jam_selesai);
                        eventModal.find('textarea[name="ringkasan_kegiatan"]').val(resp.ringkasan_kegiatan);
                        // eventModal.find('textarea[name="alasan_ketidakhadiran"]').val(resp.alasan_ketidakhadiran_dosen!=null ? resp.alasan_ketidakhadiran_dosen: '');
                        eventModal.find('input[name="nama_saksi_setempat"]').val(resp.nama_saksi_setempat);
                        eventModal.find('input[name="jabatan_saksi_setempat"]').val(resp.jabatan_saksi_setempat);
                        eventModal.find('input[name="jumlah_peserta"]').val(resp.jumlah_peserta);
                        eventModal.find('input[name="tempat_kegiatan"]').val(resp.tempat_kegiatan);
                        eventModal.find('input[name="gallery_id"]').val(resp.gallery_id);
                        
                        // if(resp.kehadiran_dosen == 'Y'){
                        //     $('#eventDetailModal #detail1').prop('checked', true);
                        // }else{
                        //     $('#eventDetailModal #detail2').prop('checked', true);
                        //     $('#show1').show();
                        // }
                        // $('.dropify').dropify();
                        if(resp.nama_file != null){
                            $('#showUnggah').show();
                            var html = '';
                            html += '<a href="'+baseUrl+'/upload/gallery/'+resp.nama_file+'" target="_blank" title="Click to preview"><i class="la la-link"></i>&nbsp;Click to Preview</a>';
                            // var html = '<input type="file" name="foto_kegiatan" id="foto_kegiatan" class="dropify" data-default-file="'+baseUrl+'/upload/gallery/'+resp.nama_file+'" data-max-file-size="3M" accept="image/*">';
                            $('#eventDetailModal #appendDrf').html(html);
                        }
                    }
                });
            }
            
            $('#mds1').on('click', function(e){
                tableX.destroy();
                $('#addDirectEvent').modal('hide');
            });

            $('#mds2').on('click', function(e){
                tableY.destroy();
                $('#eventEditModal').modal('hide');
            });

            $('#mds3').on('click', function(e){
                tableZ.destroy();
                $('#eventDetailModal').modal('hide');
            });

            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;

                return [year, month, day].join('-');
            }
        }
    });

    var $demoMaskedInput = $('.masked-input');
    $('.time24').mask('00:00', {
        placeholder: "hh:mm",
        alias: 'time24',
        hourFormat: '24'
    });
    //Time
});
