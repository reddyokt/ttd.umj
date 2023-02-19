<?php

namespace App\Http\Controllers;

use App\Models\Ajuan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AjuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {

        return view ('ajuan.create');
    }
}
