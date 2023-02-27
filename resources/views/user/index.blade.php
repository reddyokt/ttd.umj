@extends('layout.master')
@section('title', __('User'))


@section('content')

<!--begin::Card-->
<div class="card card-flush">
    <!--begin::Card header-->
    <div class="card-header pt-8">
        <div class="card-title">
            <h5>Daftar User</h5>
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
            <a href="/user/create" class="btn btn-sm fw-bold btn-primary">Buat User</a>
            <!--end::Primary button-->
        </div>
    </div>
        <div class="card-body pt-6">
            <!--begin::Table container-->
            <div class="table-responsive">
                <!--begin::Table-->
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <!--begin::Table head-->
                    <thead>
                        <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                            <th># </th>
                            <th>Nama </th>
                            <th>Role </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <!--end::Table head-->
                    <!--begin::Table body-->
                    <tbody>
                        @foreach ( $data as $dt )
                        <tr>
                            <td>{{ $loop->iteration  }}</td>
                            <td>{{ $dt->name }}</td>
                            <td>{{ $dt->role->role_name }}</td>
                            <td></td>

                        </tr>
                        @endforeach
                    </tbody>
                    <!--end::Table body-->
                </table>
            </div>
            <!--end::Table-->
        </div>
    <!--end::Card header-->
    {{-- <!--begin::Card body-->
    <div class="card-body">


    </div>
    <!--end::Card body--> --}}
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
