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
    $data = Ajuan::all();

    //dd($data);
     return view ('dashboard.index', compact ('data'));
   }
}
