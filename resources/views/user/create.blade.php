@extends('layout.master')
@section('title', __('Create User'))

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
        <form class="form" action="/user/create" method="post" enctype="multipart/form-data">
            @csrf
            <!--begin::Input group-->
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Nama Lengkap</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Nama lengkap"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <input type="text" class="form-control form-control-solid" name="name" value="" />
                <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row mb-3">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Username</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Username"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <input type="text" class="form-control form-control-solid" name="username" value="" />
                <!--end::Input-->
            </div>
            <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="fv-row mb-3">
                            <!--begin::Label-->
                            <label class="fs-6 fw-semibold form-label mt-3">
                                <span class="required">Email</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Nama lengkap"></i>
                            </label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="email" class="form-control form-control-solid" name="email" value="" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                <!--begin::Input-->
            <div class="col">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Role</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Role"></i>
                </label>
                <select class="form-control form-control-solid" name="role_id">
                    <option selected disabled>Pilih Role</option>
                        @foreach ($role as $role )
                            <option value="{{ $role->id_role }}"> {{ $role->role_name }}</option>
                        @endforeach
                </select>
                <!--end::Input-->
            </div>
                    <!--end::Input group-->

                <!--begin::Input-->
            <div class="col">
                <label class="fs-6 fw-semibold form-label mt-3">
                    <span class="required">Profile Picture</span>
                    <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Masukkan Profile Picture"></i>
                </label>
                <input class="form-control form-control-solid" type="file" name="profile_picture" accept="image/png, image/jpeg">
                <!--end::Input-->
            </div>
                    <!--end::Input group-->
                <!--end::Col-->

            </div>
            <!--end::Row-->
        </div>
    </div>
            <!--begin::Separator-->
            <div class="separator mb-4"></div>
            <!--end::Separator-->
            <!--begin::Action buttons-->
            <div class="d-flex justify-content-end p-4">
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

