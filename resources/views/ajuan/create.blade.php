@extends('layout.master')
@section('title', __('Permohonan Tanda Tangan'))

@section('page-style')
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
@stop

@section('content')

<div class="card card-flush mb-7">
    <!--begin::Card header-->
    <div class="card-header pt-3">
        <div class="card-body pt-3">
    <div class="card-body pt-3">
        <!--begin::Form-->
        <form class="form" action="/ajuan/create" method="post" enctype="multipart/form-data">
            @csrf
            <!--begin::Input group-->
            <input type="hidden" name="created_by" value="{{ auth()->user()->id }}">
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Klasifikasi Surat</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Nama surat"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control form-control-solid" name="klasifikasi_id" required>
                    <option selected disabled>Pilih Klasifikasi Surat </option>
                    @foreach ( $klas as $klas )
                        <option value="{{ $klas->id_klasifikasi }}">{{ $klas->nama_klasifikasi }}</option>
                    @endforeach
                </select>
                <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required"> Tujuan Surat</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Tujuan surat"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <input type="text" class="form-control form-control-solid" name="tujuan_surat" value="" required />
                <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span>Perihal Surat</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Perihal Surat"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <textarea class="form-control form-control-solid" name="perihal_surat" required></textarea>
                <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Row-->
            <div class="row row-cols-1 row-cols-sm-3 rol-cols-md-1 row-cols-lg-3">
                <!--begin::Col-->
                <div class="col">
                    <!--begin::Input group-->
                    <div class="fv-row mb-3">
                        <!--begin::Label-->
                        <label class="fs-6 fw-semibold form-label mt-3">
                            <span class="">Jenis Surat/Dokumen</span>
                            <i class="fas fa-question-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Jenis Surat"></i>
                        </label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <select class="form-control form-control-solid" name="jenis_surat" required>
                            <option selected disabled>Pilih Jenis Surat/Dokumen</option>
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                        </select>
                        <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col">
                    <!--begin::Input group-->
                    <div class="fv-row mb-3">
                        <!--begin::Label-->
                        <label class="fs-6 fw-semibold form-label mt-3">
                            <span class="">No Surat/Dokumen (jika ada)</span>
                            <i class="fas fa-question-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Nomor Surat"></i>
                        </label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <input type="text" class="form-control form-control-solid" name="nomor_surat" value="" />
                        <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col">
                    <!--begin::Input group-->
                    <div class="fv-row mb-3">
                        <label class="fs-6 fw-semibold form-label mt-3">
                            <span class="">Tanggal Surat</span>
                            <i class="fas fa-question-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Tanggal Surat"></i>
                        </label>
                            <!--begin::Input-->
                                <input class="form-control form-control-solid" type="text" id="datepicker" name="tanggal_surat" required>
                            <!--end::Input-->
                    </div>
                <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                </div>
                <!--end::Col-->
                 <!--begin::Col-->
                <div class="col">
                    <!--begin::Input group-->
                    <label class="fs-6 fw-semibold form-label mt-3">
                        <span class="required">File Surat</span>
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan File Surat"></i>
                    </label>
                    <input class="form-control form-control-solid" type="file" name="file_surat" accept="application/msword, application/pdf">
                    <!--end::Input-->
                </div>
                <!--end::Col-->
            </div>
            <!--end::Row-->


            <!--begin::Separator-->
            <div class="separator mb-4"></div>
            <!--end::Separator-->
            <!--begin::Action buttons-->
            <div class="d-flex justify-content-end">
                <!--begin::Button-->
                <button type="reset" data-kt-contacts-type="cancel" class="btn btn-light me-3">Cancel</button>
                <!--end::Button-->
                <!--begin::Button-->
                <button type="submit" data-kt-contacts-type="submit" class="btn btn-primary">
                    <span class="indicator-label">Save</span>
                    <span class="indicator-progress">Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
                <!--end::Button-->
            </div>
            <!--end::Action buttons-->
        </form>
        <!--end::Form-->
    </div>
    <!--end::Card body-->

@stop

@section('page-script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script>
        $( function() {
          $( "#datepicker" ).datepicker();
          $( "#anim" ).on( "change", function() {
            $( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
          });
        } );
        </script>
@stop

