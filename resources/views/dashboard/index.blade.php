@extends('layout.master')
@section('title', __('Dashboard'))


@section('content')

<!--begin::Card-->
<div class="card card-flush">
    <!--begin::Card header-->
    <div class="card-header pt-8">
        <div class="card-title">
            <h5>Daftar Pengajuan Tanda Tangan</h5>
        </div>
        @if (session()-> has('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif
        <!--begin::Card toolbar-->
        <div class="d-flex align-items-center gap-2 gap-lg-3">
            <!--begin::Primary button-->
            <a href="/ajuan/create" class="btn btn-sm fw-bold btn-primary">Buat Ajuan Tanda Tangan</a>
            <!--end::Primary button-->
        </div>
        <div class="card-body pt-6">
            <!--begin::Table container-->
            <div class="table-responsive">
                <!--begin::Table-->
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <!--begin::Table head-->
                    <thead>
                        <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                            <th class="p-0 pb-3 min-w-175px text-start">Nama Pemohon</th>
                            <th class="p-0 pb-3 min-w-50px text-center">No Ajuan </th>
                            <th class="p-0 pb-3 min-w-300px text-center">Detail Surat/Ajuan</th>
                            <th class="p-0 pb-3 min-w-150px text-center">Status</th>
                            <th class="p-0 pb-3 min-w-175px text-center">QR-CODE</th>
                            <th class="p-0 pb-3 w-100px text-center pe-12">Action</th>
                        </tr>
                    </thead>
                    <!--end::Table head-->
                    <!--begin::Table body-->
                    <tbody>
                        @foreach ($data as $dt )
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="symbol symbol-50px me-3">
                                        <img src="assets/media/avatars/darto.png" class="" alt="" />
                                    </div>
                                    <div class="d-flex justify-content-start flex-column">
                                        <p class="text-gray-800 fw-bold text-hover-primary mb-1 fs-8"></p>
                                        <span class="text-gray-400 fw-semibold d-block fs-9"></span>
                                    </div>
                                </div>
                            </td>
                            <td class="text-start pe-0">
                                <span class="text-gray-600 fw-bold fs-8">00{{ $dt->id_ajuan }}</span>
                            </td>
                            <td class="text-start pe-0">
                                <span class="text-gray-600 fw-bold fs-9">
                                    <small>
                                        Nomor Surat/Dokumen : {{ $dt->nomor_surat }}
                                        <br>
                                        Surat/Dokumen : {{ $dt->nama_surat }}
                                    </small>
                                </span>
                                <span class="p-10">
                                    <a href="#" class="btn btn-sm btn-icon btn-bg-white btn-active-color-success w-20px h-20px" style="margin-right: 10px" data-bs-toggle="modal" data-bs-target="#kt_modal_1-{{ $dt->id_ajuan }}">
                                        <span class="svg-icon svg-icon svg-icon-2hx">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="currentColor"/>
                                                <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                    <!--end::Svg Icon-->
                                    </a>
                                </span>
                            </td>
                            <td class="text-center pe-0">
                                <!--begin::Label-->
                                <span class="badge badge-light-{{ $dt->status == 'Menunggu' ? 'warning' : 'success' }} fs-8">
                                <!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
                                <span class="svg-icon svg-icon-5 svg-icon-{{ $dt->status == 'Menunggu' ? 'warning' : 'success' }} ms-n1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->{{ $dt->status }}</span>
                                <!--end::Label-->
                            </td>
                            <td>
                                @if( $dt->status== 'Diterima')
                                <div class="visible-print text-center">
                                    <img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->generate(URL('/show/'.$dt->id_ajuan))) !!}" style="width: 50px;">
                                </div>
                                @endif
                            </td>

                            <td class="text-start g-1">
                                @if ($dt->role_id == 1)
                                <a href="/accept/{{ $dt->id_ajuan }}" class="btn btn-sm btn-icon btn-bg-light btn-active-color-success w-20px h-20px" style="margin-right: 10px" onclick="return confirm('Yakin ingin menerima Permohonan ini?!!!')">
                                    <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/general/gen037.svg-->
                                    <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
                                        <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <!--end::Svg Icon-->
                                </a>
                                @endif
                                <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-20px h-20px" style="margin-right: 10px">
                                    <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/general/gen055.svg-->
                                    <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="currentColor"/>
                                        <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="currentColor"/>
                                        <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <!--end::Svg Icon-->
                                </a>
                                <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-danger w-20px h-20px">
                                    <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/general/gen034.svg-->
                                    <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
                                        <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                                        <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <!--end::Svg Icon-->
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <!--end::Table body-->
                </table>
            </div>
            <!--end::Table-->
        </div>

    </div>
    <!--end::Card header-->
    {{-- <!--begin::Card body-->
    <div class="card-body">


    </div>
    <!--end::Card body--> --}}
</div>
<!--end::Card-->

<!---------------------------Start Modal---------------------------------------->
@foreach ( $data as $dt )

<div class="modal fade" tabindex="-1" id="kt_modal_1-{{ $dt->id_ajuan }}">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Detail Surat/Dokumen</h3>

                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                    <span class="svg-icon svg-icon-1"></span>
                </div>
                <!--end::Close-->
            </div>

            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table gs-2 gy-2 gx-2">
                            <tr>
                                <td class="w-50">Nama Surat</td>
                                <td>{{ $dt->nama_surat }}</td>
                            </tr>
                            <tr>
                                <td class="w-50">Surat Untuk</td>
                                <td>{{ $dt->surat_untuk }}</td>
                            </tr>
                            <tr>
                                <td class="w-50">Perihal</td>
                                <td>{{ $dt->perihal_surat }}</td>
                            </tr>
                            <tr>
                                <td class="w-50">Jenis Surat</td>
                                <td>{{ $dt->jenis_surat }}</td>
                            </tr>
                            <tr>
                                <td class="w-50">Nomor Surat</td>
                                <td>{{ $dt->nomor_surat }}</td>
                            </tr>
                            <tr>
                                <td class="w-50">Tanggal Surat</td>
                                <td>{{ $dt->tanggal_surat }}</td>
                            </tr>
                    </table>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

@endforeach
<!---------------------------End Modal---------------------------------------->


@stop

@section('page-script')
<script src="{{asset('assets/plugins/custom/datatables/datatables.bundle.js')}}"></script>
<script src="{{asset('assets/js/pages/crud/datatables/data-sources/html.js')}}"></script>
<script>
    var lang1 = "{{__('file_manager.label_no_data')}}";
    var lang2 = "{{__('file_manager.label_no_data_desc')}}";
    var lang3 = "{{__('file_manager.label_items')}}";
</script>
<script src="{{asset('assets/js/custom/apps/file-manager/list.js')}}"></script>
<script src="{{asset('assets/js/dashboard.js')}}"></script>
@stop
