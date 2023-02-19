<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
   public function index()
   {
     return view ('dashboard.index');
   }
}
