@extends('layout.master')
@section('title', __('Klasifikasi Surat'))


@section('content')

<!--begin::Card-->
<div class="card card-flush">
    <!--begin::Card header-->
    <div class="card-header pt-8">
        <div class="card-title">
            <h5>Daftar Klasifikasi Surat</h5>
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
            <a href="/klasifikasi/create" class="btn btn-sm fw-bold btn-primary">Buat Klasifikasi Surat Baru</a>
            <!--end::Primary button-->
        </div>
        <div class="card-body pt-6">

        </div>

    </div>
    <!--end::Card header-->
   <!--begin::Card body-->
    <div class="card-body">
        <!--begin::Table container-->
            <div class="table-responsive">
                <!--begin::Table-->
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <!--begin::Table head-->
                    <thead>
                        <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                            <th class="p-0 pb-3 min-w-50px text-start"> # </th>
                            <th class="p-0 pb-3 min-w-200px text-start">Nama Klasifikasi</th>
                            <th class="p-0 pb-3 min-w-50px text-start">Status </th>
                            <th class="p-0 pb-3 w-100px text-center pe-12">Action</th>
                        </tr>
                    </thead>
                    <!--end::Table head-->
                    <!--begin::Table body-->
                    <tbody>
                        @foreach ($data as $dt )
                        <tr>
                            <td class="text-start pe-0">
                                {{ $loop->iteration  }}
                            </td>
                            <td class="text-start pe-0">
                                <span class="text-gray-600 fw-bold fs-8">{{ $dt->nama_klasifikasi }}</span>
                            </td>

                            <td class="text-start pe-0">
                                <!--begin::Label-->
                                <span class="badge badge-light-{{ $dt->is_active == 'Aktif' ? 'success' : 'warning' }} fs-8">
                                <!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
                                <span class="svg-icon svg-icon-5 svg-icon-{{ $dt->is_active == 'Aktif' ? 'success' : 'warning' }} ms-n1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->{{ $dt->is_active }}</span>
                                <!--end::Label-->
                            </td>

                            <td class="text-start g-1">

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
    <!--end::Card body-->
</div>
<!--end::Card-->

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
