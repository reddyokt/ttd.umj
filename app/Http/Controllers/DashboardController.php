<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Ajuan;
use App\Models\User;

class DashboardController extends Controller
{
   public function index()
   {
    $role = auth()->user()->role->role_name;

    $data = Ajuan::whereHas('users', function ($q) use($role){

        if($role == 'Koordinator'){
            $q = $q->where('id', auth()->user()->id);
        }
        if($role == 'Staff'){
            $q = $q->where('id', auth()->user()->id);
        }
    })->where('status', 'Menunggu')->get();

    $dataPemohon = Ajuan::whereHas('users', function ($q) use($role){

        if($role == 'Koordinator'){
            $q = $q->where('id', auth()->user()->id);
        }
        if($role == 'Staff'){
            $q = $q->where('id', auth()->user()->id);
        }
    })->get();

     return view ('dashboard.index', compact ('data', 'dataPemohon'));
   }
}
