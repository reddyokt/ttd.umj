<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Ajuan;

class DashboardController extends Controller
{
   public function index()
   {
    $data = Ajuan::all();
     return view ('dashboard.index', compact ('data'));
   }
}
