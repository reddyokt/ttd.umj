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
        <form class="form" action="/klasifikasi/create" method="post">
            @csrf
            <!--begin::Input group-->
            <input type="hidden" name="created_by" value="{{ auth()->user()->id }}">
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Nama Klasifikasi </span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Nama surat"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <input type="text" class="form-control form-control-solid" name="nama_klasifikasi" value="" />
                <!--end::Input-->
            </div>
            <!--end::Input group-->

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

